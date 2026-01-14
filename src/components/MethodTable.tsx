import { ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UXMethod } from '@/data/methods';
import { SortKey, SortOrder } from '@/hooks/useMethodFilters';
import { LevelBadge } from '@/components/LevelBadge';
import { CollapsibleText } from '@/components/CollapsibleText';

interface MethodTableProps {
  methods: UXMethod[];
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSort: (key: SortKey) => void;
}

interface SortableHeaderProps {
  label: string;
  sortKeyName: SortKey;
  currentSortKey: SortKey;
  sortOrder: SortOrder;
  onSort: (key: SortKey) => void;
}

function SortableHeader({ label, sortKeyName, currentSortKey, sortOrder, onSort }: SortableHeaderProps) {
  const isActive = currentSortKey === sortKeyName;

  return (
    <TableHead
      className="cursor-pointer select-none hover:bg-muted/50 transition-colors"
      onClick={() => onSort(sortKeyName)}
    >
      <div className="flex items-center gap-1">
        {label}
        {isActive && (
          sortOrder === 'asc' ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )
        )}
      </div>
    </TableHead>
  );
}

export function MethodTable({ methods, sortKey, sortOrder, onSort }: MethodTableProps) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader label="Method" sortKeyName="method" currentSortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
              <TableHead>Questions</TableHead>
              <SortableHeader label="Design Phase" sortKeyName="designPhase" currentSortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
              <SortableHeader label="Analysis Focus" sortKeyName="analysisFocus" currentSortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
              <SortableHeader label="Data Collection" sortKeyName="dataCollection" currentSortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
              <SortableHeader label="Cost" sortKeyName="cost" currentSortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
              <SortableHeader label="Time" sortKeyName="time" currentSortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {methods.map((method, index) => (
              <TableRow key={`${method.method}-${index}`}>
                <TableCell>
                  <a
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-bold"
                  >
                    {method.method}
                    <ExternalLink className="h-3 w-3 inline ml-1 align-baseline" />
                  </a>
                </TableCell>
              <TableCell className="max-w-xs">
                <div className="text-sm space-y-1">
                  {method.questions.map((q, i) => (
                    <p key={i} className="text-muted-foreground italic">– {q}</p>
                  ))}
                </div>
              </TableCell>
                <TableCell>{method.designPhase}</TableCell>
                <TableCell>{method.analysisFocus}</TableCell>
                <TableCell>{method.dataCollection}</TableCell>
                <TableCell>
                  <LevelBadge level={method.cost} type="cost" />
                </TableCell>
                <TableCell>
                  <LevelBadge level={method.time} type="time" />
                </TableCell>
                <TableCell className="max-w-md">
                  <CollapsibleText text={method.description} maxLength={100} />
                </TableCell>
              </TableRow>
            ))}
            {methods.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No methods match your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {methods.map((method, index) => (
          <div
            key={`mobile-${method.method}-${index}`}
            className="bg-card rounded-lg border p-4 shadow-sm space-y-3"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">Method</span>
              <a
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm font-bold"
              >
                {method.method}
                <ExternalLink className="h-3 w-3 inline ml-1 align-baseline" />
              </a>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">Questions</span>
                <div className="text-sm space-y-0.5">
                  {method.questions.map((q, i) => (
                    <p key={i} className="text-muted-foreground italic">– {q}</p>
                  ))}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Design Phase</span>
                <p className="text-sm">{method.designPhase}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Analysis Focus</span>
                <p className="text-sm">{method.analysisFocus}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Data Collection</span>
                <p className="text-sm">{method.dataCollection}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Cost</span>
                <div className="mt-0.5">
                  <LevelBadge level={method.cost} type="cost" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Time</span>
                <div className="mt-0.5">
                  <LevelBadge level={method.time} type="time" />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">Description</span>
              <div className="text-sm">
                <CollapsibleText text={method.description} maxLength={150} />
              </div>
            </div>
          </div>
        ))}
        {methods.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No methods match your filters
          </div>
        )}
      </div>
    </>
  );
}
