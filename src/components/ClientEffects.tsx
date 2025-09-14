'use client';
import { useEffect } from 'react';
export default function ClientEffects() {
  useEffect(() => {
    const cursorTrail = document.getElementById('cursorTrail');
    if (cursorTrail) {
      let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;
      let frameId: number;
      const onMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; cursorTrail.style.opacity = '0.6'; };
      const animate = () => { trailX += (mouseX - trailX) * 0.2; trailY += (mouseY - trailY) * 0.2; cursorTrail.style.transform = `translate(${trailX - 10}px, ${trailY - 10}px)`; frameId = requestAnimationFrame(animate); };
      document.addEventListener('mousemove', onMouseMove);
      animate();
      return () => { document.removeEventListener('mousemove', onMouseMove); cancelAnimationFrame(frameId); };
    }
  }, []);
  return (
    <>
      <div id="particle-background" />
      <div id="cursorTrail" />
    </>
  );
}