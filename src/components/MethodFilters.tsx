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
  getUniqueQuestions,
  getUniqueDesignPhases,
  getUniqueAnalysisFocus,
  getUniqueDataCollection,
  getUniqueCost,
  getUniqueTime,
} from '@/data/methods';
import { Filters } from '@/hooks/useMethodFilters';

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
    <div className="bg-card rounded-lg p-5 shadow-sm border mb-5 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {/* Question Dropdown */}
        <div className="space-y-2">
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
        <div className="space-y-2">
          <Label className="font-semibold text-foreground">Design Phase</Label>
          <div className="flex flex-wrap gap-3">
            {designPhases.map((phase) => (
              <Label
                key={phase}
                htmlFor={`phase-${phase}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  id={`phase-${phase}`}
                  checked={filters.designPhase.includes(phase)}
                  onCheckedChange={() => onCheckboxToggle('designPhase', phase)}
                />
                <span className="text-sm font-normal">{phase}</span>
              </Label>
            ))}
          </div>
        </div>

        {/* Analysis Focus Checkboxes */}
        <div className="space-y-2">
          <Label className="font-semibold text-foreground">Analysis Focus</Label>
          <div className="flex flex-wrap gap-3">
            {analysisFocuses.map((focus) => (
              <Label
                key={focus}
                htmlFor={`focus-${focus}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  id={`focus-${focus}`}
                  checked={filters.analysisFocus.includes(focus)}
                  onCheckedChange={() => onCheckboxToggle('analysisFocus', focus)}
                />
                <span className="text-sm font-normal">{focus}</span>
              </Label>
            ))}
          </div>
        </div>

        {/* Data Collection Radio */}
        <div className="space-y-2">
          <Label className="font-semibold text-foreground">Data Collection</Label>
          <RadioGroup
            value={filters.dataCollection || 'all'}
            onValueChange={(value) => onFilterChange('dataCollection', value === 'all' ? '' : value)}
            className="flex flex-wrap gap-3"
          >
            <Label htmlFor="dc-all" className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="all" id="dc-all" />
              <span className="text-sm font-normal">All</span>
            </Label>
            {dataCollections.map((dc) => (
              <Label key={dc} htmlFor={`dc-${dc}`} className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value={dc} id={`dc-${dc}`} />
                <span className="text-sm font-normal">{dc}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {/* Cost Radio */}
        <div className="space-y-2">
          <Label className="font-semibold text-foreground">Cost</Label>
          <RadioGroup
            value={filters.cost || 'all'}
            onValueChange={(value) => onFilterChange('cost', value === 'all' ? '' : value)}
            className="flex flex-wrap gap-3"
          >
            <Label htmlFor="cost-all" className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="all" id="cost-all" />
              <span className="text-sm font-normal">All</span>
            </Label>
            {costs.map((cost) => (
              <Label key={cost} htmlFor={`cost-${cost}`} className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value={cost} id={`cost-${cost}`} />
                <span className="text-sm font-normal">{cost}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {/* Time Radio */}
        <div className="space-y-2">
          <Label className="font-semibold text-foreground">Time</Label>
          <RadioGroup
            value={filters.time || 'all'}
            onValueChange={(value) => onFilterChange('time', value === 'all' ? '' : value)}
            className="flex flex-wrap gap-3"
          >
            <Label htmlFor="time-all" className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="all" id="time-all" />
              <span className="text-sm font-normal">All</span>
            </Label>
            {times.map((time) => (
              <Label key={time} htmlFor={`time-${time}`} className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value={time} id={`time-${time}`} />
                <span className="text-sm font-normal">{time}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
