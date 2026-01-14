import { cn } from '@/lib/utils';
import { Brain, Users, Pencil, PenTool, Rocket, MessageCircle, ChartNoAxesColumn } from 'lucide-react';

interface LevelBadgeProps {
  level: 'Low' | 'Medium' | 'High' | 'Analytic' | 'Empirical' | 'Plan' | 'Design' | 'Release' | 'Qualitative' | 'Quantitative' | string;
  type?: 'cost' | 'time' | 'dataCollection' | 'designPhase' | 'analysisFocus';
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

  const designPhaseClasses = {
    Plan: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    Design: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    Release: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  };

  const designPhaseIcons = {
    Plan: Pencil,
    Design: PenTool,
    Release: Rocket,
  };

  const analysisFocusClasses = {
    Qualitative: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
    Quantitative: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
  };

  const analysisFocusIcons = {
    Qualitative: MessageCircle,
    Quantitative: ChartNoAxesColumn,
  };

  let colorClass: string;
  let IconComponent: typeof Brain | typeof Users | typeof Pencil | typeof PenTool | typeof Rocket | typeof MessageCircle | typeof ChartNoAxesColumn | null = null;

  if (type === 'dataCollection') {
    colorClass = dataCollectionClasses[level as keyof typeof dataCollectionClasses] || dataCollectionClasses.Analytic;
    IconComponent = dataCollectionIcons[level as keyof typeof dataCollectionIcons] || null;
  } else if (type === 'designPhase') {
    colorClass = designPhaseClasses[level as keyof typeof designPhaseClasses] || designPhaseClasses.Plan;
    IconComponent = designPhaseIcons[level as keyof typeof designPhaseIcons] || null;
  } else if (type === 'analysisFocus') {
    colorClass = analysisFocusClasses[level as keyof typeof analysisFocusClasses] || analysisFocusClasses.Qualitative;
    IconComponent = analysisFocusIcons[level as keyof typeof analysisFocusIcons] || null;
  } else {
    const validLevel = level as keyof typeof levelClasses;
    colorClass = levelClasses[validLevel] || levelClasses.Medium;
  }

  return (
    <span className={cn(baseClasses, colorClass)}>
      {IconComponent && <IconComponent className="mr-1 h-3 w-3" />}
      {level}
    </span>
  );
}