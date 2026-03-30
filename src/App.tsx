import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import IntakePage from "@/pages/IntakePage";
import PipelinePage from "@/pages/PipelinePage";
import PreProcessingPage from "@/pages/PreProcessingPage";
import SpecificationsPage from "@/pages/SpecificationsPage";
import FunctionalPage from "@/pages/FunctionalPage";
import ValidationPage from "@/pages/ValidationPage";
import HumanValidatedPage from "@/pages/HumanValidatedPage";
import ModernizationPage from "@/pages/ModernizationPage";
import TraceabilityPage from "@/pages/TraceabilityPage";
import ExecutivePage from "@/pages/ExecutivePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<IntakePage />} />
            <Route path="/pipeline" element={<PipelinePage />} />
            <Route path="/pre-processing" element={<PreProcessingPage />} />
            <Route path="/specifications" element={<SpecificationsPage />} />
            <Route path="/functional" element={<FunctionalPage />} />
            <Route path="/validation" element={<ValidationPage />} />
            <Route path="/human-validated" element={<HumanValidatedPage />} />
            <Route path="/modernization" element={<ModernizationPage />} />
            <Route path="/traceability" element={<TraceabilityPage />} />
            <Route path="/executive" element={<ExecutivePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
