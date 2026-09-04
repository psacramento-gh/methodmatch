import { useMethodFilters } from '@/hooks/useMethodFilters';
import { MethodFilters } from '@/components/MethodFilters';
import { MethodTable } from '@/components/MethodTable';
import { ResultsBar } from '@/components/ResultsBar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/Footer';
const Index = () => {
  const {
    filters,
    updateFilter,
    toggleCheckboxFilter,
    clearAllFilters,
    hasActiveFilters,
    filteredMethods,
    totalMethods,
    availableOptions
  } = useMethodFilters();
  return <div className="min-h-screen bg-background p-5">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              MethodMatch
            </h1>
            <p className="text-muted-foreground text-sm">Find the right UX method for your project</p>
          </div>
          <ThemeToggle />
        </div>

        <MethodFilters filters={filters} availableOptions={availableOptions} onFilterChange={updateFilter} onCheckboxToggle={toggleCheckboxFilter} />

        <ResultsBar filteredCount={filteredMethods.length} totalCount={totalMethods} hasActiveFilters={hasActiveFilters} onClearFilters={clearAllFilters} />

        <MethodTable methods={filteredMethods} />

        <Footer />
      </div>
    </div>;
};
export default Index;