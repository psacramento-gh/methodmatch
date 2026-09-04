export const BADGE_TOOLTIPS: Record<string, string> = {
  // Category descriptions (for info icons)
  'Question-info': 'What type of research question are you trying to answer?',
  'Design Phase-info': 'When in the design process will you use this method?',
  'Analysis Focus-info': 'What type of insights are you looking for?',
  'Data Collection-info': 'How will you gather data for this research?',
  'Cost-info': 'How much budget is required for this method?',
  'Time-info': 'How long will it take to complete the research?',

  // Design Phase
  Plan: 'Methods best suited for the early discovery phase, before design work begins.',
  Design: 'Methods commonly used during active design and prototyping iterations.',
  Release: 'Methods typically applied after launch to evaluate live products.',

  // Analysis Focus
  Qualitative:
    'Focuses on understanding the "why" through observations, behaviors, and open-ended feedback.',
  Quantitative:
    'Focuses on the "how many" or "how much" through numerical data and statistical analysis.',

  // Data Collection
  Analytic: 'Methods based on expert review, heuristics, or modeling rather than direct user testing.',
  Empirical: 'Methods based on direct observation or data collection from actual users.',

  // Cost (category-specific keys)
  'Cost-Low': 'Can be conducted with minimal budget, often using internal resources or free tools.',
  'Cost-Medium':
    'Requires some budget for participant incentives, specialized tools, or moderate researcher time.',
  'Cost-High':
    'Significant investment needed for large sample sizes, professional labs, or extensive consulting.',

  // Time (category-specific keys)
  'Time-Low': 'Can be completed in a few days to a week, ideal for fast-paced agile cycles.',
  'Time-Medium': 'Typically takes 2-4 weeks from planning to reporting.',
  'Time-High': 'Long-term studies or complex benchmarks that may take over a month to complete.',
};

export type BadgeTooltipType =
  | 'cost'
  | 'time'
  | 'dataCollection'
  | 'designPhase'
  | 'analysisFocus';

export function getBadgeTooltip(level: string, type: BadgeTooltipType = 'cost'): string | undefined {
  if (type === 'cost') return BADGE_TOOLTIPS[`Cost-${level}`];
  if (type === 'time') return BADGE_TOOLTIPS[`Time-${level}`];
  return BADGE_TOOLTIPS[level];
}
