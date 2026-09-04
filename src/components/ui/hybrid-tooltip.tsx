import * as React from "react";
import { useTouchTooltip } from "@/hooks/use-touch-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface HybridTooltipProps {
  children: React.ReactNode;
}

interface HybridTooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface HybridTooltipContentProps {
  children: React.ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}

const HybridTooltipContext = React.createContext<{ needsTouchTooltip: boolean }>({
  needsTouchTooltip: false,
});

export function HybridTooltipProvider({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}

export function HybridTooltip({ children }: HybridTooltipProps) {
  const needsTouchTooltip = useTouchTooltip();

  if (needsTouchTooltip) {
    return (
      <HybridTooltipContext.Provider value={{ needsTouchTooltip: true }}>
        <Popover>{children}</Popover>
      </HybridTooltipContext.Provider>
    );
  }

  return (
    <HybridTooltipContext.Provider value={{ needsTouchTooltip: false }}>
      <Tooltip>{children}</Tooltip>
    </HybridTooltipContext.Provider>
  );
}

export function HybridTooltipTrigger({ children, asChild }: HybridTooltipTriggerProps) {
  const { needsTouchTooltip } = React.useContext(HybridTooltipContext);

  if (needsTouchTooltip) {
    return <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>;
  }

  return <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>;
}

export function HybridTooltipContent({
  children,
  className,
  side,
  sideOffset = 4,
}: HybridTooltipContentProps) {
  const { needsTouchTooltip } = React.useContext(HybridTooltipContext);

  if (needsTouchTooltip) {
    return (
      <PopoverContent
        side={side}
        sideOffset={sideOffset}
        className={cn("w-auto max-w-xs px-3 py-1.5 text-sm", className)}
      >
        {children}
      </PopoverContent>
    );
  }

  return (
    <TooltipContent side={side} sideOffset={sideOffset} className={className}>
      {children}
    </TooltipContent>
  );
}
