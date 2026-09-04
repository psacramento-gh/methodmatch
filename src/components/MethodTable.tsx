import { ExternalLink } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UXMethod } from '@/data/methods';
import { LevelBadgeWithTooltip } from '@/components/LevelBadge';
import { CollapsibleText } from '@/components/CollapsibleText';

interface MethodTableProps {
  methods: UXMethod[];
}

export function MethodTable({ methods }: MethodTableProps) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[12%]">Method</TableHead>
              <TableHead className="w-[18%]">Questions</TableHead>
              <TableHead className="w-[10%]">Design Phase</TableHead>
              <TableHead className="w-[10%]">Analysis Focus</TableHead>
              <TableHead className="w-[10%]">Data Collection</TableHead>
              <TableHead className="w-[7%]">Cost</TableHead>
              <TableHead className="w-[7%]">Time</TableHead>
              <TableHead className="w-[26%]">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {methods.map((method, index) => (
              <TableRow 
                key={`${method.method}-${index}`}
                className={index % 2 === 0 ? 'bg-muted/30' : ''}
              >
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
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {method.designPhase.split(',').map((phase, i) => (
                      <LevelBadgeWithTooltip key={i} level={phase.trim()} type="designPhase" />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {method.analysisFocus.split(',').map((focus) => (
                      <LevelBadgeWithTooltip key={focus.trim()} level={focus.trim()} type="analysisFocus" />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <LevelBadgeWithTooltip level={method.dataCollection} type="dataCollection" />
                </TableCell>
                <TableCell>
                  <LevelBadgeWithTooltip level={method.cost} type="cost" />
                </TableCell>
                <TableCell>
                  <LevelBadgeWithTooltip level={method.time} type="time" />
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

      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden space-y-4">
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
                className="block text-primary hover:underline text-sm font-bold"
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
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {method.designPhase.split(',').map((phase, i) => (
                    <LevelBadgeWithTooltip key={i} level={phase.trim()} type="designPhase" />
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Analysis Focus</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {method.analysisFocus.split(',').map((focus) => (
                    <LevelBadgeWithTooltip key={focus.trim()} level={focus.trim()} type="analysisFocus" />
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Data Collection</span>
                <div className="mt-0.5">
                  <LevelBadgeWithTooltip level={method.dataCollection} type="dataCollection" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Cost</span>
                <div className="mt-0.5">
                  <LevelBadgeWithTooltip level={method.cost} type="cost" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Time</span>
                <div className="mt-0.5">
                  <LevelBadgeWithTooltip level={method.time} type="time" />
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
