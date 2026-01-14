import { useState, useMemo } from 'react';
import { methods, UXMethod } from '@/data/methods';

export interface Filters {
  question: string;
  designPhase: string[];
  analysisFocus: string[];
  dataCollection: string;
  cost: string;
  time: string;
}

export type SortKey = keyof UXMethod | null;
export type SortOrder = 'asc' | 'desc';

export function useMethodFilters() {
  const [filters, setFilters] = useState<Filters>({
    question: '',
    designPhase: [],
    analysisFocus: [],
    dataCollection: '',
    cost: '',
    time: ''
  });

  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleCheckboxFilter = (key: 'designPhase' | 'analysisFocus', value: string) => {
    setFilters(prev => {
      const current = prev[key];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedMethods = useMemo(() => {
    let result = [...methods];

    // Apply filters
    if (filters.question) {
      result = result.filter(m => m.question === filters.question);
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
    if (sortKey) {
      result.sort((a, b) => {
        const aVal = (a[sortKey] || '').toUpperCase();
        const bVal = (b[sortKey] || '').toUpperCase();
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
    sortKey,
    sortOrder,
    handleSort,
    filteredMethods: filteredAndSortedMethods
  };
}
