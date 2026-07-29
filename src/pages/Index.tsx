import { useMethodFilters } from '@/hooks/useMethodFilters';
import { MethodFilters } from '@/components/MethodFilters';
import { MethodTable } from '@/components/MethodTable';
import { ResultsBar } from '@/components/ResultsBar';
import { EmptyMethodsState } from '@/components/EmptyMethodsState';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/Footer';

const Index = () => {
  const {
    filters,
    updateFilter,
    toggleCheckboxFilter,
    clearAllFilters,
    applyRelaxation,
    hasActiveFilters,
    sortKey,
    sortOrder,
    handleSort,
    filteredMethods,
    totalMethods,
    availableOptions,
    relaxationSuggestions,
  } = useMethodFilters();

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">MethodMatch</h1>
            <p className="text-sm text-muted-foreground">
              Find the right UX method for your project
            </p>
          </div>
          <ThemeToggle />
        </div>

        <MethodFilters
          filters={filters}
          availableOptions={availableOptions}
          onFilterChange={updateFilter}
          onCheckboxToggle={toggleCheckboxFilter}
        />

        <ResultsBar
          filteredCount={filteredMethods.length}
          totalCount={totalMethods}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearAllFilters}
        />

        {filteredMethods.length === 0 ? (
          <EmptyMethodsState
            suggestions={relaxationSuggestions}
            hasActiveFilters={hasActiveFilters}
            onApplySuggestion={applyRelaxation}
            onClearAll={clearAllFilters}
          />
        ) : (
          <MethodTable
            methods={filteredMethods}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Index;
