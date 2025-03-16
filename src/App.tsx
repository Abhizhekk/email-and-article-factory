
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EmailGenerator from "./pages/EmailGenerator";
import ArticleGenerator from "./pages/ArticleGenerator";
import CoverLetterGenerator from "./pages/CoverLetterGenerator";
import MeetingGenerator from "./pages/MeetingGenerator";
import SpeechGenerator from "./pages/SpeechGenerator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/email-generator" element={<EmailGenerator />} />
          <Route path="/article-generator" element={<ArticleGenerator />} />
          <Route path="/cover-letter-generator" element={<CoverLetterGenerator />} />
          <Route path="/meeting-generator" element={<MeetingGenerator />} />
          <Route path="/speech-generator" element={<SpeechGenerator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
