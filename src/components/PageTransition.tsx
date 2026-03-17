import { motion } from "framer-motion";
import { HTMLAttributes, ReactNode } from "react";

interface PageTransitionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const PageTransition = ({ children, ...props }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
      className="h-full w-full"
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
