import { motion } from "framer-motion";
import { FileText, TrendingUp, Briefcase, Clock } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";

const caseStats = [
  { label: "Active Cases", value: "12", icon: Briefcase },
  { label: "Documents Analyzed", value: "47", icon: FileText },
  { label: "Predictions Made", value: "23", icon: TrendingUp },
];

const recentCases = [
  { title: "Property Dispute — Singh vs. Mehta", status: "In Progress", prediction: "72% favorable" },
  { title: "Contract Breach — ABC Corp", status: "Review", prediction: "85% favorable" },
  { title: "Employment Claim — Sharma", status: "New", prediction: "Pending analysis" },
];

const LawyerDashboardPage = () => {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
      >
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-2">
          Lawyer Dashboard ⚖️
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your cases, analyze documents, and predict outcomes.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {caseStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="group bg-card rounded-2xl p-6 card-shadow text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
            whileHover={{ y: -4, scale: 1.03, boxShadow: "var(--shadow-hover)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="relative z-10">
              <stat.icon className="h-6 w-6 text-primary mx-auto mb-3" />
              <p className="font-heading text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <AnimatedCard
          title="Document Analyzer"
          description="Upload contracts, agreements, and legal documents to get AI-powered summaries, risk detection, and key clause extraction."
          icon={FileText}
          href="/lawyer-dashboard/documents"
          delay={0.2}
        />
        <AnimatedCard
          title="Case Predictor"
          description="Analyze case details and get AI-powered predictions on likely outcomes based on historical data and legal precedents."
          icon={TrendingUp}
          href="/lawyer-dashboard/case-predictor"
          delay={0.3}
        />
      </div>

      {/* Recent Cases */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.2, 0, 0, 1] }}
      >
        <h2 className="font-heading text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Cases
        </h2>
        <div className="space-y-3">
          {recentCases.map((c, i) => (
            <motion.div
              key={i}
              className="group bg-card rounded-xl p-5 card-shadow flex items-center justify-between cursor-pointer"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              whileHover={{ x: 4, scale: 1.01, boxShadow: "var(--shadow-hover)" }}
            >
              <div>
                <p className="text-sm font-medium text-foreground">{c.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Status: {c.status}</p>
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                {c.prediction}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LawyerDashboardPage;
