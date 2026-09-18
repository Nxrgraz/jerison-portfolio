'use client';

import {useEffect, useRef, useState} from 'react';
import {sitePath} from './site-path';

export default function CadViewer({slug, title}:{slug:string; title:string}) {
  const host = useRef<HTMLDivElement>(null);
  const reset = useRef<() => void>(() => {});
  const [state, setState] = useState('Loading assembly…');
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let disposed = false;
    let cleanup = () => {};
    const abort = new AbortController();
    async function setup() {
      const [THREE, {OrbitControls}, response] = await Promise.all([
        import('three'), import('three/addons/controls/OrbitControls.js'),
        fetch(sitePath(`/cad-previews/${slug}.json`), {signal:abort.signal}),
      ]);
      if (!response.ok) throw new Error('Assembly unavailable');
      const meshes: {positions:number[]; indices:number[]; color?:number[]}[] = await response.json();
      if (disposed || !container) return;
      const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.setAttribute('aria-label', `${title} interactive 3D assembly`);
      container.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 10000);
      camera.up.set(0, 0, 1);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x53606c, 2.5));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(300, -200, 500);
      scene.add(light);
      const group = new THREE.Group();
      meshes.forEach((mesh, i) => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(mesh.positions, 3));
        geometry.setIndex(mesh.indices);
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({color: i % 3 === 0 ? 0x829ba4 : 0xc0c6c8, metalness:0.18, roughness:0.6, side:THREE.DoubleSide});
        group.add(new THREE.Mesh(geometry, material));
      });
      scene.add(group);
      const bounds = new THREE.Box3().setFromObject(group);
      const center = bounds.getCenter(new THREE.Vector3());
      group.position.sub(center);
      const size = bounds.getSize(new THREE.Vector3()).length();
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minDistance = size * 0.3;
      controls.maxDistance = size * 5;
      reset.current = () => { camera.position.set(size * 1.2, -size * 1.5, size * 0.9); controls.target.set(0,0,0); controls.update(); };
      reset.current();
      const resize = new ResizeObserver(() => {
        camera.aspect = container.clientWidth / Math.max(container.clientHeight, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      });
      resize.observe(container);
      renderer.setAnimationLoop(() => { controls.update(); renderer.render(scene, camera); });
      cleanup = () => {
        resize.disconnect(); controls.dispose(); renderer.setAnimationLoop(null);
        group.children.forEach(child => { const mesh = child as InstanceType<typeof THREE.Mesh>; mesh.geometry.dispose(); (mesh.material as InstanceType<typeof THREE.Material>).dispose(); });
        renderer.dispose(); renderer.domElement.remove();
      };
      setState('');
    }
    setup().catch(() => { if (!disposed) setState('3D preview unavailable. Download the STEP assembly below.'); });
    return () => { disposed = true; abort.abort(); cleanup(); };
  }, [slug, title]);
  return <div className="cadPreview">
    <div ref={host} className="cadCanvas" role="img" aria-label={`${title} CAD preview`}/>
    {state && <p className="cadLoading" role="status">{state}</p>}
    <div className="cadControls"><span>Drag to rotate · Scroll to zoom</span><button onClick={() => reset.current()} aria-label={`Reset ${title} view`}>RESET VIEW</button></div>
  </div>;
}
