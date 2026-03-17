import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Scale, AlertTriangle, CheckCircle, ArrowRight, Shield, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CasePredictorPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [caseType, setCaseType] = useState("");
  const [description, setDescription] = useState("");
  const [evidenceStrength, setEvidenceStrength] = useState("");
  const [crimeCategory, setCrimeCategory] = useState("");

  const mockPrediction = {
    outcome: "Favorable",
    confidence: 78,
    riskLevel: 22,
    factors: [
      { text: "Strong documentary evidence supports the claim", type: "positive" },
      { text: "Similar cases have 73% success rate in this jurisdiction", type: "positive" },
      { text: "Statute of limitations is approaching — act within 60 days", type: "warning" },
      { text: "Opposing party has prior settlements in similar cases", type: "positive" },
    ],
    precedents: [
      "Sharma vs. State of Maharashtra (2023) — Ruled in favor of complainant",
      "Gupta vs. ABC Enterprises (2022) — Settlement reached, 80% claim honored",
    ],
    timeline: "Estimated 6–9 months for resolution",
    strategy: [
      "File motion for expedited hearing due to statute of limitations",
      "Gather additional witness testimony to strengthen evidence",
      "Consider mediation before trial to reduce costs and time",
    ],
    metrics: [
      { label: "Win Probability", value: 78, color: "bg-primary" },
      { label: "Evidence Strength", value: 85, color: "bg-primary" },
      { label: "Risk Level", value: 22, color: "bg-accent" },
      { label: "Settlement Likelihood", value: 65, color: "bg-primary" },
    ],
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-3">
          Case Predictor
        </h1>
        <p className="text-muted-foreground text-lg">
          Get AI-powered predictions on case outcomes based on legal precedents.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            className="bg-card rounded-2xl p-8 card-shadow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Case Type</label>
                  <select
                    value={caseType}
                    onChange={(e) => setCaseType(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select case type</option>
                    <option value="civil">Civil Dispute</option>
                    <option value="criminal">Criminal Defense</option>
                    <option value="property">Property Dispute</option>
                    <option value="family">Family Law</option>
                    <option value="employment">Employment Law</option>
                    <option value="consumer">Consumer Protection</option>
                    <option value="contract">Contract Breach</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Crime Category</label>
                  <select
                    value={crimeCategory}
                    onChange={(e) => setCrimeCategory(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select category</option>
                    <option value="fraud">Fraud / White Collar</option>
                    <option value="theft">Theft / Robbery</option>
                    <option value="assault">Assault / Battery</option>
                    <option value="cyber">Cybercrime</option>
                    <option value="domestic">Domestic Violence</option>
                    <option value="property-crime">Property Crime</option>
                    <option value="none">Not Applicable (Civil)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Evidence Strength</label>
                <select
                  value={evidenceStrength}
                  onChange={(e) => setEvidenceStrength(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Rate your evidence</option>
                  <option value="strong">Strong — Documents, witnesses, and records available</option>
                  <option value="moderate">Moderate — Partial evidence available</option>
                  <option value="weak">Weak — Mostly circumstantial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Case Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the case details, parties involved, and key facts..."
                  rows={4}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Previous Case History</label>
                <textarea
                  placeholder="Any prior legal proceedings or related cases..."
                  rows={2}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Predict Outcome
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            className="space-y-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          >
            {/* Prediction Score */}
            <div className="bg-card rounded-2xl p-8 card-shadow text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <div className="relative z-10">
                <motion.div
                  className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <TrendingUp className="h-10 w-10 text-primary" />
                </motion.div>
                <motion.p
                  className="font-heading text-5xl font-semibold text-primary mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {mockPrediction.confidence}%
                </motion.p>
                <p className="text-sm text-muted-foreground">Predicted {mockPrediction.outcome} Outcome</p>
                <p className="text-xs text-muted-foreground mt-2">{mockPrediction.timeline}</p>
              </div>
            </div>

            {/* Progress Bar Metrics */}
            <div className="bg-card rounded-2xl p-6 card-shadow">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Prediction Metrics
              </h3>
              <div className="space-y-5">
                {mockPrediction.metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{metric.label}</span>
                      <span className="text-sm font-semibold text-primary">{metric.value}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${metric.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: [0.2, 0, 0, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Factors */}
            <div className="bg-card rounded-2xl p-6 card-shadow">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Key Factors</h3>
              <div className="space-y-3">
                {mockPrediction.factors.map((f, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 rounded-xl bg-muted/50 p-4"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {f.type === "positive" ? (
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm text-foreground">{f.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Strategy */}
            <div className="bg-card rounded-2xl p-6 card-shadow">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Suggested Legal Strategy
              </h3>
              <ol className="space-y-3">
                {mockPrediction.strategy.map((s, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-sm text-foreground"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {s}
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Precedents */}
            <div className="bg-card rounded-2xl p-6 card-shadow">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Relevant Precedents
              </h3>
              <ul className="space-y-2">
                {mockPrediction.precedents.map((p, i) => (
                  <motion.li
                    key={i}
                    className="text-sm text-muted-foreground pl-4 border-l-2 border-primary/30 py-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    {p}
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.button
              onClick={() => setSubmitted(false)}
              className="text-sm text-primary font-medium hover:underline"
              whileHover={{ x: 4 }}
            >
              ← Analyze another case
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CasePredictorPage;
