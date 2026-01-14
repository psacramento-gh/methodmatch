import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CollapsibleTextProps {
  text: string;
  maxLength?: number;
}

export function CollapsibleText({ text, maxLength = 120 }: CollapsibleTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded || !shouldTruncate 
    ? text 
    : text.slice(0, maxLength).trim() + '...';

  if (!shouldTruncate) {
    return <span className="text-muted-foreground">{text}</span>;
  }

  return (
    <div className="space-y-1">
      <span className="text-muted-foreground">{displayText}</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-auto p-0 text-xs text-primary hover:bg-transparent hover:underline"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>Show less <ChevronUp className="h-3 w-3 ml-1" /></>
        ) : (
          <>Show more <ChevronDown className="h-3 w-3 ml-1" /></>
        )}
      </Button>
    </div>
  );
}
