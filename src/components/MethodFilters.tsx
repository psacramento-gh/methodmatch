import { Info } from 'lucide-react';
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
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipProvider,
  HybridTooltipTrigger,
} from '@/components/ui/hybrid-tooltip';
import {
  getUniqueQuestions,
  getUniqueDesignPhases,
  getUniqueAnalysisFocus,
  getUniqueDataCollection,
  getUniqueCost,
  getUniqueTime,
} from '@/data/methods';
import { Filters } from '@/hooks/useMethodFilters';
import { badgeColors, badgeIcons } from '@/components/LevelBadge';
import { BADGE_TOOLTIPS } from '@/data/badgeTooltips';
import { cn } from '@/lib/utils';

// Mini badge component for filter options with icons
const FilterBadge = ({ label, disabled = false }: { label: string; disabled?: boolean }) => {
  const IconComponent = badgeIcons[label];
  
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium transition-opacity",
      badgeColors[label],
      disabled && "opacity-40"
    )}>
      {IconComponent && <IconComponent className="mr-1 h-3 w-3" />}
      {label}
    </span>
  );
};

const FilterBadgeWithTooltip = ({
  label,
  tooltip,
  disabled = false,
}: {
  label: string;
  tooltip: string;
  disabled?: boolean;
}) => (
  <HybridTooltip>
    <HybridTooltipTrigger asChild>
      <button
        type="button"
        className={cn(
          "inline-flex rounded-full border-0 bg-transparent p-0",
          disabled ? "cursor-not-allowed" : "cursor-help"
        )}
        aria-disabled={disabled}
        aria-label={`${label}: ${tooltip}`}
        onClick={(event) => event.stopPropagation()}
      >
        <FilterBadge label={label} disabled={disabled} />
      </button>
    </HybridTooltipTrigger>
    <HybridTooltipContent>
      <p className="max-w-xs">{tooltip}</p>
    </HybridTooltipContent>
  </HybridTooltip>
);

interface AvailableOptions {
  questions: string[];
  designPhase: string[];
  analysisFocus: string[];
  dataCollection: string[];
  cost: string[];
  time: string[];
}

interface MethodFiltersProps {
  filters: Filters;
  availableOptions: AvailableOptions;
  onFilterChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onCheckboxToggle: (key: 'designPhase' | 'analysisFocus', value: string) => void;
}

