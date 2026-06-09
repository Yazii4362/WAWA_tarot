import { useMemo } from "react";
import { motion } from "framer-motion";
import { LowPolyCloud, type LowPolyCloudVariant } from "./LowPolyCloud";

interface Cloud {
  id: number;
  topPct: number;
  size: number;
  delay: number;
  duration: number;
  startXVw: number;
  variant: LowPolyCloudVariant;
  opacity: number;
}

const VARIANTS: LowPolyCloudVariant[] = ["a", "b", "c", "d", "e"];

function makeClouds(count: number, seed = 7): Cloud[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    topPct: 4 + rand() * 78,
    size: 140 + rand() * 220,
    delay: rand() * -55,
    duration: 48 + rand() * 42,
    startXVw: -25 - rand() * 20,
    variant: VARIANTS[Math.floor(rand() * VARIANTS.length)],
    opacity: 0.78 + rand() * 0.22,
  }));
}

/**
 * Low-Poly Cloud Field
 * 2008 PSX/Tomb Raider 톤의 구름이 화면을 천천히 가로지름.
 */
export function CloudField({ count = 7 }: { count?: number }) {
  const clouds = useMemo(() => makeClouds(count), [count]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {clouds.map((c) => (
        <motion.div
          key={c.id}
          initial={{ x: `${c.startXVw}vw` }}
          animate={{ x: "120vw" }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${c.topPct}%`,
            left: 0,
            width: c.size,
            opacity: c.opacity,
            filter: "drop-shadow(0 6px 4px rgba(40, 90, 130, 0.18))",
            willChange: "transform",
          }}
        >
          <LowPolyCloud variant={c.variant} />
        </motion.div>
      ))}
    </div>
  );
}
