"use client";

import { useMemo, useState, useEffect, type CSSProperties } from "react";

type Ember = {
  left: number;
  delay: number;
  duration: number;
  drift: number;
  size: number;
  opacity: number;
  key: number;
};

type EmberStyle = CSSProperties & { "--drift"?: string };

function generateEmbers(count: number): Ember[] {
  const list: Ember[] = [];
  for (let i = 0; i < count; i++) {
    const zoneWidth = 100 / count;
    const left = zoneWidth * i + Math.random() * zoneWidth;
    list.push({
      left,
      delay: Math.random() * 8,
      duration: 4 + Math.random() * 5,
      drift: (Math.random() - 0.5) * 80,
      size: 2 + Math.random() * 2.5,
      opacity: 0.5 + Math.random() * 0.5,
      key: i,
    });
  }
  return list;
}

function generateLargeEmbers(count: number): Ember[] {
  const list: Ember[] = [];
  for (let i = 0; i < count; i++) {
    const zoneWidth = 100 / count;
    const left = zoneWidth * i + Math.random() * zoneWidth;
    list.push({
      left,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 6,
      drift: (Math.random() - 0.5) * 50,
      size: 4 + Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.3,
      key: i + 1000,
    });
  }
  return list;
}

export default function EmberField({ count = 28 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const embers = useMemo(() => generateEmbers(count), [count]);
  const largeEmbers = useMemo(() => generateLargeEmbers(Math.floor(count / 3)), [count]);

  // Render nothing on the server — avoids hydration mismatch entirely
  if (!mounted) return null;

  return (
    <div className="ember-field" aria-hidden="true">
      {/* Base fire glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "320px",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,77,28,0.13) 0%, rgba(255,166,43,0.07) 40%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      {/* Small fast embers */}
      {embers.map((e) => {
        const style: EmberStyle = {
          left: `${e.left}%`,
          width: e.size,
          height: e.size,
          opacity: e.opacity,
          animationDelay: `${e.delay}s`,
          animationDuration: `${e.duration}s`,
          "--drift": `${e.drift}px`,
        };
        return <span key={e.key} className="ember" style={style} />;
      })}

      {/* Large slow embers — depth layer */}
      {largeEmbers.map((e) => {
        const style: EmberStyle = {
          left: `${e.left}%`,
          width: e.size,
          height: e.size,
          opacity: e.opacity,
          animationDelay: `${e.delay}s`,
          animationDuration: `${e.duration}s`,
          "--drift": `${e.drift}px`,
          background: "rgba(255, 120, 40, 0.9)",
          boxShadow: "0 0 12px 4px rgba(255, 120, 40, 0.5)",
          borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%",
        };
        return <span key={e.key} className="ember" style={style} />;
      })}
    </div>
  );
}