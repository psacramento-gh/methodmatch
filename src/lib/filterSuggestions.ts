import type { Filters } from '@/hooks/useMethodFilters';
import type { UXMethod } from '@/data/methods';

export interface RelaxationSuggestion {
  id: string;
  label: string;
  resultCount: number;
  filterKey: keyof Filters;
  /** For multi-select filters, the specific value to remove */
  valueToRemove?: string;
}

type FilterFn = (filters: Partial<Filters>) => UXMethod[];

/**
 * When the current filters yield no results, find which single constraint
 * removals would restore at least one method.
 */
export function getRelaxationSuggestions(
  filters: Filters,
  filterMethods: FilterFn
): RelaxationSuggestion[] {
  const suggestions: RelaxationSuggestion[] = [];

  const trySuggestion = (
    id: string,
    label: string,
    nextFilters: Filters,
    filterKey: keyof Filters,
    valueToRemove?: string
  ) => {
    const resultCount = filterMethods(nextFilters).length;
    if (resultCount > 0) {
      suggestions.push({ id, label, resultCount, filterKey, valueToRemove });
    }
  };

  if (filters.searchQuery) {
    trySuggestion(
      'searchQuery',
      `Search: "${filters.searchQuery}"`,
      { ...filters, searchQuery: '' },
      'searchQuery'
    );
  }

  if (filters.question) {
    trySuggestion(
      'question',
      `Question: ${filters.question}`,
      { ...filters, question: '' },
      'question'
    );
  }

  for (const phase of filters.designPhase) {
    trySuggestion(
      `designPhase-${phase}`,
      `Design Phase: ${phase}`,
      { ...filters, designPhase: filters.designPhase.filter((p) => p !== phase) },
      'designPhase',
      phase
    );
  }

  for (const focus of filters.analysisFocus) {
    trySuggestion(
      `analysisFocus-${focus}`,
      `Analysis Focus: ${focus}`,
      { ...filters, analysisFocus: filters.analysisFocus.filter((f) => f !== focus) },
      'analysisFocus',
      focus
    );
  }

  if (filters.dataCollection) {
    trySuggestion(
      'dataCollection',
      `Data Collection: ${filters.dataCollection}`,
      { ...filters, dataCollection: '' },
      'dataCollection'
    );
  }

  if (filters.cost) {
    trySuggestion(
      'cost',
      `Cost: ${filters.cost}`,
      { ...filters, cost: '' },
      'cost'
    );
  }

  if (filters.time) {
    trySuggestion(
      'time',
      `Time: ${filters.time}`,
      { ...filters, time: '' },
      'time'
    );
  }

  return suggestions.sort((a, b) => b.resultCount - a.resultCount);
}