export function MethodFilters({ filters, availableOptions, onFilterChange, onCheckboxToggle }: MethodFiltersProps) {
  const questions = getUniqueQuestions();
  const designPhases = getUniqueDesignPhases();
  const analysisFocuses = getUniqueAnalysisFocus();
  const dataCollections = getUniqueDataCollection();
  const costs = getUniqueCost();
  const times = getUniqueTime();

  return (
    <HybridTooltipProvider>
      <div className="bg-muted/50 rounded-lg p-5 shadow-sm border mb-8">
          {/* All filters in a single unified grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Question Dropdown */}
            <div className="space-y-2 p-3 rounded-lg border border-border/40 hover:border-border hover:bg-muted/20 transition-colors">
              <Label className="font-semibold text-foreground flex items-center gap-1.5">
                Question
                <HybridTooltip>
                  <HybridTooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </HybridTooltipTrigger>
                  <HybridTooltipContent>
                    <p className="max-w-xs">{BADGE_TOOLTIPS['Question-info']}</p>
                  </HybridTooltipContent>
                </HybridTooltip>
              </Label>
            <Select
              value={filters.question}
              onValueChange={(value) => onFilterChange('question', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {questions.map((q) => {
                  const isAvailable = availableOptions.questions.includes(q);
                  const isSelected = filters.question === q;
                  return (
                    <SelectItem 
                      key={q} 
                      value={q} 
                      disabled={!isAvailable && !isSelected}
                      className={cn(!isAvailable && !isSelected && "opacity-40")}
                    >
                      {q}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

            {/* Design Phase Checkboxes */}
            <div className="space-y-2 p-3 rounded-lg border border-border/40 hover:border-border hover:bg-muted/20 transition-colors">
              <Label className="font-semibold text-foreground flex items-center gap-1.5">
                Design Phase
                <HybridTooltip>
                  <HybridTooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </HybridTooltipTrigger>
                  <HybridTooltipContent>
                    <p className="max-w-xs">{BADGE_TOOLTIPS['Design Phase-info']}</p>
                  </HybridTooltipContent>
                </HybridTooltip>
            </Label>
            <div className="flex flex-wrap gap-3">
              {designPhases.map((phase) => {
                const isAvailable = availableOptions.designPhase.includes(phase);
                const isSelected = filters.designPhase.includes(phase);
                const isDisabled = !isAvailable && !isSelected;
                return (
                  <Label
                    key={phase}
                    htmlFor={`phase-${phase}`}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1 -mx-2 rounded-md transition-colors",
                      isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-muted"
                    )}
                  >
                    <Checkbox
                      id={`phase-${phase}`}
                      checked={isSelected}
                      onCheckedChange={() => onCheckboxToggle('designPhase', phase)}
                      disabled={isDisabled}
                    />
                    <FilterBadgeWithTooltip
                      label={phase}
                      tooltip={BADGE_TOOLTIPS[phase]}
                      disabled={isDisabled}
                    />
                  </Label>
                );
              })}
            </div>
          </div>

            {/* Analysis Focus Checkboxes */}
            <div className="space-y-2 p-3 rounded-lg border border-border/40 hover:border-border hover:bg-muted/20 transition-colors">
              <Label className="font-semibold text-foreground flex items-center gap-1.5">
                Analysis Focus
                <HybridTooltip>
                  <HybridTooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </HybridTooltipTrigger>
                  <HybridTooltipContent>
                    <p className="max-w-xs">{BADGE_TOOLTIPS['Analysis Focus-info']}</p>
                  </HybridTooltipContent>
                </HybridTooltip>
            </Label>
            <div className="flex flex-wrap gap-3">
              {analysisFocuses.map((focus) => {
                const isAvailable = availableOptions.analysisFocus.includes(focus);
                const isSelected = filters.analysisFocus.includes(focus);
                const isDisabled = !isAvailable && !isSelected;
                return (
                  <Label
                    key={focus}
                    htmlFor={`focus-${focus}`}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1 -mx-2 rounded-md transition-colors",
                      isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-muted"
                    )}
                  >
                    <Checkbox
                      id={`focus-${focus}`}
                      checked={isSelected}
                      onCheckedChange={() => onCheckboxToggle('analysisFocus', focus)}
                      disabled={isDisabled}
                    />
                    <FilterBadgeWithTooltip
                      label={focus}
                      tooltip={BADGE_TOOLTIPS[focus]}
                      disabled={isDisabled}
                    />
                  </Label>
                );
              })}
            </div>
          </div>

            {/* Data Collection Radio */}
            <div className="space-y-2 p-3 rounded-lg border border-border/40 hover:border-border hover:bg-muted/20 transition-colors">
              <Label className="font-semibold text-foreground flex items-center gap-1.5">
                Data Collection
                <HybridTooltip>
                  <HybridTooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </HybridTooltipTrigger>
                  <HybridTooltipContent>
                    <p className="max-w-xs">{BADGE_TOOLTIPS['Data Collection-info']}</p>
                  </HybridTooltipContent>
                </HybridTooltip>
            </Label>
            <RadioGroup
              value={filters.dataCollection || 'all'}
              onValueChange={(value) => onFilterChange('dataCollection', value === 'all' ? '' : value)}
              className="flex flex-wrap gap-3"
            >
              <Label htmlFor="dc-all" className="flex items-center gap-2 cursor-pointer px-2 py-1 -mx-2 rounded-md hover:bg-muted transition-colors">
                <RadioGroupItem value="all" id="dc-all" />
                <span className="text-sm font-normal">All</span>
              </Label>
              {dataCollections.map((dc) => {
                const isAvailable = availableOptions.dataCollection.includes(dc);
                const isSelected = filters.dataCollection === dc;
                const isDisabled = !isAvailable && !isSelected;
                return (
                  <Label
                    key={dc}
                    htmlFor={`dc-${dc}`}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1 -mx-2 rounded-md transition-colors",
                      isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-muted"
                    )}
                  >
                    <RadioGroupItem value={dc} id={`dc-${dc}`} disabled={isDisabled} />
                    <FilterBadgeWithTooltip
                      label={dc}
                      tooltip={BADGE_TOOLTIPS[dc]}
                      disabled={isDisabled}
                    />
                  </Label>
                );
              })}
            </RadioGroup>
          </div>

            {/* Cost Radio */}
            <div className="space-y-2 p-3 rounded-lg border border-border/40 hover:border-border hover:bg-muted/20 transition-colors">
              <Label className="font-semibold text-foreground flex items-center gap-1.5">
                Cost
                <HybridTooltip>
                  <HybridTooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </HybridTooltipTrigger>
                  <HybridTooltipContent>
                    <p className="max-w-xs">{BADGE_TOOLTIPS['Cost-info']}</p>
                  </HybridTooltipContent>
                </HybridTooltip>
            </Label>
            <RadioGroup
              value={filters.cost || 'all'}
              onValueChange={(value) => onFilterChange('cost', value === 'all' ? '' : value)}
              className="flex flex-wrap gap-3"
            >
              <Label htmlFor="cost-all" className="flex items-center gap-2 cursor-pointer px-2 py-1 -mx-2 rounded-md hover:bg-muted transition-colors">
                <RadioGroupItem value="all" id="cost-all" />
                <span className="text-sm font-normal">All</span>
              </Label>
              {costs.map((cost) => {
                const isAvailable = availableOptions.cost.includes(cost);
                const isSelected = filters.cost === cost;
                const isDisabled = !isAvailable && !isSelected;
                return (
                  <Label
                    key={cost}
                    htmlFor={`cost-${cost}`}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1 -mx-2 rounded-md transition-colors",
                      isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-muted"
                    )}
                  >
                    <RadioGroupItem value={cost} id={`cost-${cost}`} disabled={isDisabled} />
                    <FilterBadgeWithTooltip
                      label={cost}
                      tooltip={BADGE_TOOLTIPS[`Cost-${cost}`]}
                      disabled={isDisabled}
                    />
                  </Label>
                );
              })}
            </RadioGroup>
          </div>

            {/* Time Radio */}
            <div className="space-y-2 p-3 rounded-lg border border-border/40 hover:border-border hover:bg-muted/20 transition-colors">
              <Label className="font-semibold text-foreground flex items-center gap-1.5">
                Time
                <HybridTooltip>
                  <HybridTooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </HybridTooltipTrigger>
                  <HybridTooltipContent>
                    <p className="max-w-xs">{BADGE_TOOLTIPS['Time-info']}</p>
                  </HybridTooltipContent>
                </HybridTooltip>
            </Label>
            <RadioGroup
              value={filters.time || 'all'}
              onValueChange={(value) => onFilterChange('time', value === 'all' ? '' : value)}
              className="flex flex-wrap gap-3"
            >
              <Label htmlFor="time-all" className="flex items-center gap-2 cursor-pointer px-2 py-1 -mx-2 rounded-md hover:bg-muted transition-colors">
                <RadioGroupItem value="all" id="time-all" />
                <span className="text-sm font-normal">All</span>
              </Label>
              {times.map((time) => {
                const isAvailable = availableOptions.time.includes(time);
                const isSelected = filters.time === time;
                const isDisabled = !isAvailable && !isSelected;
                return (
                  <Label
                    key={time}
                    htmlFor={`time-${time}`}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1 -mx-2 rounded-md transition-colors",
                      isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-muted"
                    )}
                  >
                    <RadioGroupItem value={time} id={`time-${time}`} disabled={isDisabled} />
                    <FilterBadgeWithTooltip
                      label={time}
                      tooltip={BADGE_TOOLTIPS[`Time-${time}`]}
                      disabled={isDisabled}
                    />
                  </Label>
                );
              })}
            </RadioGroup>
          </div>
          </div>
        </div>
    </HybridTooltipProvider>
  );
}
