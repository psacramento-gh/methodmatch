import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  getUniqueQuestions,
  getUniqueDesignPhases,
  getUniqueAnalysisFocus,
  getUniqueDataCollection,
  getUniqueCost,
  getUniqueTime,
} from '@/data/methods';
import { Filters } from '@/hooks/useMethodFilters';

const FILTER_TOOLTIPS: Record<string, string> = {
  // Design Phase
  'Plan': 'Methods best suited for the early discovery phase, before design work begins.',
  'Design': 'Methods commonly used during active design and prototyping iterations.',
  'Release': 'Methods typically applied after launch to evaluate live products.',
  
  // Analysis Focus
  'Qualitative': 'Focuses on understanding the "why" through observations, behaviors, and open-ended feedback.',
  'Quantitative': 'Focuses on the "how many" or "how much" through numerical data and statistical analysis.',
  
  // Data Collection
  'Analytic': 'Methods based on expert review, heuristics, or modeling rather than direct user testing.',
  'Empirical': 'Methods based on direct observation or data collection from actual users.',
  
  // Cost (category-specific keys)
  'Cost-Low': 'Can be conducted with minimal budget, often using internal resources or free tools.',
  'Cost-Medium': 'Requires some budget for participant incentives, specialized tools, or moderate researcher time.',
  'Cost-High': 'Significant investment needed for large sample sizes, professional labs, or extensive consulting.',
  
  // Time (category-specific keys)
  'Time-Low': 'Can be completed in a few days to a week, ideal for fast-paced agile cycles.',
  'Time-Medium': 'Typically takes 2-4 weeks from planning to reporting.',
  'Time-High': 'Long-term studies or complex benchmarks that may take over a month to complete.',
};

interface MethodFiltersProps {
  filters: Filters;
  onFilterChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onCheckboxToggle: (key: 'designPhase' | 'analysisFocus', value: string) => void;
}

