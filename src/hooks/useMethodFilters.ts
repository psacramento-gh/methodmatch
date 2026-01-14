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

  const filteredAndSortedMethods = useMemo(() => {
    let result = [...methods];

    // Apply text search
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(m => 
        m.method.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.questions.some(q => q.toLowerCase().includes(query))
      );
    }

    // Apply filters
    if (filters.question) {
      result = result.filter(m => m.questions.includes(filters.question));
    }

    if (filters.designPhase.length > 0) {
      result = result.filter(m => {
        const phases = m.designPhase.split(',').map(p => p.trim());
        return filters.designPhase.some(f => phases.includes(f));
      });
    }

    if (filters.analysisFocus.length > 0) {
      result = result.filter(m => {
        const focuses = m.analysisFocus.split(',').map(f => f.trim());
        return filters.analysisFocus.some(f => focuses.includes(f));
      });
    }

    if (filters.dataCollection) {
      result = result.filter(m => m.dataCollection.trim() === filters.dataCollection);
    }

    if (filters.cost) {
      result = result.filter(m => m.cost === filters.cost);
    }

    if (filters.time) {
      result = result.filter(m => m.time === filters.time);
    }

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
  }, [filters, sortKey, sortOrder]);

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
    totalMethods: methods.length
  };
}
