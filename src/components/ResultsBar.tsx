import { Link2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface ResultsBarProps {
  filteredCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function ResultsBar({
  filteredCount,
  totalCount,
  hasActiveFilters,
  onClearFilters,
}: ResultsBarProps) {
  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Share link copied');
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-2 rounded-lg bg-muted/50 px-4 py-2.5">
      <div className="space-y-0.5">
        <p className="text-sm text-muted-foreground">
          Showing{' '}
          <span className="font-semibold text-foreground">{filteredCount}</span>
          {' '}of{' '}
          <span className="font-semibold text-foreground">{totalCount}</span>
          {' '}methods
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyShareLink}
          className="-ml-3 h-auto px-3 py-1 text-muted-foreground hover:text-foreground"
        >
          <Link2 className="mr-1 h-4 w-4" />
          Copy share link
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearFilters}
        className={`text-muted-foreground hover:text-foreground ${
          !hasActiveFilters ? 'invisible' : ''
        }`}
      >
        <X className="mr-1 h-4 w-4" />
        Clear all filters
      </Button>
    </div>
  );
}
