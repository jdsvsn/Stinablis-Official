"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCube() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Main cube wireframe
    const geo = new THREE.BoxGeometry(2, 2, 2);
    const edges = new THREE.EdgesGeometry(geo);
    const mat = new THREE.LineBasicMaterial({ color: 0xfc673f, linewidth: 2 });
    const cube = new THREE.LineSegments(edges, mat);
    scene.add(cube);

    // Inner cube
    const geo2 = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const edges2 = new THREE.EdgesGeometry(geo2);
    const mat2 = new THREE.LineBasicMaterial({ color: 0xdff122, linewidth: 1 });
    const cube2 = new THREE.LineSegments(edges2, mat2);
    scene.add(cube2);

    // Dots at corners
    const dotGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xfc673f });
    const corners = [
      [-1,-1,-1],[-1,-1,1],[-1,1,-1],[-1,1,1],
      [1,-1,-1],[1,-1,1],[1,1,-1],[1,1,1]
    ];
    corners.forEach(([x,y,z]) => {
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x,y,z);
      cube.add(dot); // Attach to main cube for rotation
    });

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize handler
    let currentWidth = width;
    let currentHeight = height;
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === currentWidth && h === currentHeight) return;
      currentWidth = w;
      currentHeight = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation
    let animId: number;
    let t = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.005;

      cube.rotation.x += (mouseY * 0.3 - cube.rotation.x) * 0.04;
      cube.rotation.y += (mouseX * 0.3 + t - cube.rotation.y) * 0.04;
      cube2.rotation.x = -cube.rotation.x * 1.5;
      cube2.rotation.y = -cube.rotation.y * 1.5;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      edges.dispose();
      mat.dispose();
      geo2.dispose();
      edges2.dispose();
      mat2.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
    />
  );
}
