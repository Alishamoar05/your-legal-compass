import { motion } from "framer-motion";
import { FileText, TrendingUp } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";

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
    </div>
  );
};

export default LawyerDashboardPage;
