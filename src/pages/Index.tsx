import { useMethodFilters } from '@/hooks/useMethodFilters';
import { MethodFilters } from '@/components/MethodFilters';
import { MethodTable } from '@/components/MethodTable';
import { ResultsBar } from '@/components/ResultsBar';

const Index = () => {
  const {
    filters,
    updateFilter,
    toggleCheckboxFilter,
    clearAllFilters,
    hasActiveFilters,
    sortKey,
    sortOrder,
    handleSort,
    filteredMethods,
    totalMethods
  } = useMethodFilters();

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-5">
          MethodMatch: Find the right UX method
        </h1>

        <MethodFilters
          filters={filters}
          onFilterChange={updateFilter}
          onCheckboxToggle={toggleCheckboxFilter}
        />

        <ResultsBar
          filteredCount={filteredMethods.length}
          totalCount={totalMethods}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearAllFilters}
        />

        <MethodTable
          methods={filteredMethods}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </div>
    </div>
  );
};

export default Index;
