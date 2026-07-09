import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { tosData } from '@/content/tos';
import { SectionCard } from '@/components/SectionCard';
import { SidebarTOC } from '@/components/SidebarTOC';

export default function TermsOfService() {
  const { lang } = useLanguage();
  const data = tosData[lang];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto flex gap-8">
      <SidebarTOC sections={data.sections} title={data.title} />
      
      <main className="flex-1 max-w-4xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Legal Document
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
            {data.title}
          </h1>
          
          <div className="flex items-center gap-3 text-muted-foreground mb-8">
            <Calendar className="w-5 h-5" />
            <span>{lang === 'vi' ? 'Cập nhật lần cuối:' : 'Last Updated:'} {data.lastUpdated}</span>
          </div>
          
          <div className="p-6 rounded-2xl bg-secondary/10 border border-secondary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-[50px] rounded-full pointer-events-none" />
            <p className="text-secondary-foreground font-medium leading-relaxed relative z-10">
              {data.summary}
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {data.sections.map((section, index) => (
            <SectionCard 
              key={section.id} 
              index={index}
              {...section} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}
