import { X } from 'lucide-react';
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
  onClearFilters 
}: ResultsBarProps) {
  return (
    <div className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-2.5 mb-4">
      <p className="text-sm text-muted-foreground">
        Showing{' '}
        <span className="font-semibold text-foreground">{filteredCount}</span>
        {' '}of{' '}
        <span className="font-semibold text-foreground">{totalCount}</span>
        {' '}methods
      </p>
      
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear all filters
        </Button>
      )}
    </div>
  );
}
