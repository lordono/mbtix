import * as THREE from 'three'

/**
 * The 3D backdrop: a toon-shaded, low-poly Singapore skyline whose sky moves
 * from dawn to night as the journey progresses, plus National-Day-style
 * fireworks for the results screen.
 */

interface SkyKey {
  t: number
  top: string
  bottom: string
  sun: number
  hemi: number
  windows: number
}

const SKY: SkyKey[] = [
  { t: 0.0, top: '#ffb38a', bottom: '#ffe3c2', sun: 0.8, hemi: 0.7, windows: 0.1 },
  { t: 0.3, top: '#5ec8ff', bottom: '#d9f3ff', sun: 1.6, hemi: 1.0, windows: 0 },
  { t: 0.55, top: '#3aa6f0', bottom: '#cbe9ff', sun: 1.8, hemi: 1.1, windows: 0 },
  { t: 0.7, top: '#ff8a7a', bottom: '#ffd29a', sun: 1.1, hemi: 0.8, windows: 0.3 },
  { t: 0.82, top: '#5a3f8c', bottom: '#e0789a', sun: 0.5, hemi: 0.55, windows: 0.8 },
  { t: 1.0, top: '#0b1030', bottom: '#2a2d6b', sun: 0.15, hemi: 0.35, windows: 1.2 },
]

function sampleSky(t: number) {
  let i = 0
  while (i < SKY.length - 2 && t > SKY[i + 1].t) i++
  const a = SKY[i]
  const b = SKY[i + 1]
  const k = THREE.MathUtils.clamp((t - a.t) / (b.t - a.t), 0, 1)
  return {
    top: new THREE.Color(a.top).lerp(new THREE.Color(b.top), k),
    bottom: new THREE.Color(a.bottom).lerp(new THREE.Color(b.bottom), k),
    sun: THREE.MathUtils.lerp(a.sun, b.sun, k),
    hemi: THREE.MathUtils.lerp(a.hemi, b.hemi, k),
    windows: THREE.MathUtils.lerp(a.windows, b.windows, k),
  }
}

function toonGradient(): THREE.Texture {
  const data = new Uint8Array([90, 170, 255])
  const tex = new THREE.DataTexture(data, 3, 1, THREE.RedFormat)
  tex.minFilter = THREE.NearestFilter
  tex.magFilter = THREE.NearestFilter
  tex.needsUpdate = true
  return tex
}

function windowTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 64
  c.height = 128
  const g = c.getContext('2d')!
  g.fillStyle = '#000'
  g.fillRect(0, 0, 64, 128)
  for (let y = 6; y < 128; y += 12) {
    for (let x = 6; x < 64; x += 14) {
      if (Math.random() < 0.55) {
        g.fillStyle = Math.random() < 0.7 ? '#ffd27a' : '#bfe6ff'
        g.fillRect(x, y, 8, 6)
      }
    }
  }
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

interface Spark {
  points: THREE.Points
  velocities: Float32Array
  age: number
  life: number
}

export class World {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(50, 1, 0.1, 400)
  private skyUniforms = { top: { value: new THREE.Color() }, bottom: { value: new THREE.Color() } }
  private sunLight = new THREE.DirectionalLight('#fff3d6', 1.5)
  private hemi = new THREE.HemisphereLight('#ffffff', '#5d7a6b', 1)
  private sunMesh: THREE.Mesh
  private moonMesh: THREE.Mesh
  private windowMats: THREE.MeshToonMaterial[] = []
  private glowMats: THREE.MeshBasicMaterial[] = []
  private clouds = new THREE.Group()
  /** Singapore landmarks vs. Tokyo landmarks; HDB blocks double as generic city in both. */
  private sg = new THREE.Group()
  private tokyo = new THREE.Group()
  private flyer = new THREE.Group()
  private sparks: Spark[] = []
  private pointer = new THREE.Vector2()
  private timer = new THREE.Timer()
  private fireworksOn = false
  private nextFirework = 0
  /** Called whenever a firework bursts (used for the pop sound). */
  onBurst?: () => void
  /** Time of day, 0 = dawn, 1 = night. Tween this. */
  tod = 0

