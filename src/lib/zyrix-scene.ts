import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const TAU = Math.PI * 2;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const damp = (cur: number, target: number, rate: number, dt: number) =>
  lerp(cur, target, 1 - Math.exp(-rate * dt));

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function cvs(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function tx(c: HTMLCanvasElement, aniso = 4) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso;
  t.needsUpdate = true;
  return t;
}

const PODIUM = 7.0;
const TOWER_Z = -44;
const MOON = { x: 17.9, y: 31.9, z: -72, r: 8.6 };

const CAM = [
  { p: [0.0, 4.05, 13.6], t: [0.0, 6.6, -18.0], fov: 36 },
  { p: [-5.6, 2.35, 11.6], t: [1.2, 5.6, -14.0], fov: 48 },
  { p: [1.2, 3.6, 2.2], t: [-0.6, 7.5, -22.0], fov: 40 },
  { p: [5.2, 2.1, -3.4], t: [-2.6, 7.0, -20.0], fov: 46 },
  { p: [0.0, 7.6, -16.0], t: [0.0, 13.0, -40.0], fov: 42 },
  { p: [0.0, 10.5, -20.0], t: [0.0, 3.0, -34.0], fov: 46 },
];

export type SceneHandle = {
  start: () => void;
  destroy: () => void;
  setFocus: (i: number) => void;
  setHover: (h: number) => void;
  onPreload: (cb: (p: number) => void) => void;
};

