import { useEffect, useRef } from "react";

/**
 * Visualizes opportunities flowing down the leak funnel. Most particles peel off
 * at one of the three leak bands (t matches the .leak-point top% so the drift
 * lines up with the MISSED CALL / COLD ESTIMATE / NO FOLLOW-UP labels); survivors
 * that reach the bottom pool and fade near the LOST REVENUE label instead of
 * being "caught" by anything — that absence of a catch is the point of the page.
 */

const LEAK_BANDS: { t: number; side: -1 | 1 }[] = [
  { t: 0.2, side: -1 },
  { t: 0.43, side: 1 },
  { t: 0.61, side: -1 },
];

type Particle = {
  lat: number; // -1..1 across the funnel's width at the current depth
  t: number; // 0..1 depth, 0 = top edge, 1 = bottom edge
  speed: number; // depth progress per second
  leak: { t: number; side: -1 | 1 } | null;
  state: "flow" | "leaking" | "pooling";
  progress: number; // 0..1 within the current state
  size: number;
  seed: number;
};

function widthAt(t: number) {
  // Mirrors the .funnel-shape clip-path polygon (5% 95% top -> 30% 70% at .81 -> 37% 63% at 1)
  if (t <= 0.81) {
    const k = t / 0.81;
    return { left: 0.05 + (0.3 - 0.05) * k, right: 0.95 + (0.7 - 0.95) * k };
  }
  const k = (t - 0.81) / 0.19;
  return { left: 0.3 + (0.37 - 0.3) * k, right: 0.7 + (0.63 - 0.7) * k };
}

function spawn(): Particle {
  const leaksAt3Bands = Math.random() < 0.6;
  const leak = leaksAt3Bands ? LEAK_BANDS[Math.floor(Math.random() * LEAK_BANDS.length)] : null;
  return {
    lat: (Math.random() - 0.5) * 1.6,
    t: 0,
    speed: 1 / (3.2 + Math.random() * 2.2),
    leak,
    state: "flow",
    progress: 0,
    size: 1.6 + Math.random() * 1.6,
    seed: Math.random() * 1000,
  };
}

export default function FunnelParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let particles: Particle[] = Array.from({ length: 26 }, () => {
      const p = spawn();
      p.t = Math.random();
      return p;
    });
    let spawnAccumulator = 0;
    let raf = 0;
    let last = performance.now();

    const drawParticle = (p: Particle, alpha: number, color: string) => {
      const { left, right } = widthAt(Math.min(p.t, 1));
      const halfWidth = ((right - left) / 2) * width;
      const centerX = ((left + right) / 2) * width;
      const x = centerX + p.lat * halfWidth;
      const y = p.t * height;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 9;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);

      spawnAccumulator += dt;
      while (spawnAccumulator > 0.11 && particles.length < 48) {
        spawnAccumulator -= 0.11;
        particles.push(spawn());
      }

      particles = particles.filter((p) => {
        const wobble = Math.sin(now / 900 + p.seed) * 0.12 * dt * 4;

        if (p.state === "flow") {
          p.t += p.speed * dt;
          p.lat = Math.max(-0.92, Math.min(0.92, p.lat + wobble));
          if (p.leak && p.t >= p.leak.t) {
            p.state = "leaking";
            p.progress = 0;
          } else if (p.t >= 1) {
            p.state = "pooling";
            p.progress = 0;
            p.t = 1;
          }
          drawParticle(p, 0.85, "#5be3ff");
          return true;
        }

        if (p.state === "leaking") {
          p.progress += dt / 0.65;
          p.lat += p.leak!.side * dt * 2.6;
          const alpha = Math.max(0, 0.9 * (1 - p.progress));
          drawParticle(p, alpha, "#ff8657");
          return p.progress < 1;
        }

        // pooling
        p.progress += dt / 1.3;
        p.lat = p.lat * (1 - dt * 1.5);
        const alpha = Math.max(0, 0.8 * (1 - p.progress));
        drawParticle(p, alpha, "#ff9d71");
        return p.progress < 1;
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(step);
    };

    if (reduceMotion) {
      // Render one representative static frame instead of animating.
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        if (p.leak && p.t > p.leak.t) {
          drawParticle(p, 0.5, "#ff8657");
        } else {
          drawParticle(p, 0.6, "#5be3ff");
        }
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="funnel-particles-canvas" aria-hidden="true" />;
}
