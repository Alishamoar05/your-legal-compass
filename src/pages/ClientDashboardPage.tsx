import { motion } from "framer-motion";
import { MessageSquare, Search, FileText } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";

const ClientDashboardPage = () => {
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
          Welcome back 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          What would you like to do today?
        </p>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <AnimatedCard
          title="Ask LawGenie AI"
          description="Get instant answers to your legal questions powered by AI. Understand your rights, explore legal options, and get guided next steps."
          icon={MessageSquare}
          href="/client-dashboard/chat"
          delay={0.1}
        />
        <AnimatedCard
          title="Document Summary"
          description="Upload legal documents and contracts to instantly extract key points, summaries, and risk clauses."
          icon={FileText}
          href="/client-dashboard/documents"
          delay={0.2}
        />
        <AnimatedCard
          title="Find a Lawyer"
          description="Search and connect with verified lawyers near you. Filter by specialization, rating, and experience to find the perfect match."
          icon={Search}
          href="/client-dashboard/lawyers"
          delay={0.3}
        />
      </div>
    </div>
  );
};

export default ClientDashboardPage;
