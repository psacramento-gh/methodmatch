import { cn } from '@/lib/utils';
import { Brain, Users } from 'lucide-react';

interface LevelBadgeProps {
  level: 'Low' | 'Medium' | 'High' | 'Analytic' | 'Empirical' | string;
  type?: 'cost' | 'time' | 'dataCollection';
}

export function LevelBadge({ level, type = 'cost' }: LevelBadgeProps) {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const levelClasses = {
    Low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    Medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    High: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
  };

  const dataCollectionClasses = {
    Analytic: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Empirical: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  };

  const dataCollectionIcons = {
    Analytic: Brain,
    Empirical: Users,
  };

  const levelIcons = {
    Low: "●",
    Medium: "●●",
    High: "●●●",
  };

  let colorClass: string;
  let icon: string = "";
  let IconComponent: typeof Brain | typeof Users | null = null;

  if (type === 'dataCollection') {
    colorClass = dataCollectionClasses[level as keyof typeof dataCollectionClasses] || dataCollectionClasses.Analytic;
    IconComponent = dataCollectionIcons[level as keyof typeof dataCollectionIcons] || null;
  } else {
    const validLevel = level as keyof typeof levelClasses;
    colorClass = levelClasses[validLevel] || levelClasses.Medium;
    icon = levelIcons[validLevel] || "";
  }

  return (
    <span className={cn(baseClasses, colorClass)}>
      {IconComponent && <IconComponent className="mr-1 h-3 w-3" />}
      {icon && <span className="mr-1 text-[8px] opacity-70">{icon}</span>}
      {level}
    </span>
  );
}