export function MethodFilters({ filters, onFilterChange, onCheckboxToggle }: MethodFiltersProps) {
  const questions = getUniqueQuestions();
  const designPhases = getUniqueDesignPhases();
  const analysisFocuses = getUniqueAnalysisFocus();
  const dataCollections = getUniqueDataCollection();
  const costs = getUniqueCost();
  const times = getUniqueTime();

  return (
    <TooltipProvider>
      <div className="bg-card rounded-lg p-5 shadow-sm border mb-5 sticky top-5 z-10">
        {/* All filters in a single unified grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Question Dropdown */}
          <div className="space-y-2 p-3 rounded-lg border border-border/40 hover:border-border hover:bg-muted/20 transition-colors">
            <Label className="font-semibold text-foreground">Question</Label>
            <Select
              value={filters.question}
              onValueChange={(value) => onFilterChange('question', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {questions.map((q) => (
                  <SelectItem key={q} value={q}>
                    {q}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Design Phase Checkboxes */}
          <div className="space-y-2 p-3 rounded-lg border border-border/40 hover:border-border hover:bg-muted/20 transition-colors">
            <Label className="font-semibold text-foreground">Design Phase</Label>
            <div className="flex flex-wrap gap-3">
              {designPhases.map((phase) => (
                <Tooltip key={phase}>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor={`phase-${phase}`}
                      className="flex items-center gap-2 cursor-pointer px-2 py-1 -mx-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <Checkbox
                        id={`phase-${phase}`}
                        checked={filters.designPhase.includes(phase)}
                        onCheckedChange={() => onCheckboxToggle('designPhase', phase)}
                      />
                      <span className="text-sm font-normal">{phase}</span>
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{FILTER_TOOLTIPS[phase]}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Analysis Focus Checkboxes */}
          <div className="space-y-2 p-3 rounded-lg border border-border/40 hover:border-border hover:bg-muted/20 transition-colors">
            <Label className="font-semibold text-foreground">Analysis Focus</Label>
            <div className="flex flex-wrap gap-3">
              {analysisFocuses.map((focus) => (
                <Tooltip key={focus}>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor={`focus-${focus}`}
                      className="flex items-center gap-2 cursor-pointer px-2 py-1 -mx-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <Checkbox
                        id={`focus-${focus}`}
                        checked={filters.analysisFocus.includes(focus)}
                        onCheckedChange={() => onCheckboxToggle('analysisFocus', focus)}
                      />
                      <span className="text-sm font-normal">{focus}</span>
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{FILTER_TOOLTIPS[focus]}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Data Collection Radio */}
          <div className="space-y-2 p-3 rounded-lg border border-border/40 hover:border-border hover:bg-muted/20 transition-colors">
            <Label className="font-semibold text-foreground">Data Collection</Label>
            <RadioGroup
              value={filters.dataCollection || 'all'}
              onValueChange={(value) => onFilterChange('dataCollection', value === 'all' ? '' : value)}
              className="flex flex-wrap gap-3"
            >
              <Label htmlFor="dc-all" className="flex items-center gap-2 cursor-pointer px-2 py-1 -mx-2 rounded-md hover:bg-muted transition-colors">
                <RadioGroupItem value="all" id="dc-all" />
                <span className="text-sm font-normal">All</span>
              </Label>
              {dataCollections.map((dc) => (
                <Tooltip key={dc}>
                  <TooltipTrigger asChild>
                    <Label htmlFor={`dc-${dc}`} className="flex items-center gap-2 cursor-pointer px-2 py-1 -mx-2 rounded-md hover:bg-muted transition-colors">
                      <RadioGroupItem value={dc} id={`dc-${dc}`} />
                      <span className="text-sm font-normal">{dc}</span>
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{FILTER_TOOLTIPS[dc]}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </RadioGroup>
          </div>

          {/* Cost Radio */}
          <div className="space-y-2 p-3 rounded-lg border border-border/40 hover:border-border hover:bg-muted/20 transition-colors">
            <Label className="font-semibold text-foreground">Cost</Label>
            <RadioGroup
              value={filters.cost || 'all'}
              onValueChange={(value) => onFilterChange('cost', value === 'all' ? '' : value)}
              className="flex flex-wrap gap-3"
            >
              <Label htmlFor="cost-all" className="flex items-center gap-2 cursor-pointer px-2 py-1 -mx-2 rounded-md hover:bg-muted transition-colors">
                <RadioGroupItem value="all" id="cost-all" />
                <span className="text-sm font-normal">All</span>
              </Label>
              {costs.map((cost) => (
                <Tooltip key={cost}>
                  <TooltipTrigger asChild>
                    <Label htmlFor={`cost-${cost}`} className="flex items-center gap-2 cursor-pointer px-2 py-1 -mx-2 rounded-md hover:bg-muted transition-colors">
                      <RadioGroupItem value={cost} id={`cost-${cost}`} />
                      <span className="text-sm font-normal">{cost}</span>
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{FILTER_TOOLTIPS[`Cost-${cost}`]}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </RadioGroup>
          </div>

          {/* Time Radio */}
          <div className="space-y-2 p-3 rounded-lg border border-border/40 hover:border-border hover:bg-muted/20 transition-colors">
            <Label className="font-semibold text-foreground">Time</Label>
            <RadioGroup
              value={filters.time || 'all'}
              onValueChange={(value) => onFilterChange('time', value === 'all' ? '' : value)}
              className="flex flex-wrap gap-3"
            >
              <Label htmlFor="time-all" className="flex items-center gap-2 cursor-pointer px-2 py-1 -mx-2 rounded-md hover:bg-muted transition-colors">
                <RadioGroupItem value="all" id="time-all" />
                <span className="text-sm font-normal">All</span>
              </Label>
              {times.map((time) => (
                <Tooltip key={time}>
                  <TooltipTrigger asChild>
                    <Label htmlFor={`time-${time}`} className="flex items-center gap-2 cursor-pointer px-2 py-1 -mx-2 rounded-md hover:bg-muted transition-colors">
                      <RadioGroupItem value={time} id={`time-${time}`} />
                      <span className="text-sm font-normal">{time}</span>
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{FILTER_TOOLTIPS[`Time-${time}`]}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
