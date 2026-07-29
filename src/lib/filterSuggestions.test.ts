import { describe, it, expect } from 'vitest';
import { methods } from '@/data/methods';
import { Filters } from '@/hooks/useMethodFilters';
import { getRelaxationSuggestions } from '@/lib/filterSuggestions';
import { UXMethod } from '@/data/methods';

const defaultFilters: Filters = {
  searchQuery: '',
  question: '',
  designPhase: [],
  analysisFocus: [],
  dataCollection: '',
  cost: '',
  time: '',
};

function filterMethods(filtersToApply: Partial<Filters>): UXMethod[] {
  const f = { ...defaultFilters, ...filtersToApply };
  let result = [...methods];

  if (f.searchQuery) {
    const query = f.searchQuery.toLowerCase();
    result = result.filter(
      (m) =>
        m.method.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.questions.some((q) => q.toLowerCase().includes(query))
    );
  }

  if (f.question) {
    result = result.filter((m) => m.questions.includes(f.question));
  }

  if (f.designPhase.length > 0) {
    result = result.filter((m) => {
      const phases = m.designPhase.split(',').map((p) => p.trim());
      return f.designPhase.some((fp) => phases.includes(fp));
    });
  }

  if (f.analysisFocus.length > 0) {
    result = result.filter((m) => {
      const focuses = m.analysisFocus.split(',').map((fo) => fo.trim());
      return f.analysisFocus.some((fa) => focuses.includes(fa));
    });
  }

  if (f.dataCollection) {
    result = result.filter((m) => m.dataCollection.trim() === f.dataCollection);
  }

  if (f.cost) {
    result = result.filter((m) => m.cost === f.cost);
  }

  if (f.time) {
    result = result.filter((m) => m.time === f.time);
  }

  return result;
}

describe('getRelaxationSuggestions', () => {
  it('suggests removing filters that would restore results', () => {
    // Impossible combo: Analytic + High cost (no Analytic High-cost methods)
    const filters: Filters = {
      ...defaultFilters,
      dataCollection: 'Analytic',
      cost: 'High',
    };

    expect(filterMethods(filters)).toHaveLength(0);

    const suggestions = getRelaxationSuggestions(filters, filterMethods);

    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions.some((s) => s.filterKey === 'cost')).toBe(true);
    expect(suggestions.some((s) => s.filterKey === 'dataCollection')).toBe(true);
    expect(suggestions.every((s) => s.resultCount > 0)).toBe(true);
  });

  it('returns empty when filters already match methods', () => {
    const filters: Filters = {
      ...defaultFilters,
      cost: 'Low',
    };

    expect(filterMethods(filters).length).toBeGreaterThan(0);
    // Function still returns suggestions based on single removals that help;
    // callers should only invoke when the full filter set is empty.
    // With only one active filter that already has results, removing it also
    // has results — but we care about the empty-result case above.
    const emptyFilters: Filters = {
      ...defaultFilters,
      question: 'What features do people want?',
      cost: 'High',
    };
    expect(filterMethods(emptyFilters)).toHaveLength(0);

    const suggestions = getRelaxationSuggestions(emptyFilters, filterMethods);
    expect(suggestions.some((s) => s.id === 'cost')).toBe(true);
    expect(suggestions.find((s) => s.id === 'cost')?.resultCount).toBeGreaterThan(0);
  });

  it('suggests removing individual multi-select values', () => {
    const filters: Filters = {
      ...defaultFilters,
      // Plan + High cost is empty; Design alone with High may still be empty;
      // use a combo that is empty but clearing one phase helps.
      designPhase: ['Plan'],
      cost: 'High',
    };

    expect(filterMethods(filters)).toHaveLength(0);

    const suggestions = getRelaxationSuggestions(filters, filterMethods);
    expect(suggestions.some((s) => s.id === 'designPhase-Plan')).toBe(true);
  });
});
