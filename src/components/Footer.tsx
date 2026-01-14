import { Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-10 py-6 border-t border-border">
      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
        <a
          href="https://github.com/paulosacramento/methodmatch"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4" />
          <span>View on GitHub</span>
        </a>
      </div>
    </footer>
  );
};
