import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
  delay?: number;
}

const DashboardCard = ({ title, description, icon: Icon, href, gradient, delay = 0 }: DashboardCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0, 0, 1] }}
    >
      <Link to={href}>
        <motion.div
          className="relative group rounded-2xl bg-card p-8 card-shadow overflow-hidden cursor-pointer"
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Hover gradient overlay */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${gradient}`}
          />

          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: "inset 0 0 0 1px hsl(157 22% 39% / 0.3), 0 8px 32px hsl(157 22% 39% / 0.15)",
            }}
          />

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
              className="mt-5 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            >
              Open →
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default DashboardCard;