export function initScene(canvas: HTMLCanvasElement, opts: { pageMode?: boolean } = {}): SceneHandle {
  const pageMode = !!opts.pageMode;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const LOW = coarse || new URLSearchParams(location.search).has("q=low");
  const WANT_POST = !LOW && !new URLSearchParams(location.search).has("post=0");
  const DPR_CAP = LOW ? 1.4 : 1.8;
  const rnd = mulberry32(20260814);

  const vpW = () => window.innerWidth;
  const vpH = () => window.innerHeight;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !WANT_POST,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, DPR_CAP));
  renderer.setSize(vpW(), vpH(), true);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0x05070a, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050a0e, 0.0168);
  scene.background = new THREE.Color(0x060a0d);

  const camera = new THREE.PerspectiveCamera(36, vpW() / vpH(), 0.35, 220);

  const RIG = { prog: 0, smooth: 0, mx: 0, my: 0, tmx: 0, tmy: 0, intro: 0, focus: -1, focusAmt: 0, revealed: 0, hover: 0, hoverT: 0, energy: 1 };
  const WORD: {
    group: THREE.Group | null;
    glyphs: THREE.Mesh[];
    ink: { xMin: number; xMax: number; cx: number; w: number; asc: number } | null;
    rise: number;
  } = { group: null, glyphs: [], ink: null, rise: 0 };
  const WORD_Z = 3.0;

  const disposables: Array<THREE.BufferGeometry | THREE.Material | THREE.Texture> = [];

  function texGlow(c1: string, c2: string) {
    const c = cvs(256, 256);
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, c1);
    grad.addColorStop(0.4, c2);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    return tx(c);
  }

  function texSky() {
    const c = cvs(512, 512);
    const g = c.getContext("2d")!;
    const grad = g.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, "rgb(4,8,12)");
    grad.addColorStop(0.55, "rgb(16,26,33)");
    grad.addColorStop(1, "rgb(28,38,44)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 512, 512);
    const glow = g.createRadialGradient(360, 120, 0, 360, 120, 210);
    glow.addColorStop(0, "rgba(233,242,201,0.24)");
    glow.addColorStop(1, "rgba(233,242,201,0)");
    g.fillStyle = glow;
    g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 420; i++) {
      g.fillStyle = `rgba(230,233,226,${0.12 + rnd() * 0.5})`;
      const x = rnd() * 512;
      const y = rnd() * 300;
      g.fillRect(x, y, rnd() < 0.5 ? 1 : 2, 1);
    }
    return tx(c);
  }

  function texRidge(dark: string, lit: string) {
    const c = cvs(2048, 512);
    const g = c.getContext("2d")!;
    g.fillStyle = dark;
    g.fillRect(0, 0, 2048, 512);
    const base = 430;
    let x = 0;
    while (x < 2048) {
      const w = 90 + rnd() * 160;
      const h = 70 + rnd() * 260;
      g.fillRect(x, base - h, w, 400);
      g.fillStyle = lit;
      for (let i = 0; i < 14; i++) {
        g.fillRect(x + 10 + rnd() * (w - 26), base - h + 20 + rnd() * (h - 46), 4, 8);
      }
      g.fillStyle = dark;
      x += w + 6;
    }
    return tx(c);
  }

  function texFloor() {
    const c = cvs(1024, 1024);
    const g = c.getContext("2d")!;
    g.fillStyle = "#0a0e12";
    g.fillRect(0, 0, 1024, 1024);
    g.strokeStyle = "rgba(215,255,63,0.05)";
    g.lineWidth = 1;
    for (let i = 0; i <= 16; i++) {
      g.beginPath();
      g.moveTo(i * 64, 0);
      g.lineTo(i * 64, 1024);
      g.stroke();
      g.beginPath();
      g.moveTo(0, i * 64);
      g.lineTo(1024, i * 64);
      g.stroke();
    }
    for (let i = 0; i < 90; i++) {
      g.fillStyle = `rgba(120,140,130,${0.04 + rnd() * 0.1})`;
      g.fillRect(rnd() * 1024, rnd() * 1024, 2 + rnd() * 5, 2 + rnd() * 5);
    }
    return tx(c, 8);
  }

  function texMote() {
    const c = cvs(64, 64);
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(240,255,190,1)");
    grad.addColorStop(0.55, "rgba(215,255,63,0.75)");
    grad.addColorStop(1, "rgba(215,255,63,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    return tx(c);
  }

  function buildSky() {
    const sky = new THREE.Mesh(
      new THREE.PlaneGeometry(360, 190),
      new THREE.MeshBasicMaterial({ map: texSky(), depthWrite: false, fog: false, toneMapped: false })
    );
    sky.position.set(0, 62, -108);
    sky.renderOrder = 0;
    scene.add(sky);

    const r1 = new THREE.Mesh(
      new THREE.PlaneGeometry(300, 26),
      new THREE.MeshBasicMaterial({ map: texRidge("#06090d", "rgba(255,178,90,0.5)"), transparent: true, depthWrite: false, fog: false })
    );
    r1.position.set(-90, 13, 0);
    r1.renderOrder = 1;
    scene.add(r1);

    const r2 = new THREE.Mesh(
      new THREE.PlaneGeometry(210, 19),
      new THREE.MeshBasicMaterial({ map: texRidge("#0a1015", "rgba(215,255,63,0.4)"), transparent: true, depthWrite: false, fog: false })
    );
    r2.position.set(-63, 9.5, 16);
    r2.renderOrder = 1;
    scene.add(r2);
  }

  function buildGround() {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(150, 150),
      new THREE.MeshStandardMaterial({ map: texFloor(), roughness: 0.74, metalness: 0.06, color: 0x69757a })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, -18);
    floor.receiveShadow = true;
    scene.add(floor);
  }

  function buildTower() {
    const platMat = new THREE.MeshStandardMaterial({ color: 0x131619, roughness: 0.5, metalness: 0.35 });
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x1a1d21, roughness: 0.6, metalness: 0.3 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x0e1114, roughness: 0.25, metalness: 0.7 });

    const podium = new THREE.Mesh(new THREE.BoxGeometry(42, PODIUM, 24), platMat);
    podium.position.set(0, PODIUM / 2, -45);
    scene.add(podium);

    const cope = new THREE.Mesh(new THREE.BoxGeometry(43, 0.34, 25), wallMat);
    cope.position.set(0, PODIUM - 0.17, -45);
    scene.add(cope);

    const steps = 12;
    const treads: THREE.BufferGeometry[] = [];
    for (let i = 0; i < steps; i++) {
      const w = 8.4 + (steps - i) * 0.35;
      treads.push(new THREE.BoxGeometry(w, 0.28, 0.62));
    }
    const treadMeshes = treads.map((g, i) => {
      const m = new THREE.Mesh(g, platMat);
      m.position.set(0, 0.14 + i * 0.28, -11 - i * 0.62);
      return m;
    });
    treadMeshes.forEach((m) => scene.add(m));

    const core = new THREE.Mesh(new THREE.BoxGeometry(13.6, 5.0, 8.2), glassMat);
    core.position.set(0, PODIUM + 2.5, TOWER_Z);
    scene.add(core);

    const litMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.0, 2.2, 0.5), toneMapped: false });
    const warmMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.4, 1.3, 0.45), toneMapped: false });
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        const mat = (row + col) % 2 === 0 ? litMat : warmMat;
        const bay = new THREE.Mesh(new THREE.PlaneGeometry(1.55, 2.5), mat);
        bay.position.set(-4.8 + col * 2.4, PODIUM + 1.6 + row * 2.7, TOWER_Z + 4.11);
        scene.add(bay);
      }
    }
    const lattice = new THREE.Mesh(
      new THREE.PlaneGeometry(14.2, 5.8),
      new THREE.MeshBasicMaterial({ color: 0x0a0d10, transparent: true, opacity: 0.55, depthWrite: false })
    );
    lattice.position.set(0, PODIUM + 2.5, TOWER_Z + 4.15);
    scene.add(lattice);

    const glowSpill = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 16),
      new THREE.MeshBasicMaterial({ map: texGlow("rgba(215,255,63,0.5)", "rgba(160,190,40,0.15)"), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    glowSpill.position.set(0, PODIUM + 3, TOWER_Z + 5.6);
    glowSpill.renderOrder = 2;
    scene.add(glowSpill);

    const mist = new THREE.Mesh(
      new THREE.PlaneGeometry(64, 20),
      new THREE.MeshBasicMaterial({ map: texGlow("rgba(170,200,205,0.4)", "rgba(110,150,160,0.12)"), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    mist.position.set(0, PODIUM + 5.6, TOWER_Z + 10);
    mist.renderOrder = 2;
    scene.add(mist);

    const roof = new THREE.Mesh(new THREE.ConeGeometry(7.2, 4.6, 4, 1), wallMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(0, PODIUM + 8.0, TOWER_Z);
    scene.add(roof);

    const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.3, 3.2, 8), wallMat);
    spire.position.set(0, PODIUM + 11.7, TOWER_Z);
    scene.add(spire);

    const beacon = new THREE.Mesh(
      new THREE.PlaneGeometry(1.1, 1.1),
      new THREE.MeshBasicMaterial({ map: texGlow("rgba(215,255,63,0.9)", "rgba(215,255,63,0.2)"), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
    );
    beacon.position.set(0, PODIUM + 13.4, TOWER_Z);
    beacon.userData.billboard = true;
    scene.add(beacon);

    const beaconLight = new THREE.PointLight(0xd7ff3f, 60, 30, 2);
    beaconLight.position.set(0, PODIUM + 13.4, TOWER_Z);
    scene.add(beaconLight);

    const wings: Array<[number, number]> = [
      [10.6, -45],
      [-10.6, -45],
    ];
    wings.forEach(([x, z]) => {
      const wing = new THREE.Mesh(new THREE.BoxGeometry(7.6, 3.4, 5.2), glassMat);
      wing.position.set(x, PODIUM + 1.7, z + 1);
      scene.add(wing);
      for (let i = 0; i < 3; i++) {
        const bay = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.6), (i + x) % 2 === 0 ? litMat : warmMat);
        bay.position.set(x, PODIUM + 1.7, z + 1 + 2.61);
        scene.add(bay);
      }
      const wRoof = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.4, 6.2), wallMat);
      wRoof.position.set(x, PODIUM + 3.6, z + 1);
      scene.add(wRoof);
    });

    const windowLight = new THREE.PointLight(0xffb347, 90, 34, 2);
    windowLight.position.set(0, PODIUM + 3.5, TOWER_Z + 7);
    scene.add(windowLight);

    const fill = new THREE.PointLight(0x86c6d2, 28, 30, 2);
    fill.position.set(-1, PODIUM + 6.5, -16);
    scene.add(fill);
  }

  function buildMoon() {
    const disc = new THREE.Mesh(
      new THREE.PlaneGeometry(MOON.r * 2, MOON.r * 2),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(3.0, 3.4, 2.0), transparent: true, depthWrite: false, fog: false, toneMapped: false })
    );
    disc.position.set(MOON.x, MOON.y, MOON.z);
    scene.add(disc);

    const corona = new THREE.Mesh(
      new THREE.PlaneGeometry(MOON.r * 6.4, MOON.r * 6.4),
      new THREE.MeshBasicMaterial({ map: texGlow("rgba(233,242,201,0.75)", "rgba(190,215,120,0.2)"), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
    );
    corona.position.set(MOON.x, MOON.y, MOON.z - 0.3);
    corona.renderOrder = 0;
    scene.add(corona);

    const moonLight = new THREE.PointLight(0xfff3c0, 70, 70, 2);
    moonLight.position.set(MOON.x, MOON.y, MOON.z);
    scene.add(moonLight);
  }

  function buildArches() {
    const lacquer = new THREE.MeshStandardMaterial({ color: 0x111418, roughness: 0.6, metalness: 0.4 });
    const gold = new THREE.MeshStandardMaterial({ color: 0x8f8a5a, roughness: 0.38, metalness: 0.78 });

    const arch = (scale: number, z: number) => {
      const group = new THREE.Group();
      const s = scale;
      const cols: Array<[number, number]> = [
        [-3.55, 0],
        [3.55, 0],
      ];
      cols.forEach(([x]) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.3 * s, 0.38 * s, 8.2 * s, 26), lacquer);
        col.position.set(x * s, 4.1 * s, 0);
        group.add(col);
        const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.4 * s, 0.4 * s, 0.3 * s, 18), gold);
        ring.position.set(x * s, 0.2 * s, 0);
        group.add(ring);
      });
      const beamLow = new THREE.Mesh(new THREE.BoxGeometry(9.4 * s, 0.52 * s, 0.46 * s), lacquer);
      beamLow.position.set(0, 8.26 * s, 0);
      group.add(beamLow);
      const beamTop = new THREE.Mesh(new THREE.BoxGeometry(8.9 * s, 0.6 * s, 0.5 * s), lacquer);
      beamTop.position.set(0, 9.74 * s, 0);
      group.add(beamTop);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(9.8 * s, 0.26 * s, 0.72 * s), gold);
      cap.position.set(0, 10.22 * s, 0);
      group.add(cap);
      const rim = new THREE.Mesh(
        new THREE.PlaneGeometry(9.4 * s, 0.1 * s),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(1.6, 1.9, 0.4), transparent: true, opacity: 0.85, depthWrite: false, toneMapped: false })
      );
      rim.position.set(0, 8.52 * s, 0.24 * s);
      group.add(rim);
      const rimLight = new THREE.PointLight(0xd7ff3f, 26, 12, 2);
      rimLight.position.set(0, 8.5 * s, 0.6 * s);
      group.add(rimLight);
      group.position.set(0, -0.562 * s, z);
      group.scale.setScalar(s);
      return group;
    };

    scene.add(arch(0.72, -8.6));
    scene.add(arch(0.95, -20.5));
  }

  function buildBeacons() {
    const stone = new THREE.MeshStandardMaterial({ color: 0x1c2024, roughness: 0.7 });
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x14171a, roughness: 0.5 });
    const paneMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.1, 2.4, 0.55), toneMapped: false });

    const beacon = (x: number, y: number, s: number) => {
      const group = new THREE.Group();
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * s, 0.3 * s, 0.7 * s, 10), stone);
      base.position.y = 0.35 * s;
      group.add(base);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09 * s, 0.11 * s, 0.7 * s, 10), stone);
      post.position.y = 1.05 * s;
      group.add(post);
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.5 * s, 0.5 * s, 0.5 * s), boxMat);
      box.position.y = 1.66 * s;
      group.add(box);
      for (const [dx, dz] of [
        [0.26 * s, 0],
        [-0.26 * s, 0],
        [0, 0.26 * s],
        [0, -0.26 * s],
      ]) {
        const pane = new THREE.Mesh(new THREE.PlaneGeometry(0.34 * s, 0.34 * s), paneMat);
        pane.position.set(dx, 1.66 * s, dz);
        group.add(pane);
      }
      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.62 * s, 0.34 * s, 4, 1), stone);
      roof.rotation.y = Math.PI / 4;
      roof.position.y = 2.1 * s;
      group.add(roof);
      const glow = new THREE.Mesh(
        new THREE.PlaneGeometry(3.4 * s, 3.4 * s),
        new THREE.MeshBasicMaterial({ map: texGlow("rgba(215,255,63,0.75)", "rgba(150,180,40,0.18)"), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      glow.position.y = 1.66 * s;
      glow.userData.billboard = true;
      group.add(glow);
      const light = new THREE.PointLight(0xd7ff3f, 55, 12, 2);
      light.position.y = 1.66 * s;
      group.add(light);
      group.position.set(x, y, 0);
      group.userData.light = light;
      group.userData.glow = glow;
      WORLD.beacons.push(group);
      return group;
    };

    scene.add(beacon(7.4, -7.0, 1.15));
    scene.add(beacon(-7.6, -5.2, 1.0));
    const cheekX = (z: number) => {
      const i = Math.round((-z - 11) / 0.62);
      return (8.4 + (12 - i) * 0.35) / 2 + 0.45;
    };
    for (const z of [-14.4, -23.5]) {
      scene.add(beacon(cheekX(z), 0.75 + (-z - 11) * 0.28, 0.9));
      scene.add(beacon(-cheekX(z), 0.75 + (-z - 11) * 0.28, 0.9));
    }
  }

  function buildSatellites() {
    const mat = new THREE.MeshStandardMaterial({ color: 0x1a1e22, emissive: 0xd7ff3f, emissiveIntensity: 0.35, metalness: 0.8, roughness: 0.3 });
    const sats: Array<[number, number, number, number]> = [
      [6, 9, -28, 0.9],
      [-7, 12, -34, 0.7],
      [9.5, 7.5, -40, 1.1],
    ];
    sats.forEach(([x, y, z, r]) => {
      const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), mat);
      m.position.set(x, y, z);
      m.userData = { oy: y, sp: 0.4 + rnd() * 0.5, ph: rnd() * TAU };
      scene.add(m);
      disposables.push(m.geometry);
    });
  }

  function buildEmbers() {
    const N = LOW ? 220 : 460;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    const seed = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (rnd() - 0.5) * 40;
      pos[i * 3 + 1] = rnd() * 11.5;
      pos[i * 3 + 2] = -38 + rnd() * 40;
      seed[i] = rnd();
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
      uniforms: { uT: { value: 0 }, uSize: { value: vpH() * 0.5 } },
      vertexShader: `
        attribute float aSeed;
        uniform float uT;
        uniform float uSize;
        varying float vA;
        void main() {
          vec3 p = position;
          p.y = mod(p.y + uT * (0.14 + aSeed * 0.28), 11.5);
          p.x += sin(uT * (0.6 + aSeed) + aSeed * 6.28) * 0.6;
          p.z += cos(uT * (0.5 + aSeed) + aSeed * 6.28) * 0.6;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float s = uSize * (0.010 + aSeed * 0.020) / max(-mv.z, 0.6);
          gl_PointSize = s;
          vA = 0.75;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying float vA;
        void main() {
          vec2 d = gl_PointCoord - 0.5;
          float a = smoothstep(0.5, 0.0, length(d));
          gl_FragColor = vec4(vec3(0.84, 1.0, 0.25), vA * a);
        }
      `,
    });
    const points = new THREE.Points(geo, mat);
    points.renderOrder = 5;
    points.frustumCulled = false;
    scene.add(points);
    disposables.push(geo, mat);
    return mat;
  }

  function buildRain() {
    if (LOW || reduceMotion) return null;
    const N = 900;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 2 * 3);
    const top = new Float32Array(N);
    const speed = new Float32Array(N);
    const len = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const x = (rnd() - 0.5) * 44;
      const y = rnd() * 17;
      const z = -38 + rnd() * 40;
      pos[i * 6] = x;
      pos[i * 6 + 1] = y;
      pos[i * 6 + 2] = z;
      pos[i * 6 + 3] = x;
      pos[i * 6 + 4] = y - 1;
      pos[i * 6 + 5] = z;
      top[i] = y;
      speed[i] = 7 + rnd() * 9;
      len[i] = 0.6 + rnd() * 0.8;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aTop", new THREE.BufferAttribute(top, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
    geo.setAttribute("aLen", new THREE.BufferAttribute(len, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
      uniforms: { uT: { value: 0 } },
      vertexShader: `
        attribute float aTop;
        attribute float aSpeed;
        attribute float aLen;
        uniform float uT;
        varying float vA;
        void main() {
          vec3 p = position;
          float cy = mod(aTop - uT * aSpeed, 17.0);
          p.y = cy - aLen * (position.y - aTop);
          vA = smoothstep(0.0, 1.2, cy) * smoothstep(17.0, 15.6, cy) * 0.4;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        varying float vA;
        void main() {
          gl_FragColor = vec4(0.55, 0.74, 0.82, vA * 0.024);
        }
      `,
    });
    const rain = new THREE.LineSegments(geo, mat);
    rain.renderOrder = 6;
    rain.frustumCulled = false;
    scene.add(rain);
    disposables.push(geo, mat);
    return mat;
  }

  function buildMotes() {
    const N = LOW ? 110 : 260;
    const geo = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.4, 0.4), new THREE.MeshStandardMaterial({ map: texMote(), transparent: true, alphaTest: 0.1, depthWrite: false, side: THREE.DoubleSide }), N);
    geo.frustumCulled = false;
    const states = new Array(N).fill(0).map(() => ({
      x: (rnd() - 0.5) * 30,
      y: rnd() * 14,
      z: -30 + rnd() * 30,
      fall: 0.5 + rnd() * 0.9,
      sway: 0.45 + rnd() * 1.5,
      swayAmp: 0.3 + rnd() * 0.95,
      spin: (rnd() - 0.5) * 2.6,
      roll: 0.5 + rnd() * 2,
      scale: 0.55 + rnd() * 0.9,
    }));
    const dummy = new THREE.Object3D();
    const mat4 = new THREE.Matrix4();
    const fwd = new THREE.Vector3();
    states.forEach((s, i) => {
      dummy.position.set(s.x, s.y, s.z);
      dummy.scale.setScalar(s.scale);
      dummy.updateMatrix();
      geo.setMatrixAt(i, dummy.matrix);
    });
    scene.add(geo);
    disposables.push(geo.geometry, geo.material as THREE.Material);
    return { geo, states, dummy, mat4, fwd };
  }

  function buildHaze() {
    const hazeTex = texGlow("rgba(160,205,210,0.55)", "rgba(110,165,175,0.18)");
    const haze = [];
    for (let i = 0; i < (LOW ? 4 : 6); i++) {
      const s = 12 + rnd() * 15;
      const h = new THREE.Mesh(
        new THREE.PlaneGeometry(s, s * 0.55),
        new THREE.MeshBasicMaterial({ map: hazeTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, opacity: 0.05 + rnd() * 0.07 })
      );
      h.position.set((rnd() - 0.5) * 44, 1.5 + rnd() * 10, -38 + rnd() * 40);
      h.renderOrder = 4;
      h.userData = { sp: 0.06 + rnd() * 0.12, ph: rnd() * TAU, x0: h.position.x };
      scene.add(h);
      haze.push(h);
    }
    return haze;
  }

  function buildWordmark() {
    const SZ = 320;
    const TRACK = 0.4;
    const PAD = 26;
    const probe = document.createElement("span");
    probe.className = "font-display";
    probe.style.position = "absolute";
    document.body.appendChild(probe);
    const fam = getComputedStyle(probe).fontFamily;
    probe.remove();
    const m = cvs(4, 4).getContext("2d")!;
    m.font = `600 ${SZ}px ${fam}, sans-serif`;
    m.textBaseline = "alphabetic";
    m.textAlign = "left";
    const word = "ZYRIX";
    const gl = [];
    let pen = 0;
    let ascMax = 0;
    let descMax = 0;
    let xMin = 1e9;
    let xMax = -1e9;
    for (const ch of word) {
      const t = m.measureText(ch);
      const g = { ch, adv: t.width, asc: t.actualBoundingBoxAscent, desc: t.actualBoundingBoxDescent, l: t.actualBoundingBoxLeft, r: t.actualBoundingBoxRight, pen };
      gl.push(g);
      ascMax = Math.max(ascMax, g.asc);
      descMax = Math.max(descMax, g.desc);
      xMin = Math.min(xMin, pen - g.l);
      xMax = Math.max(xMax, pen + g.r);
      pen += t.width + TRACK * SZ;
    }
    const group = new THREE.Group();
    gl.forEach((g) => {
      const cw = Math.ceil(g.l + g.r) + PAD * 2;
      const chh = Math.ceil(g.asc + g.desc) + PAD * 2;
      const c = cvs(cw, chh);
      const x = c.getContext("2d")!;
      x.font = `600 ${SZ}px ${fam}, sans-serif`;
      x.textBaseline = "alphabetic";
      x.textAlign = "left";
      const gy0 = PAD + g.asc - ascMax;
      const gy1 = PAD + g.asc + descMax * 0.4;
      const grad = x.createLinearGradient(0, gy0, 0, gy1);
      grad.addColorStop(0, "rgb(230,236,229)");
      grad.addColorStop(0.52, "rgb(206,220,198)");
      grad.addColorStop(1, "rgb(196,224,120)");
      x.fillStyle = grad;
      x.fillText(g.ch, PAD + g.l, PAD + g.asc);
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(cw, chh),
        new THREE.MeshBasicMaterial({ map: tx(c, 16), transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: true })
      );
      mesh.position.set(g.pen + (g.r - g.l) / 2, (g.asc - g.desc) / 2, 0);
      mesh.renderOrder = 12;
      mesh.frustumCulled = false;
      mesh.userData.baseY = mesh.position.y;
      group.add(mesh);
      WORD.glyphs.push(mesh);
    });
    group.position.z = WORD_Z;
    scene.add(group);
    WORD.group = group;
    WORD.ink = { xMin, xMax, cx: (xMin + xMax) / 2, w: xMax - xMin, asc: ascMax };
  }

  function buildWisps() {
    if (LOW || reduceMotion || coarse) return null;
    const N = 190;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    const seed = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (rnd() - 0.5) * 2.4;
      pos[i * 3 + 1] = (rnd() - 0.5) * 1.6;
      pos[i * 3 + 2] = 0;
      seed[i] = rnd();
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      fog: false,
      uniforms: { uT: { value: 0 }, uPx: { value: vpH() } },
      vertexShader: `
        attribute float aSeed;
        uniform float uT;
        uniform float uPx;
        varying float vA;
        void main() {
          vec3 p = position;
          float t = mod(uT * (0.12 + aSeed * 0.2) + aSeed * 6.283, 2.5) - 0.6;
          p.y += t * 1.2;
          p.x += sin(uT * 1.3 + aSeed * 6.28) * 0.17;
          float life = smoothstep(0.0, 0.1, t) * (1.0 - smoothstep(0.3, 0.95, t));
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = uPx * (0.004 + aSeed * 0.008) / max(-mv.z, 0.4);
          vA = life * 0.6;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying float vA;
        void main() {
          vec2 d = gl_PointCoord - 0.5;
          float a = smoothstep(0.5, 0.0, length(d));
          gl_FragColor = vec4(vec3(0.9, 0.95, 0.75), vA * a);
        }
      `,
    });
    const points = new THREE.Points(geo, mat);
    points.position.z = -3.4;
    points.frustumCulled = false;
    camera.add(points);
    scene.add(camera);
    disposables.push(geo, mat);
    return mat;
  }

  const WORLD: { beacons: THREE.Group[]; haze: THREE.Mesh[]; sats: THREE.Mesh[]; emberMat: THREE.ShaderMaterial | null; rainMat: THREE.ShaderMaterial | null; wispMat: THREE.ShaderMaterial | null; motes: ReturnType<typeof buildMotes> | null; fog: THREE.FogExp2 } = {
    beacons: [],
    haze: [],
    sats: [],
    emberMat: null,
    rainMat: null,
    wispMat: null,
    motes: null,
    fog: scene.fog as THREE.FogExp2,
  };

  let composer: EffectComposer | null = null;
  let bloom: UnrealBloomPass | null = null;

  function buildPost() {
    if (!WANT_POST) return;
    const target = new THREE.WebGLRenderTarget(Math.max(1, Math.floor(vpW() * Math.min(window.devicePixelRatio || 1, DPR_CAP))), Math.max(1, Math.floor(vpH() * Math.min(window.devicePixelRatio || 1, DPR_CAP))), {
      type: THREE.HalfFloatType,
      samples: LOW ? 0 : 2,
      depthBuffer: true,
    });
    composer = new EffectComposer(renderer, target);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(vpW(), vpH()), 0.55, 0.5, 0.78);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
  }

  function buildScene() {
    buildSky();
    buildGround();
    buildTower();
    buildMoon();
    buildArches();
    buildBeacons();
    buildSatellites();
    WORLD.emberMat = buildEmbers();
    WORLD.rainMat = buildRain();
    WORLD.motes = buildMotes();
    WORLD.haze = buildHaze();
    WORLD.wispMat = buildWisps();
    if (!pageMode) buildWordmark();
    buildPost();
  }

  let curveP: THREE.CatmullRomCurve3;
  let curveT: THREE.CatmullRomCurve3;
  const _p = new THREE.Vector3();
  const _t = new THREE.Vector3();
  const _d = new THREE.Vector3();

  function buildRig() {
    curveP = new THREE.CatmullRomCurve3(CAM.map((c) => new THREE.Vector3(c.p[0], c.p[1], c.p[2])), false, "catmullrom", 0.42);
    curveT = new THREE.CatmullRomCurve3(CAM.map((c) => new THREE.Vector3(c.t[0], c.t[1], c.t[2])), false, "catmullrom", 0.42);
  }

  const aspectFix = () => clamp((1.62 - vpW() / vpH()) / 1.05, 0, 1);

  function fitAspect(p: THREE.Vector3, t: THREE.Vector3, fov: number) {
    const nf = aspectFix();
    if (nf <= 0) return fov;
    _d.subVectors(p, t).normalize();
    p.addScaledVector(_d, nf * 8.2);
    p.y += nf * 1.1;
    return fov * (1 + nf * 0.4);
  }

  function applyCamera() {
    if (pageMode) {
      const c = CAM[0];
      _p.set(c.p[0], c.p[1], c.p[2]);
      _t.set(c.t[0], c.t[1], c.t[2]);
      const fov = fitAspect(_p, _t, c.fov);
      _p.x += Math.sin(clock * 0.11) * 1.3;
      _p.y += Math.sin(clock * 0.08 + 1.7) * 0.5;
      _t.y += Math.sin(clock * 0.06 + 0.6) * 0.4;
      const par = 1 - smooth(0, 1.6, RIG.smooth) * 0.55;
      _p.x += RIG.mx * 0.62 * par;
      _p.y += RIG.my * 0.34 * par;
      _t.x -= RIG.mx * 0.2 * par;
      _t.y -= RIG.my * 0.12 * par;
      _p.y += RIG.hover * 0.55;
      _t.y += RIG.hover * 0.3;
      camera.position.copy(_p);
      camera.lookAt(_t);
      if (Math.abs(camera.fov - fov) > 1e-4) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
      return;
    }
    const N = CAM.length - 1;
    const u = clamp(RIG.smooth / N, 0, 1);
    curveP.getPoint(u, _p);
    curveT.getPoint(u, _t);
    const i = clamp(Math.floor(RIG.smooth), 0, N - 1);
    const f = clamp(RIG.smooth - i, 0, 1);
    let fov = lerp(CAM[i].fov, CAM[i + 1].fov, f);
    fov = fitAspect(_p, _t, fov);
    const io = 1 - RIG.intro;
    _p.z += io * 5.6;
    _p.y += io * 0.65;
    fov += io * 8;
    const par = 1 - smooth(0, 1.6, RIG.smooth) * 0.55;
    _p.x += RIG.mx * 0.62 * par;
    _p.y += RIG.my * 0.34 * par;
    _t.x -= RIG.mx * 0.2 * par;
    _t.y -= RIG.my * 0.12 * par;
    _p.y += RIG.hover * 0.55;
    _t.y += RIG.hover * 0.3;
    camera.position.copy(_p);
    camera.lookAt(_t);
    if (Math.abs(camera.fov - fov) > 1e-4) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }

  let anchors: number[] = [];
  let maxScroll = 1;

  function measure() {
    if (pageMode) {
      anchors = [0, 1];
      maxScroll = 1;
      return;
    }
    maxScroll = Math.max(1, document.documentElement.scrollHeight - vpH());
    const secs = Array.from(document.querySelectorAll("[data-cam]"));
    anchors = secs.map((el, i) => {
      if (i === 0) return 0;
      if (i === secs.length - 1) return maxScroll;
      return clamp((el as HTMLElement).offsetTop + (el as HTMLElement).offsetHeight * 0.5 - vpH() * 0.5, 0, maxScroll);
    });
    for (let i = 1; i < anchors.length; i++) anchors[i] = Math.max(anchors[i], anchors[i - 1] + 1);
  }

  function progressFor(y: number) {
    if (y <= anchors[0]) return 0;
    for (let i = 0; i < anchors.length - 1; i++) {
      if (y <= anchors[i + 1]) return i + (y - anchors[i]) / (anchors[i + 1] - anchors[i]);
    }
    return anchors.length - 1;
  }

  const tmpCam = new THREE.PerspectiveCamera(CAM[0].fov, vpW() / vpH(), 0.35, 220);

  function layoutWord() {
    if (!WORD.group || !WORD.ink) return;
    const c = CAM[0];
    const hp = new THREE.Vector3(c.p[0], c.p[1], c.p[2]);
    const ht = new THREE.Vector3(c.t[0], c.t[1], c.t[2]);
    tmpCam.fov = fitAspect(hp, ht, c.fov);
    tmpCam.aspect = vpW() / vpH();
    tmpCam.position.copy(hp);
    tmpCam.lookAt(ht);
    tmpCam.updateProjectionMatrix();
    tmpCam.updateMatrixWorld(true);
    const hit = (nx: number, ny: number) => {
      const v = new THREE.Vector3(nx, ny, 0.5).unproject(tmpCam).sub(tmpCam.position).normalize();
      return tmpCam.position.clone().addScaledVector(v, (WORD_Z - tmpCam.position.z) / v.z);
    };
    const L = hit(-1, 0);
    const R = hit(1, 0);
    const narrow = vpW() / vpH() < 1.05;
    const fill = narrow ? 0.96 : 1.0;
    const s = (R.x - L.x) * fill / WORD.ink.w;
    const base = hit(0, narrow ? -0.16 : -0.585);
    WORD.group.scale.setScalar(s);
    WORD.group.position.set(-WORD.ink.cx * s, base.y, WORD_Z);
    WORD.rise = WORD.ink.asc * s * 1.25;
  }

  let running = false;
  let tPrev = 0;
  let clock = 0;

  function update(dt: number) {
    clock += dt;
    if (pageMode) RIG.prog = 0;
    else RIG.prog = progressFor(window.scrollY);
    RIG.smooth = reduceMotion ? RIG.prog : damp(RIG.smooth, RIG.prog, 5.2, dt);
    RIG.mx = damp(RIG.mx, RIG.tmx, 2.6, dt);
    RIG.my = damp(RIG.my, RIG.tmy, 2.6, dt);
    if (RIG.intro < 1) {
      RIG.intro = Math.min(1, RIG.intro + dt * 1.4);
      RIG.revealed = Math.min(1.2, RIG.revealed + dt * 0.7);
    }
    RIG.focusAmt = damp(RIG.focusAmt, RIG.focus >= 0 ? 1 : 0, 5, dt);
    RIG.hover = damp(RIG.hover, RIG.hoverT, 4.2, dt);
    RIG.energy = damp(RIG.energy, 1 + (pageMode ? 0 : RIG.smooth / (CAM.length - 1)) * 0.55 + RIG.hover * 0.6, 3, dt);

    const f = RIG.focusAmt;
    WORLD.beacons.forEach((b, i) => {
      const light = b.userData.light as THREE.PointLight;
      const glow = b.userData.glow as THREE.Mesh;
      light.intensity = 55 * RIG.energy * (1 + f * 0.55) * (0.86 + 0.22 * Math.sin(clock * (2.3 + i * 0.7) + i * 2.1));
      if (glow) (glow.material as THREE.MeshBasicMaterial).opacity = 0.55 * (0.8 + RIG.energy * 0.25) + f * 0.25;
    });
    scene.traverse((obj) => {
      if (obj.userData.billboard) obj.quaternion.copy(camera.quaternion);
    });
    WORLD.haze.forEach((h) => {
      h.position.x = h.userData.x0 + Math.sin(clock * h.userData.sp + h.userData.ph) * 5.5;
    });
    WORLD.sats.forEach((m) => {
      m.position.y = m.userData.oy + Math.sin(clock * m.userData.sp + m.userData.ph) * 0.8;
      m.rotation.y += dt * 0.2;
    });
    if (WORLD.emberMat) WORLD.emberMat.uniforms.uT.value = clock;
    if (WORLD.rainMat) WORLD.rainMat.uniforms.uT.value = clock;
    if (WORLD.wispMat) WORLD.wispMat.uniforms.uT.value = clock;
    if (bloom) bloom.strength = 0.5 + RIG.energy * 0.32 + RIG.hover * 0.2;

    if (WORLD.motes) {
      const { geo, states, dummy, fwd } = WORLD.motes;
      camera.getWorldDirection(fwd);
      const cx = camera.position.x;
      const cz = camera.position.z;
      const fx = fwd.x;
      const fz = fwd.z;
      for (let i = 0; i < states.length; i++) {
        const s = states[i];
        s.y -= s.fall * dt;
        s.x += Math.sin(clock * s.sway + i) * s.swayAmp * dt;
        let dx = s.x - cx;
        let dz = s.z - cz;
        const r = Math.hypot(dx, dz);
        if (r > 30) {
          dx *= 30 / r;
          dz *= 30 / r;
          s.x = cx + dx;
          s.z = cz + dz;
        }
        if (s.y < camera.position.y - 10) {
          s.y = camera.position.y + 16;
          s.x = cx + fx * 11 + (rnd() - 0.5) * 24;
          s.z = cz + fz * 11 + (rnd() - 0.5) * 24;
        }
        dummy.rotation.set(s.roll * clock * 0.5, s.spin * clock, Math.sin(clock * s.sway) * 0.5);
        dummy.position.set(s.x, s.y, s.z);
        dummy.scale.setScalar(s.scale);
        dummy.updateMatrix();
        geo.setMatrixAt(i, dummy.matrix);
      }
      geo.instanceMatrix.needsUpdate = true;
    }

    if (WORD.group && !pageMode) {
      WORD.glyphs.forEach((g, i) => {
        const st = clamp((RIG.revealed - i * 0.075) / 0.62, 0, 1);
        const e = 1 - Math.pow(1 - st, 3);
        g.position.y = g.userData.baseY - (1 - e) * WORD.rise;
      });
    }

    applyCamera();
  }

  function render(now: number) {
    const dt = Math.min(0.05, (now - tPrev) / 1000);
    tPrev = now;
    update(dt);
    if (composer) composer.render();
    else renderer.render(scene, camera);
  }

  let raf = 0;
  let destroyed = false;

  function queue() {
    if (destroyed) return;
    raf = requestAnimationFrame((now) => {
      if (destroyed) return;
      render(now);
      queue();
    });
  }

  const onResize = () => {
    renderer.setSize(vpW(), vpH(), true);
    camera.aspect = vpW() / vpH();
    camera.updateProjectionMatrix();
    if (composer) {
      composer.setSize(vpW(), vpH());
      composer.setPixelRatio(Math.min(window.devicePixelRatio || 1, DPR_CAP));
    }
    measure();
    layoutWord();
  };

  const onVisibility = () => {
    if (document.hidden) running = false;
    else if (!running && !destroyed) {
      running = true;
      tPrev = performance.now();
      queue();
    }
  };

  const onPointer = (e: PointerEvent) => {
    RIG.tmx = (e.clientX / vpW()) * 2 - 1;
    RIG.tmy = -((e.clientY / vpH()) * 2 - 1);
  };

  const onScroll = () => {
    if (reduceMotion) RIG.smooth = RIG.prog = progressFor(window.scrollY);
  };

  const onLoad = () => {
    measure();
    layoutWord();
  };

  function setFocus(i: number) {
    RIG.focus = i;
  }

  function setHover(h: number) {
    RIG.hoverT = Math.max(0, Math.min(1, h));
  }

  buildScene();
  buildRig();
  measure();
  layoutWord();

  let preloadCb: ((p: number) => void) | null = null;

  const start = () => {
    if (destroyed) return;
    addEventListener("resize", onResize, { passive: true });
    addEventListener("pointermove", onPointer, { passive: true });
    addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    addEventListener("load", onLoad);
    running = true;
    tPrev = performance.now();
    RIG.intro = reduceMotion || pageMode ? 1 : 0;
    RIG.revealed = reduceMotion || pageMode ? 1.2 : 0;
    queue();
    let p = 0;
    const tick = setInterval(() => {
      p = Math.min(1, p + 0.16);
      if (preloadCb) preloadCb(p);
      if (p >= 1) clearInterval(tick);
    }, 120);
  };

  const destroy = () => {
    destroyed = true;
    cancelAnimationFrame(raf);
    removeEventListener("resize", onResize);
    removeEventListener("pointermove", onPointer);
    removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onVisibility);
    removeEventListener("load", onLoad);
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const m = obj.material as THREE.Material | THREE.Material[];
        if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
        else m.dispose();
      }
    });
    disposables.forEach((d) => d.dispose());
    composer?.dispose();
    renderer.dispose();
  };

  return {
    start,
    destroy,
    setFocus,
    setHover,
    onPreload: (cb) => {
      preloadCb = cb;
    },
  };
}