  constructor(canvas: HTMLCanvasElement) {
    // Phones get a cheaper renderer: no MSAA and a lower pixel ratio keeps it smooth and cool.
    const phone = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 640
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: !phone, powerPreference: 'low-power' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, phone ? 1.25 : 2))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace

    this.camera.position.set(0, 9, 46)
    this.camera.lookAt(0, 8, 0)
    this.scene.fog = new THREE.Fog('#ffffff', 60, 180)

    const gradient = toonGradient()
    const toon = (color: string) => new THREE.MeshToonMaterial({ color, gradientMap: gradient })

    // Sky dome
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(200, 32, 16),
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: this.skyUniforms,
        vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
        fragmentShader:
          'uniform vec3 top; uniform vec3 bottom; varying vec3 vP; void main(){ float h = clamp(normalize(vP).y*1.6+0.15,0.,1.); gl_FragColor = vec4(mix(bottom, top, h),1.); }',
      }),
    )
    this.scene.add(sky)

    this.sunLight.position.set(30, 50, 20)
    this.scene.add(this.sunLight, this.hemi)

    this.sunMesh = new THREE.Mesh(new THREE.SphereGeometry(5, 24, 16), new THREE.MeshBasicMaterial({ color: '#ffe08a', fog: false }))
    this.moonMesh = new THREE.Mesh(new THREE.SphereGeometry(3.2, 24, 16), new THREE.MeshBasicMaterial({ color: '#f4f1ff', fog: false }))
    this.scene.add(this.sunMesh, this.moonMesh)

    // Ground and bay
    const ground = new THREE.Mesh(new THREE.CircleGeometry(160, 32), toon('#6fbf73'))
    ground.rotation.x = -Math.PI / 2
    this.scene.add(ground)
    const water = new THREE.Mesh(new THREE.PlaneGeometry(70, 24), toon('#3e8ed0'))
    water.rotation.x = -Math.PI / 2
    water.position.set(4, 0.05, 6)
    this.scene.add(water)

    this.buildHdbs(toon)
    this.buildMbs(toon)
    this.buildSupertrees(toon)
    this.buildFlyer(toon)
    this.buildClouds(toon)
    this.buildTokyo(toon)
    this.scene.add(this.sg, this.tokyo)
    this.setTheme('sg')

    window.addEventListener('resize', () => this.resize())
    window.addEventListener('pointermove', (e) => {
      this.pointer.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
    })
    this.resize()
    this.renderer.setAnimationLoop(() => this.tick())
  }

  private buildHdbs(toon: (c: string) => THREE.MeshToonMaterial) {
    const palette = ['#f7a1c4', '#ffd166', '#8fd3c8', '#f4a261', '#b8a9e0', '#fff4e0']
    const tex = windowTexture()
    for (let i = 0; i < 26; i++) {
      const h = 8 + Math.random() * 12
      const mat = toon(palette[i % palette.length])
      mat.emissive = new THREE.Color('#ffffff')
      mat.emissiveMap = tex
      mat.emissiveIntensity = 0
      this.windowMats.push(mat)
      const block = new THREE.Mesh(new THREE.BoxGeometry(4 + Math.random() * 2, h, 3), mat)
      const side = i % 2 === 0 ? -1 : 1
      const x = side * (22 + Math.random() * 40)
      const z = -10 - Math.random() * 50
      block.position.set(x, h / 2, z)
      block.rotation.y = (Math.random() - 0.5) * 0.4
      // Red roof cap, like the older blocks
      const cap = new THREE.Mesh(new THREE.BoxGeometry(block.geometry.parameters.width + 0.4, 0.6, 3.4), toon('#e76f51'))
      cap.position.y = h / 2 + 0.3
      block.add(cap)
      this.scene.add(block)
    }
  }

  private buildMbs(toon: (c: string) => THREE.MeshToonMaterial) {
    const group = new THREE.Group()
    const mat = toon('#dfe6f0')
    for (let i = 0; i < 3; i++) {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(3, 22, 4), mat)
      tower.position.set(i * 6 - 6, 11, 0)
      tower.rotation.z = (i - 1) * 0.0
      group.add(tower)
    }
    const deck = new THREE.Mesh(new THREE.BoxGeometry(20, 1, 4.4), mat)
    deck.position.set(-0.5, 22.4, 0)
    group.add(deck)
    const pool = new THREE.Mesh(new THREE.BoxGeometry(14, 0.3, 2), toon('#5ec8ff'))
    pool.position.set(-0.5, 23, 0)
    group.add(pool)
    group.position.set(6, 0, -18)
    group.rotation.y = -0.25
    this.sg.add(group)
  }

  private buildSupertrees(toon: (c: string) => THREE.MeshToonMaterial) {
    const positions: [number, number, number][] = [[-16, 0, -4], [-11, 0, -8], [-20, 0, -12], [-8, 0, -2]]
    for (const [x, , z] of positions) {
      const h = 7 + Math.random() * 6
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.9, h, 7), toon('#8e7dbe'))
      trunk.position.set(x, h / 2, z)
      const crown = new THREE.Mesh(new THREE.CylinderGeometry(3, 0.5, 2, 9, 1, true), toon('#f7a1c4'))
      crown.position.set(x, h + 0.6, z)
      const glowMat = new THREE.MeshBasicMaterial({ color: '#ff9ff3', transparent: true, opacity: 0 })
      this.glowMats.push(glowMat)
      const glow = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.18, 6, 24), glowMat)
      glow.rotation.x = Math.PI / 2
      glow.position.set(x, h + 1.6, z)
      this.sg.add(trunk, crown, glow)
    }
  }

  private buildFlyer(toon: (c: string) => THREE.MeshToonMaterial) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(6, 0.3, 8, 40), toon('#ffffff'))
    this.flyer.add(ring)
    for (let i = 0; i < 16; i++) {
      const pod = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 6), toon('#2ec4b6'))
      const a = (i / 16) * Math.PI * 2
      pod.position.set(Math.cos(a) * 6, Math.sin(a) * 6, 0)
      this.flyer.add(pod)
    }
    const legs = new THREE.Mesh(new THREE.ConeGeometry(2.5, 7, 3, 1, true), toon('#c9ced6'))
    legs.position.set(28, 3.5, -22)
    this.sg.add(legs)
    this.flyer.position.set(28, 9, -22)
    this.flyer.rotation.y = -0.6
    this.sg.add(this.flyer)
  }

  private buildTokyo(toon: (c: string) => THREE.MeshToonMaterial) {
    // Tokyo Tower: a tapered red lattice with two white observation decks.
    const tower = new THREE.Group()
    const red = toon('#e63946')
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 4, 26, 4, 1, true), red)
    body.position.y = 13
    const deck1 = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 1.6, 8), toon('#ffffff'))
    deck1.position.y = 10
    const deck2 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 1.2, 8), toon('#ffffff'))
    deck2.position.y = 18
    const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.3, 8, 6), red)
    spire.position.y = 30
    tower.add(body, deck1, deck2, spire)
    tower.position.set(6, 0, -20)
    // Mt Fuji far behind, with a snow cap.
    const fuji = new THREE.Group()
    const mountain = new THREE.Mesh(new THREE.ConeGeometry(48, 34, 9), toon('#7d8fc4'))
    mountain.position.y = 17
    const cap = new THREE.Mesh(new THREE.ConeGeometry(14.5, 10.3, 9), toon('#ffffff'))
    cap.position.y = 29.2
    fuji.add(mountain, cap)
    fuji.position.set(-30, 0, -110)
    this.tokyo.add(tower, fuji)
  }

  setTheme(theme: 'sg' | 'tokyo') {
    this.sg.visible = theme === 'sg'
    this.tokyo.visible = theme === 'tokyo'
  }

  private buildClouds(toon: (c: string) => THREE.MeshToonMaterial) {
    const mat = toon('#ffffff')
    mat.transparent = true
    mat.opacity = 0.95
    for (let i = 0; i < 9; i++) {
      const cloud = new THREE.Group()
      for (let j = 0; j < 4; j++) {
        const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6 + Math.random() * 1.6, 0), mat)
        puff.position.set(j * 2.2 - 3, Math.random() * 1.2, Math.random() * 1.5)
        cloud.add(puff)
      }
      cloud.position.set(-80 + Math.random() * 160, 26 + Math.random() * 14, -40 - Math.random() * 40)
      this.clouds.add(cloud)
    }
    this.scene.add(this.clouds)
  }

  private resize() {
    const w = window.innerWidth
    const h = window.innerHeight
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    // Pull the camera back on narrow screens so the skyline still fits.
    this.camera.position.z = w < h ? 64 : 46
    this.camera.updateProjectionMatrix()
  }

  setFireworks(on: boolean) {
    this.fireworksOn = on
  }

  burst(x = (Math.random() - 0.5) * 50, y = 22 + Math.random() * 14, z = -20 - Math.random() * 20) {
    const count = 140
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = ['#ff6b6b', '#ffd166', '#ffffff', '#2ec4b6', '#f7a1c4', '#e63946']
    const base = new THREE.Color(palette[Math.floor(Math.random() * palette.length)])
    for (let i = 0; i < count; i++) {
      positions.set([x, y, z], i * 3)
      const dir = new THREE.Vector3().randomDirection().multiplyScalar(6 + Math.random() * 6)
      velocities.set([dir.x, dir.y, dir.z], i * 3)
      const c = Math.random() < 0.2 ? new THREE.Color('#ffffff') : base
      colors.set([c.r, c.g, c.b], i * 3)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const mat = new THREE.PointsMaterial({ size: 0.7, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false })
    const points = new THREE.Points(geo, mat)
    this.scene.add(points)
    this.sparks.push({ points, velocities, age: 0, life: 2.2 })
    this.onBurst?.()
  }

  private tick() {
    this.timer.update()
    const dt = Math.min(this.timer.getDelta(), 0.05)
    const t = this.timer.getElapsed()
    const s = sampleSky(this.tod)

    this.skyUniforms.top.value.copy(s.top)
    this.skyUniforms.bottom.value.copy(s.bottom)
    ;(this.scene.fog as THREE.Fog).color.copy(s.bottom)
    this.sunLight.intensity = s.sun
    this.hemi.intensity = s.hemi
    for (const m of this.windowMats) m.emissiveIntensity = s.windows
    for (const m of this.glowMats) m.opacity = Math.min(1, s.windows) * (0.7 + Math.sin(t * 3) * 0.3)

    // Sun arcs across the sky through the day, the moon rises at night.
    const arc = this.tod * Math.PI
    this.sunMesh.position.set(Math.cos(arc) * -70, 10 + Math.sin(arc) * 50 - this.tod * 30, -120)
    this.sunLight.position.copy(this.sunMesh.position).multiplyScalar(0.3)
    this.moonMesh.position.set(50, -10 + Math.max(0, this.tod - 0.7) * 160, -110)

    this.clouds.children.forEach((c, i) => {
      c.position.x += dt * (0.6 + (i % 3) * 0.3)
      if (c.position.x > 90) c.position.x = -90
    })
    this.flyer.rotation.z += dt * 0.15

    // Gentle parallax so the skyline breathes with the cursor.
    this.camera.position.x += (this.pointer.x * 4 - this.camera.position.x) * 0.03
    this.camera.position.y += (9 - this.pointer.y * 2 - this.camera.position.y) * 0.03
    this.camera.lookAt(0, 8, 0)

    if (this.fireworksOn && t > this.nextFirework) {
      this.burst()
      this.nextFirework = t + 0.5 + Math.random() * 0.9
    }
    this.sparks = this.sparks.filter((sp) => {
      sp.age += dt
      const pos = sp.points.geometry.getAttribute('position') as THREE.BufferAttribute
      const arr = pos.array as Float32Array
      for (let i = 0; i < arr.length; i += 3) {
        sp.velocities[i + 1] -= 6 * dt
        sp.velocities[i] *= 0.98
        sp.velocities[i + 1] *= 0.98
        sp.velocities[i + 2] *= 0.98
        arr[i] += sp.velocities[i] * dt
        arr[i + 1] += sp.velocities[i + 1] * dt
        arr[i + 2] += sp.velocities[i + 2] * dt
      }
      pos.needsUpdate = true
      ;(sp.points.material as THREE.PointsMaterial).opacity = 1 - sp.age / sp.life
      if (sp.age > sp.life) {
        this.scene.remove(sp.points)
        sp.points.geometry.dispose()
        ;(sp.points.material as THREE.Material).dispose()
        return false
      }
      return true
    })

    this.renderer.render(this.scene, this.camera)
  }
}
