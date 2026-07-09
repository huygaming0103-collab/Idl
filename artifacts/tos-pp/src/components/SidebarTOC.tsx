import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TOCProps {
  sections: Array<{ id: string; title: string }>;
  title: string;
}

export function SidebarTOC({ sections, title }: TOCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const SidebarContent = (
    <div className="p-6">
      <h3 className="font-display font-semibold text-white/80 mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
        <List className="w-4 h-4" />
        Mục Lục
      </h3>
      <nav className="space-y-1">
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={cn(
                "w-full text-left px-3 py-2 text-sm rounded-lg transition-all flex items-center gap-3",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <div className={cn(
                "w-1.5 h-1.5 rounded-full transition-all",
                isActive ? "bg-primary scale-100" : "bg-white/20 scale-0"
              )} />
              <span className="truncate">{s.title}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 glass-card rounded-2xl max-h-[calc(100vh-8rem)] overflow-y-auto">
          {SidebarContent}
        </div>
      </div>

      {/* Mobile Floating TOC Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open table of contents"
        className="lg:hidden fixed bottom-20 left-4 z-40 p-3 rounded-full bg-card border border-white/10 text-white shadow-lg shadow-black/50 backdrop-blur-md"
      >
        <List className="w-5 h-5" />
      </button>

      {/* Mobile TOC Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[80vw] bg-card border-r border-white/10 z-50 overflow-y-auto lg:hidden shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close table of contents"
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="mt-8">
                {SidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
