import { Link, useLocation } from 'wouter';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Bot, FileText, Shield, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [location] = useLocation();
  const { lang, toggleLang } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary z-50 origin-left"
        style={{ scaleX }}
      />
      
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-card border border-white/10 group-hover:border-primary/50 transition-colors">
              <Bot className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            </div>
            <span className="font-display font-bold text-xl tracking-wide bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent group-hover:to-primary/70 transition-all">
              HDGBot
            </span>
          </Link>

          <div className="flex items-center gap-1 md:gap-4">
            <div className="hidden md:flex bg-card/50 p-1 rounded-lg border border-white/5">
              <Link href="/">
                <span className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 cursor-pointer",
                  location === '/' ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}>
                  <FileText className="w-4 h-4" />
                  {lang === 'vi' ? 'Điều Khoản' : 'Terms'}
                </span>
              </Link>
              <Link href="/privacy">
                <span className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 cursor-pointer",
                  location === '/privacy' ? "bg-secondary/20 text-secondary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}>
                  <Shield className="w-4 h-4" />
                  {lang === 'vi' ? 'Bảo Mật' : 'Privacy'}
                </span>
              </Link>
            </div>

            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/50 border border-white/5 hover:border-white/20 transition-all text-sm font-medium"
            >
              <Globe className="w-4 h-4 text-primary" />
              <span className="w-6 text-center">{lang.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-xl border-t border-white/5 pb-safe">
        <div className="flex justify-around p-2">
          <Link href="/">
            <span className={cn(
              "flex flex-col items-center justify-center p-2 flex-1 rounded-xl transition-all cursor-pointer",
              location === '/' ? "text-primary bg-primary/10" : "text-muted-foreground"
            )}>
              <FileText className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{lang === 'vi' ? 'Điều Khoản' : 'Terms'}</span>
            </span>
          </Link>
          <Link href="/privacy">
            <span className={cn(
              "flex flex-col items-center justify-center p-2 flex-1 rounded-xl transition-all cursor-pointer",
              location === '/privacy' ? "text-secondary bg-secondary/10" : "text-muted-foreground"
            )}>
              <Shield className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{lang === 'vi' ? 'Bảo Mật' : 'Privacy'}</span>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
