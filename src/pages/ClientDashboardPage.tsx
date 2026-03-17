import { motion } from "framer-motion";
import { MessageSquare, Search, FileText, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import CursorGradient from "@/components/CursorGradient";
import DashboardCard from "@/components/DashboardCard";

const recentActivity = [
  { icon: MessageSquare, text: "Asked about tenant rights in Maharashtra", time: "2 hours ago" },
  { icon: Search, text: "Viewed profile of Adv. Priya Sharma", time: "Yesterday" },
  { icon: MessageSquare, text: "Query about consumer protection laws", time: "3 days ago" },
];

const ClientDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CursorGradient />
      <Navbar />

      <div className="pt-24 pb-16 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
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
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <DashboardCard
              title="Ask AI Legal Assistant"
              description="Get instant answers to your legal questions powered by AI. Understand your rights, explore legal options, and get guided next steps."
              icon={MessageSquare}
              href="/chat"
              gradient="bg-gradient-to-br from-primary/5 to-accent/5"
              delay={0.1}
            />
            <DashboardCard
              title="Find a Lawyer"
              description="Search and connect with verified lawyers near you. Filter by specialization, rating, and experience to find the perfect match."
              icon={Search}
              href="/lawyers"
              gradient="bg-gradient-to-br from-accent/5 to-primary/5"
              delay={0.2}
            />
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.2, 0, 0, 1] }}
          >
            <h2 className="font-heading text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <motion.div
                  key={i}
                  className="group bg-card rounded-xl p-4 card-shadow flex items-center gap-4 cursor-pointer"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 4, backgroundColor: "hsl(34 20% 95%)" }}
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardPage;
