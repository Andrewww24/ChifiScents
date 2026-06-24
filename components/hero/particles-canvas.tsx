"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  da: number;
  aDir: number;
}

function rnd(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function makePoint(w: number, h: number): Point {
  return {
    x: rnd(0, w),
    y: rnd(0, h),
    r: rnd(0.5, 7.8),
    vx: rnd(-0.18, 0.18),
    vy: rnd(-0.45, -0.08),
    a: rnd(0.06, 0.45),
    da: rnd(0.001, 0.004),
    aDir: 1,
  };
}

export function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let frameId = 0;

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }

    resize();
    points = Array.from({ length: 90 }, () => makePoint(width, height));
    window.addEventListener("resize", resize);

    function tick() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = "#00e676";
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.a += p.da * p.aDir;
        if (p.a > 0.45 || p.a < 0.04) p.aDir *= -1;
        if (p.y < -4) {
          p.y = height + 4;
          p.x = rnd(0, width);
        }
        ctx!.globalAlpha = p.a;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      });
      ctx!.globalAlpha = 1;
      frameId = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" />;
}
