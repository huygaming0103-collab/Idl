import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import * as Icons from 'lucide-react';

interface Subsection {
  title: string;
  content: string;
}

interface SectionProps {
  id: string;
  title: string;
  icon: string;
  content: string;
  subsections: Subsection[];
  index: number;
}

export function SectionCard({ id, title, icon, content, subsections, index }: SectionProps) {
  // @ts-ignore
  const IconComponent = Icons[icon] || Icons.Circle;

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 md:p-8 rounded-2xl mb-8 group"
    >
      <div className="flex items-start gap-4 md:gap-6">
        <div className="hidden md:flex shrink-0 w-12 h-12 rounded-xl bg-card border border-white/10 items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all relative">
          <IconComponent className="w-6 h-6 text-primary" />
          <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-xl z-[-1]" />
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
            <span className="md:hidden text-primary">
              <IconComponent className="w-6 h-6" />
            </span>
            {title}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {content}
          </p>
          
          {subsections && subsections.length > 0 && (
            <div className="space-y-4">
              {subsections.map((sub, idx) => (
                <Accordion key={idx} title={sub.title} content={sub.content} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

function Accordion({ title, content }: { title: string, content: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/5 rounded-xl bg-background/30 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-medium text-foreground">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 pt-0 text-sm text-muted-foreground leading-relaxed">
              {content.split('\n').map((line, i) => (
                <span key={i} className="block mb-2 last:mb-0">{line}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
