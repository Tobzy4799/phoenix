"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

type CountUpProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

export default function CountUp({
  to,
  suffix = "",
  duration = 1.8,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, motionVal, to]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(
        v >= 1000
          ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}K`
          : Math.round(v).toString()
      );
    });
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}