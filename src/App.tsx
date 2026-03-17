import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import AIChatPage from "./pages/AIChatPage";
import LawyerFinderPage from "./pages/LawyerFinderPage";
import LawyerProfilePage from "./pages/LawyerProfilePage";
import DocumentAnalyzerPage from "./pages/DocumentAnalyzerPage";
import CasePredictorPage from "./pages/CasePredictorPage";
import ClientDashboardPage from "./pages/ClientDashboardPage";
import LawyerDashboardPage from "./pages/LawyerDashboardPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import ClientLayout from "./layouts/ClientLayout";
import LawyerLayout from "./layouts/LawyerLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />

          {/* Client Dashboard with sidebar layout */}
          <Route path="/client-dashboard" element={<ClientLayout />}>
            <Route index element={<ClientDashboardPage />} />
            <Route path="chat" element={<AIChatPage />} />
            <Route path="documents" element={<DocumentAnalyzerPage />} />
            <Route path="lawyers" element={<LawyerFinderPage />} />
            <Route path="lawyers/:id" element={<LawyerProfilePage />} />
            <Route path="book/:id" element={<BookingPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Lawyer Dashboard with sidebar layout */}
          <Route path="/lawyer-dashboard" element={<LawyerLayout />}>
            <Route index element={<LawyerDashboardPage />} />
            <Route path="documents" element={<DocumentAnalyzerPage />} />
            <Route path="case-predictor" element={<CasePredictorPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Standalone pages (accessible without login) */}
          <Route path="/chat" element={<AIChatPage />} />
          <Route path="/lawyers" element={<LawyerFinderPage />} />
          <Route path="/lawyers/:id" element={<LawyerProfilePage />} />
          <Route path="/documents" element={<DocumentAnalyzerPage />} />
          <Route path="/case-predictor" element={<CasePredictorPage />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
