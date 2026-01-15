import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { methods, UXMethod } from '@/data/methods';

export interface Filters {
  searchQuery: string;
  question: string;
  designPhase: string[];
  analysisFocus: string[];
  dataCollection: string;
  cost: string;
  time: string;
}

export type SortKey = keyof UXMethod | null;
export type SortOrder = 'asc' | 'desc';

const defaultFilters: Filters = {
  searchQuery: '',
  question: '',
  designPhase: [],
  analysisFocus: [],
  dataCollection: '',
  cost: '',
  time: ''
};

function parseFiltersFromParams(searchParams: URLSearchParams): Filters {
  return {
    searchQuery: searchParams.get('q') || '',
    question: searchParams.get('question') || '',
    designPhase: searchParams.get('designPhase')?.split(',').filter(Boolean) || [],
    analysisFocus: searchParams.get('analysisFocus')?.split(',').filter(Boolean) || [],
    dataCollection: searchParams.get('dataCollection') || '',
    cost: searchParams.get('cost') || '',
    time: searchParams.get('time') || ''
  };
}

function filtersToParams(filters: Filters): URLSearchParams {
  const params = new URLSearchParams();
  
  if (filters.searchQuery) params.set('q', filters.searchQuery);
  if (filters.question) params.set('question', filters.question);
  if (filters.designPhase.length > 0) params.set('designPhase', filters.designPhase.join(','));
  if (filters.analysisFocus.length > 0) params.set('analysisFocus', filters.analysisFocus.join(','));
  if (filters.dataCollection) params.set('dataCollection', filters.dataCollection);
  if (filters.cost) params.set('cost', filters.cost);
  if (filters.time) params.set('time', filters.time);
  
  return params;
}

export function useMethodFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState<Filters>(() => 
    parseFiltersFromParams(searchParams)
  );

  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Sync filters to URL
  useEffect(() => {
    const newParams = filtersToParams(filters);
    const currentParams = filtersToParams(parseFiltersFromParams(searchParams));
    
    if (newParams.toString() !== currentParams.toString()) {
      setSearchParams(newParams, { replace: true });
    }
  }, [filters, searchParams, setSearchParams]);

  const updateFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleCheckboxFilter = useCallback((key: 'designPhase' | 'analysisFocus', value: string) => {
    setFilters(prev => {
      const current = prev[key];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery !== '' ||
      filters.question !== '' ||
      filters.designPhase.length > 0 ||
      filters.analysisFocus.length > 0 ||
      filters.dataCollection !== '' ||
      filters.cost !== '' ||
      filters.time !== ''
    );
  }, [filters]);

  const handleSort = useCallback((key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  }, [sortKey]);

  // Helper function to filter methods with specific filters applied
  const filterMethods = useCallback((filtersToApply: Partial<Filters>) => {
    let result = [...methods];
    const f = { ...defaultFilters, ...filtersToApply };

    if (f.searchQuery) {
      const query = f.searchQuery.toLowerCase();
      result = result.filter(m => 
        m.method.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.questions.some(q => q.toLowerCase().includes(query))
      );
    }

    if (f.question) {
      result = result.filter(m => m.questions.includes(f.question));
    }

    if (f.designPhase.length > 0) {
      result = result.filter(m => {
        const phases = m.designPhase.split(',').map(p => p.trim());
        return f.designPhase.some(fp => phases.includes(fp));
      });
    }

    if (f.analysisFocus.length > 0) {
      result = result.filter(m => {
        const focuses = m.analysisFocus.split(',').map(fo => fo.trim());
        return f.analysisFocus.some(fa => focuses.includes(fa));
      });
    }

    if (f.dataCollection) {
      result = result.filter(m => m.dataCollection.trim() === f.dataCollection);
    }

    if (f.cost) {
      result = result.filter(m => m.cost === f.cost);
    }

    if (f.time) {
      result = result.filter(m => m.time === f.time);
    }

    return result;
  }, []);

  const filteredAndSortedMethods = useMemo(() => {
    let result = filterMethods(filters);

    // Apply sorting
    if (sortKey && sortKey !== 'questions') {
      result.sort((a, b) => {
        const aVal = String(a[sortKey] || '').toUpperCase();
        const bVal = String(b[sortKey] || '').toUpperCase();
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [filters, sortKey, sortOrder, filterMethods]);

  // Calculate available options for each filter category
  const availableOptions = useMemo(() => {
    // For each category, apply all OTHER filters and see what values exist
    const getFiltersExcluding = (excludeKey: keyof Filters): Partial<Filters> => {
      const result: Partial<Filters> = { ...filters };
      if (excludeKey === 'question') result.question = '';
      else if (excludeKey === 'designPhase') result.designPhase = [];
      else if (excludeKey === 'analysisFocus') result.analysisFocus = [];
      else if (excludeKey === 'dataCollection') result.dataCollection = '';
      else if (excludeKey === 'cost') result.cost = '';
      else if (excludeKey === 'time') result.time = '';
      return result;
    };

    // Get methods when excluding each filter
    const methodsForQuestions = filterMethods(getFiltersExcluding('question'));
    const methodsForDesignPhase = filterMethods(getFiltersExcluding('designPhase'));
    const methodsForAnalysisFocus = filterMethods(getFiltersExcluding('analysisFocus'));
    const methodsForDataCollection = filterMethods(getFiltersExcluding('dataCollection'));
    const methodsForCost = filterMethods(getFiltersExcluding('cost'));
    const methodsForTime = filterMethods(getFiltersExcluding('time'));

    // Extract available values from each filtered set
    const questions = new Set<string>();
    methodsForQuestions.forEach(m => m.questions.forEach(q => questions.add(q)));

    const designPhase = new Set<string>();
    methodsForDesignPhase.forEach(m => {
      m.designPhase.split(',').map(p => p.trim()).forEach(p => designPhase.add(p));
    });

    const analysisFocus = new Set<string>();
    methodsForAnalysisFocus.forEach(m => {
      m.analysisFocus.split(',').map(f => f.trim()).forEach(f => analysisFocus.add(f));
    });

    const dataCollection = new Set<string>();
    methodsForDataCollection.forEach(m => dataCollection.add(m.dataCollection.trim()));

    const cost = new Set<string>();
    methodsForCost.forEach(m => cost.add(m.cost));

    const time = new Set<string>();
    methodsForTime.forEach(m => time.add(m.time));

    return {
      questions: [...questions],
      designPhase: [...designPhase],
      analysisFocus: [...analysisFocus],
      dataCollection: [...dataCollection],
      cost: [...cost],
      time: [...time]
    };
  }, [filters, filterMethods]);

  return {
    filters,
    updateFilter,
    toggleCheckboxFilter,
    clearAllFilters,
    hasActiveFilters,
    sortKey,
    sortOrder,
    handleSort,
    filteredMethods: filteredAndSortedMethods,
    totalMethods: methods.length,
    availableOptions
  };
}
