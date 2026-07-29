import { FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelaxationSuggestion } from '@/lib/filterSuggestions';

interface EmptyMethodsStateProps {
  suggestions: RelaxationSuggestion[];
  hasActiveFilters: boolean;
  onApplySuggestion: (suggestion: RelaxationSuggestion) => void;
  onClearAll: () => void;
}

export function EmptyMethodsState({
  suggestions,
  hasActiveFilters,
  onApplySuggestion,
  onClearAll,
}: EmptyMethodsStateProps) {
  return (
    <div className="rounded-lg border border-dashed bg-muted/30 px-6 py-12 text-center">
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <FilterX className="h-5 w-5 text-muted-foreground" aria-hidden />
        </div>

        <div className="space-y-1">
          <h2 className="text-base font-semibold text-foreground">
            No methods match your filters
          </h2>
          <p className="text-sm text-muted-foreground">
            {suggestions.length > 0
              ? 'Try removing one of these constraints to see matching methods.'
              : hasActiveFilters
                ? 'These filters are too narrow together. Clear them to start over.'
                : 'No methods are available.'}
          </p>
        </div>

        {suggestions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion.id}
                variant="outline"
                size="sm"
                onClick={() => onApplySuggestion(suggestion)}
                className="h-auto max-w-full whitespace-normal py-1.5 text-left"
              >
                <span className="truncate">Remove {suggestion.label}</span>
                <span className="shrink-0 text-muted-foreground">
                  → {suggestion.resultCount}
                </span>
              </Button>
            ))}
          </div>
        )}

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear all filters
          </Button>
        )}
      </div>
    </div>
  );
}
