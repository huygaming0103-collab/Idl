import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Navigation } from '@/components/Navigation';
import { ParticleBackground } from '@/components/ParticleBackground';
import { BackToTop } from '@/components/BackToTop';
import { Footer } from '@/components/Footer';
import TermsOfService from '@/pages/TermsOfService';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient();

function NotFound() {
  const { lang } = useLanguage();
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-display font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl text-white mb-6">
        {lang === 'vi' ? 'Không tìm thấy trang' : 'Page not found'}
      </h2>
      <a href="/" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
        {lang === 'vi' ? 'Về trang chủ' : 'Back to Home'}
      </a>
    </div>
  );
}

function AnimatedSwitch() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/">
          {(params) => (
            <motion.div
              key="tos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TermsOfService />
            </motion.div>
          )}
        </Route>
        <Route path="/privacy">
          {(params) => (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PrivacyPolicy />
            </motion.div>
          )}
        </Route>
        <Route>
          {(params) => (
            <motion.div
              key="404"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <NotFound />
            </motion.div>
          )}
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden dark">
            <ParticleBackground />
            <Navigation />
            <AnimatedSwitch />
            <Footer />
            <BackToTop />
          </div>
        </WouterRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
