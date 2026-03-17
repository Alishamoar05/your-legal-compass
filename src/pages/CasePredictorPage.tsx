import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Scale, AlertTriangle, CheckCircle, ArrowRight, Shield, BarChart3, Upload, FileText, X, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const CasePredictorPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [caseType, setCaseType] = useState("");
  const [description, setDescription] = useState("");
  const [evidenceStrength, setEvidenceStrength] = useState("");
  const [crimeCategory, setCrimeCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);

    try {
      let rawText = description;
      
      if (file) {
        const fileContent = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = (e) => reject(e);
          reader.readAsText(file);
        });
        rawText = fileContent + "\n\n" + description;
      }

      const response = await fetch("http://localhost:8000/api/v1/cases/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: file ? file.name : "Manual Case Entry",
          description: description,
          raw_text: rawText || "No text provided but requested prediction based on general case.",
          jurisdiction: "General",
          case_type: caseType || "civil",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to predict. Ensure backend is running at localhost:8000");
      }

      const data = await response.json();
      setPrediction(data.prediction);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Failed to connect to the ML Model backend. Make sure the python backend is running.");
    } finally {
      setIsPredicting(false);
    }
  };


  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-3">
          Case Predictor
        </h1>
        <p className="text-muted-foreground text-lg">
          Upload case files or provide details to get AI-powered ML predictions on case outcomes with deep data visualization.
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
            <form className="space-y-6" onSubmit={handlePredict}>
              <div
                className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-xl p-8 text-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {!file ? (
                  <>
                    <Upload className="h-10 w-10 text-primary/40 mx-auto mb-3" />
                    <h3 className="font-heading text-base font-semibold text-foreground mb-1">Upload Case File (Required for accurate prediction)</h3>
                    <p className="text-xs text-muted-foreground mb-4">TXT files supported up to 20MB</p>
                    <label className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors cursor-pointer active:scale-95">
                      <FileText className="h-4 w-4" />
                      Browse Files
                      <input type="file" className="hidden" accept=".txt" onChange={handleFileChange} />
                    </label>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <FileText className="h-10 w-10 text-primary mb-3" />
                    <div className="flex items-center gap-2">
                       <p className="text-sm font-medium text-foreground">{file.name}</p>
                       <button type="button" onClick={() => setFile(null)} className="text-muted-foreground hover:text-destructive">
                         <X className="h-4 w-4" />
                       </button>
                    </div>
                  </div>
                )}
              </div>

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
                <label className="block text-sm font-medium text-foreground mb-1.5">Case Context Notes</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the case details, parties involved, and key facts to feed the ML model..."
                  rows={4}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isPredicting || (!file && !description)}
                className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                whileHover={(!isPredicting && (file || description)) ? { scale: 1.01 } : {}}
                whileTap={(!isPredicting && (file || description)) ? { scale: 0.98 } : {}}
              >
                {isPredicting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Running Prediction Model...
                  </>
                ) : (
                  <>
                    Predict ML Outcome
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        ) : prediction && (
          <motion.div
            key="result"
            className="space-y-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          >
            {/* Top Stat row */}
            <div className="grid md:grid-cols-3 gap-6">
               {/* Win Probability Score */}
              <div className="md:col-span-1 bg-card rounded-2xl p-8 card-shadow text-center relative overflow-hidden flex flex-col justify-center items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                <div className="relative z-10 w-full">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </motion.div>
                  <motion.p
                    className="font-heading text-5xl font-semibold text-primary mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {prediction.win_probability}%
                  </motion.p>
                  <p className="font-medium text-foreground text-lg mb-1">{prediction.outcome_label}</p>
                  <p className="text-xs text-muted-foreground mt-2 border-t border-border pt-4">Model Confidence: {prediction.model_confidence}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Cohort Win Rate: {prediction.similar_cases_win_rate}%</p>
                </div>
              </div>

               {/* Radar Chart (Spider Graph) */}
              <div className="md:col-span-2 bg-card rounded-2xl p-6 card-shadow flex flex-col">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Multidimensional ML Assessment
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Visualizing core feature densities exacted from the document narrative.
                </p>
                <div className="flex-1 w-full min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={prediction.radar_data}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 13 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))' }} 
                        itemStyle={{ color: 'hsl(var(--primary))' }}
                      />
                      <Radar
                        name="Feature Density Mapping"
                        dataKey="A"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.25}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Keyword Importance distribution */}
              <div className="bg-card rounded-2xl p-6 card-shadow">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">ML Keyword Impact Matrix</h3>
                <div className="rounded-xl bg-accent/5 p-4 flex items-center justify-center border border-primary/10">
                  {prediction.matplotlib_chart ? (
                    <img 
                      src={`data:image/png;base64,${prediction.matplotlib_chart}`} 
                      alt="Matplotlib impact matrix" 
                      className="max-w-full h-auto"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">Chart generation failed</p>
                  )}
                </div>
              </div>

              {/* Insights Insights */}
              <div className="bg-card rounded-2xl p-6 card-shadow">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Detailed Extracted Insights
                </h3>
                <div className="space-y-4">
                  {prediction.detailed_insights.map((insight: string, i: number) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 rounded-xl bg-muted/50 p-4 border-l-2 border-primary"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <p className="text-sm text-foreground">{insight}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4 pb-8">
              <motion.button
                onClick={() => {
                  setSubmitted(false);
                  setPrediction(null);
                  setFile(null);
                }}
                className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:text-primary-dark hover:bg-primary/5 px-6 py-2 rounded-full transition-colors"
                whileHover={{ x: -2 }}
              >
                ← Return to Prediction Engine
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CasePredictorPage;
