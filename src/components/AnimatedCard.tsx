import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface AnimatedCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  delay?: number;
}

const AnimatedCard = ({ title, description, icon: Icon, href, delay = 0 }: AnimatedCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0, 0, 1] }}
    >
      <Link to={href}>
        <motion.div
          className="relative group rounded-2xl bg-card p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(79,122,106,0.6), rgba(189,152,101,0.6), rgba(79,122,106,0.6))",
              backgroundSize: "200% 200%",
            }}
            animate={hovered ? {
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              opacity: 1,
            } : { opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner card background */}
          <div className="absolute inset-[2px] rounded-2xl bg-card" />

          {/* Hover gradient overlay */}
          <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-br from-[#4f7a6a]/10 to-[#bd9865]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <motion.div
              className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300"
              whileHover={{ rotate: 5 }}
            >
              <Icon className="h-7 w-7 text-primary" />
            </motion.div>

            <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

            <motion.div
              className="mt-5 flex items-center gap-2 text-sm font-medium text-primary"
              initial={{ opacity: 0, x: -8 }}
              animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.3 }}
            >
              Open →
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default AnimatedCard;
