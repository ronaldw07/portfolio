"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

const MAX_PARTICLES = 4200;
const DOT_SIZE = 1.8;
const SPRING = 0.055;
const DAMPING = 0.84;
const PUSH_RADIUS = 110;
const PUSH_STRENGTH = 5.5;
const DRIFT = 1.1;
const INK = "#2d2d2d";
const ACCENT = "#a8492c";

type Field = {
  count: number;
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  hx: Float32Array;
  hy: Float32Array;
  phase: Float32Array;
};

function sampleName(width: number, height: number, family: string): Field {
  const off = document.createElement("canvas");
  off.width = width;
  off.height = height;
  const ctx = off.getContext("2d")!;

  ctx.font = `400 100px ${family}`;
  const widthAt100 = ctx.measureText(site.name).width;
  const fontSize = Math.min(((width * 0.84) / widthAt100) * 100, height * 0.3);

  ctx.font = `400 ${fontSize}px ${family}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(site.name, width / 2, height / 2);
  const { data } = ctx.getImageData(0, 0, width, height);

  let gap = 3;
  let points: number[] = [];
  do {
    points = [];
    for (let py = 0; py < height; py += gap) {
      for (let px = 0; px < width; px += gap) {
        if (data[(py * width + px) * 4 + 3] > 128) points.push(px, py);
      }
    }
    gap += 1;
  } while (points.length / 2 > MAX_PARTICLES);

  const count = points.length / 2;
  const jitter = gap - 1; // loop exits one past the gap actually used
  const field: Field = {
    count,
    x: new Float32Array(count),
    y: new Float32Array(count),
    vx: new Float32Array(count),
    vy: new Float32Array(count),
    hx: new Float32Array(count),
    hy: new Float32Array(count),
    phase: new Float32Array(count),
  };
  for (let i = 0; i < count; i++) {
    field.hx[i] = points[i * 2] + (Math.random() - 0.5) * jitter;
    field.hy[i] = points[i * 2 + 1] + (Math.random() - 0.5) * jitter;
    field.x[i] = Math.random() * width;
    field.y[i] = Math.random() * height;
    field.phase[i] = Math.random() * Math.PI * 2;
  }
  return field;
}

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const family = getComputedStyle(document.documentElement)
      .getPropertyValue("--font-playfair-display")
      .trim();

    let field: Field | null = null;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const pointer = { x: 0, y: 0, active: false };

    function draw() {
      if (!field) return;
      ctx.clearRect(0, 0, width, height);
      for (const [color, displaced] of [
        [INK, false],
        [ACCENT, true],
      ] as const) {
        ctx.fillStyle = color;
        for (let i = 0; i < field.count; i++) {
          const far = Math.abs(field.x[i] - field.hx[i]) + Math.abs(field.y[i] - field.hy[i]) > 14;
          if (far === displaced) ctx.fillRect(field.x[i], field.y[i], DOT_SIZE, DOT_SIZE);
        }
      }
    }

    function step(time: number) {
      frame = 0;
      if (!field || !visible) return;
      const t = time / 1000;
      for (let i = 0; i < field.count; i++) {
        const tx = field.hx[i] + Math.sin(t + field.phase[i]) * DRIFT;
        const ty = field.hy[i] + Math.cos(t * 0.9 + field.phase[i]) * DRIFT;
        let ax = (tx - field.x[i]) * SPRING;
        let ay = (ty - field.y[i]) * SPRING;

        if (pointer.active) {
          const dx = field.x[i] - pointer.x;
          const dy = field.y[i] - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < PUSH_RADIUS && dist > 0.01) {
            const force = (1 - dist / PUSH_RADIUS) * PUSH_STRENGTH;
            ax += (dx / dist) * force;
            ay += (dy / dist) * force;
          }
        }

        field.vx[i] = (field.vx[i] + ax) * DAMPING;
        field.vy[i] = (field.vy[i] + ay) * DAMPING;
        field.x[i] += field.vx[i];
        field.y[i] += field.vy[i];
      }
      draw();
      frame = requestAnimationFrame(step);
    }

    function start() {
      if (!frame && !reduceMotion) frame = requestAnimationFrame(step);
    }

    async function setup() {
      width = section.clientWidth;
      height = section.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      await document.fonts.load(`400 100px ${family}`);
      field = sampleName(width, height, family);
      if (reduceMotion) {
        field.x.set(field.hx);
        field.y.set(field.hy);
        draw();
      }
      start();
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    }
    function onPointerLeave() {
      pointer.active = false;
    }

    let resizeTimer = 0;
    function onResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 150);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });

    setup();
    observer.observe(section);
    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden">
      <p className="sr-only">{site.name}</p>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <a
        href="#intro-end"
        className="scroll-cue absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint"
      >
        Scroll
      </a>
      <span id="intro-end" className="absolute bottom-0" />
    </section>
  );
}
