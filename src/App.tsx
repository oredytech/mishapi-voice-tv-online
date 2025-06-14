
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { AudioProvider } from "@/contexts/AudioContext";
import { HelmetProvider } from "react-helmet-async";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingPlayer from "@/components/FloatingPlayer";
import Index from "@/pages/Index";
import ArticlePage from "@/pages/ArticlePage";
import ArticlesPage from "@/pages/ArticlesPage";
import TvLive from "@/pages/TvLive";
import RadioLive from "@/pages/RadioLive";
import Mishapi24 from "@/pages/Mishapi24";
import NotFound from "@/pages/NotFound";
import CategoryPage from "@/pages/CategoryPage";
import VideosPage from "@/pages/VideosPage";
import ContactPage from "@/pages/ContactPage";

// Create a stable QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const [isGlobalPlayerVisible, setIsGlobalPlayerVisible] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index setIsGlobalPlayerVisible={setIsGlobalPlayerVisible} />} />
          <Route path="/tv" element={<TvLive />} />
          <Route path="/radio" element={<RadioLive />} />
          <Route path="/mishapi24" element={<Mishapi24 />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/actualites" element={<ArticlesPage />} />
          <Route path="/actualites/categorie/:categorySlug" element={<CategoryPage />} />
          {/* Article routes - specific article slug pattern to avoid conflicts */}
          <Route path="/article/:slug" element={<ArticlePage />} />
          {/* Fallback route for direct slug access (for legacy URLs and direct sharing) */}
          <Route path="/:slug" element={<ArticlePage />} />
          {/* 404 catch-all - MUST be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      
      {/* Global Floating Player - always visible when audio is playing */}
      <FloatingPlayer 
        isVisible={true} 
        onClose={() => setIsGlobalPlayerVisible(false)} 
        audioUrl="" 
        title="" 
      />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AudioProvider>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </AudioProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
