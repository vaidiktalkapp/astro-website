'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

interface CountUpProps {
  to: number;
  isDecimal?: boolean;
  suffix?: string;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ to, isDecimal = false, suffix = '', duration = 2 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const count = useMotionValue(0);

  const displayValue = useTransform(count, (latest) => {
    if (isDecimal) {
      return latest.toFixed(1) + suffix;
    }
    return Math.floor(latest).toLocaleString() + suffix;
  });

  useEffect(() => {
    if (isInView) {
      animate(count, to, {
        duration,
        ease: "easeOut"
      });
    }
  }, [isInView, to, duration, count]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

export default CountUp;
