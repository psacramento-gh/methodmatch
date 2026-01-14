import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="mt-10 py-6 border-t border-border">
      <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
        <Link
          to="/about"
          className="hover:text-foreground transition-colors"
        >
          About
        </Link>
        <span className="text-border">•</span>
        <a
          href="https://github.com/paulosacramento/methodmatch"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
};
