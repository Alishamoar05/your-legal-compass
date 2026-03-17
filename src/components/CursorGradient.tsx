import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorGradient = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: "transparent",
      }}
    >
      <motion.div
        className="pointer-events-none absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, hsl(157 22% 39% / 0.4), hsl(43 64% 52% / 0.2), transparent 70%)",
        }}
      />
    </motion.div>
  );
};

export default CursorGradient;
