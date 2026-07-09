import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/50 backdrop-blur-sm mt-20 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-display font-bold text-lg text-white">HDGBot</span>
          <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} HDGBot. All rights reserved.</span>
        </div>
        
        <a 
          href="https://github.com/huygaming0103-collab/Idl" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-white/5 hover:border-white/20 transition-all text-sm text-muted-foreground hover:text-white group"
        >
          <Github className="w-4 h-4 group-hover:text-primary transition-colors" />
          <span>View on GitHub</span>
        </a>
      </div>
    </footer>
  );
}
