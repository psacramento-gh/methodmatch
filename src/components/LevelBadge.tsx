import { cn } from '@/lib/utils';

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

  const levelIcons = {
    Low: "●",
    Medium: "●●",
    High: "●●●",
  };

  let colorClass: string;
  let icon: string = "";

  if (type === 'dataCollection') {
    colorClass = dataCollectionClasses[level as keyof typeof dataCollectionClasses] || dataCollectionClasses.Analytic;
  } else {
    const validLevel = level as keyof typeof levelClasses;
    colorClass = levelClasses[validLevel] || levelClasses.Medium;
    icon = levelIcons[validLevel] || "";
  }

  return (
    <span className={cn(baseClasses, colorClass)}>
      {icon && <span className="mr-1 text-[8px] opacity-70">{icon}</span>}
      {level}
    </span>
  );
}