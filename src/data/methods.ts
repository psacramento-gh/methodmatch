export interface UXMethod {
  questions: string[];
  method: string;
  designPhase: string;
  analysisFocus: string;
  dataCollection: string;
  cost: string;
  time: string;
  description: string;
  link: string;
}

export const methods: UXMethod[] = [
  {
    questions: ["Are there problems in the interface?"],
    method: "Formative Usability Testing",
    designPhase: "Design, Release",
    analysisFocus: "Qualitative, Quantitative",
    dataCollection: "Empirical",
    cost: "Medium",
    time: "Medium",
    description: "One of the most common methods for simulating use to observe behaviors is usability testing. A usability test involves having representative participants attempt realistic tasks with a product or interface. An evaluator (researcher, designer, or stakeholder) looks for problems the users encounter. Usability testing that primarily focuses on problem identification is called formative. Usability testing that focuses more on performance (e.g., completion rates, task times) is called summative. When a human is part of the simulation, it's called a Wizard of Oz study.",
    link: "https://measuringu.com/services/formative-usability/"
  },
  {
    questions: ["Are there problems in the interface?"],
    method: "Heuristic Evaluation",
    designPhase: "Design, Release",
    analysisFocus: "Qualitative",
    dataCollection: "Analytic",
    cost: "Low",
    time: "Low",
    description: "A heuristic evaluation involves multiple evaluators examining an interface against a set of principles or design rules called heuristics. Heuristics can be thought of as simple and efficient rules that evaluators use as reminders of potential problem areas. Heuristics are typically derived from an examination of the problems uncovered in usability tests to generate overall principles.",
    link: "https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/"
  },
  {
    questions: [
      "Are there problems in the interface?",
      "Where do people look for information?",
      "What problems do people have as they use our product?"
    ],
    method: "Observation",
    designPhase: "Plan, Design, Release",
    analysisFocus: "Qualitative",
    dataCollection: "Empirical",
    cost: "Low",
    time: "Medium",
    description: "Observation in UX research involves watching people use a product without interfering (e.g., employees entering expense reports), either in-person or remotely as they do their work with an existing product to generate ideas about actual or potential problems and/or new feature ideas.",
    link: "https://measuringu.com/observation-role/"
  },
  {
    questions: [
      "Where do people look for information?",
      "How do we organize content and features?"
    ],
    method: "Tree Test",
    designPhase: "Plan, Design, Release",
    analysisFocus: "Qualitative, Quantitative",
    dataCollection: "Empirical",
    cost: "Low",
    time: "Low",
    description: "A tree test is a type of usability test on the hierarchy/taxonomy of a navigation structure such as a website or software menu. Participants are asked where they would find content or features in a 'tree' structure.",
    link: "https://measuringu.com/tree-testing-ia/"
  },
  {
    questions: ["Where do people look for information?"],
    method: "Usability Test",
    designPhase: "Design, Release",
    analysisFocus: "Qualitative, Quantitative",
    dataCollection: "Empirical",
    cost: "Medium",
    time: "Medium",
    description: "In a usability-testing session, a researcher asks a participant to perform tasks using specific user interfaces, observing behavior and listening for feedback.",
    link: "https://www.nngroup.com/articles/usability-testing-101/"
  },
  {
    questions: ["Where do people look for information?"],
    method: "Click Test",
    designPhase: "Design, Release",
    analysisFocus: "Quantitative",
    dataCollection: "Empirical",
    cost: "Low",
    time: "Low",
    description: "A click test involves participants being given a specific task and then clicking where they believe they can complete that task on a screen or interface.",
    link: "https://measuringu.com/why-and-when-to-use-a-click-test/"
  },
  {
    questions: [
      "How does our product compare to competitors?",
      "Is a new interface better than an alternative?"
    ],
    method: "Task-Based Benchmark",
    designPhase: "Release",
    analysisFocus: "Quantitative",
    dataCollection: "Empirical",
    cost: "High",
    time: "High",
    description: "Participants attempt prescribed tasks on the interface in a controlled setting to measure performance metrics. This method is used to benchmark performance and compare alternatives or competitors.",
    link: "https://measuringu.com/benchmark-intro/"
  },
  {
    questions: ["How does our product compare to competitors?"],
    method: "Retrospective Benchmark (Survey)",
    designPhase: "Release",
    analysisFocus: "Quantitative",
    dataCollection: "Empirical",
    cost: "Medium",
    time: "Low",
    description: "Participants recall their recent experience with an interface and answer questions to gauge performance compared to competitors.",
    link: "https://measuringu.com/benchmark-intro/"
  },
  {
    questions: [
      "How does our product compare to competitors?",
      "Is a new interface better than an alternative?"
    ],
    method: "PURE",
    designPhase: "Design, Release",
    analysisFocus: "Quantitative",
    dataCollection: "Analytic",
    cost: "Low",
    time: "Low",
    description: "Practical usability rating by experts combines cognitive walkthroughs with a scoring rubric to compare products and different interfaces.",
    link: "https://measuringu.com/pure/"
  },
  {
    questions: ["What features do people want?"],
    method: "Survey",
    designPhase: "Plan",
    analysisFocus: "Qualitative, Quantitative",
    dataCollection: "Empirical",
    cost: "Low",
    time: "Low",
    description: "Surveys capture user perceptions and preferences to identify desired features.",
    link: "https://measuringu.com/survey-ux/"
  },
  {
    questions: ["What features do people want?"],
    method: "Interview",
    designPhase: "Plan",
    analysisFocus: "Qualitative",
    dataCollection: "Empirical",
    cost: "Medium",
    time: "Medium",
    description: "Interviews involve discussing with users or stakeholders to uncover desired features and insights.",
    link: "https://www.nngroup.com/articles/user-interviews/"
  },
  {
    questions: ["Is a new interface better than an alternative?"],
    method: "A/B Testing",
    designPhase: "Release",
    analysisFocus: "Quantitative",
    dataCollection: "Empirical",
    cost: "Medium",
    time: "Low",
    description: "A/B testing compares two or more design variations with live users to determine which performs better.",
    link: "https://www.nngroup.com/articles/ab-testing/"
  },
  {
    questions: ["What problems do people have as they use our product?"],
    method: "Diary Study",
    designPhase: "Release",
    analysisFocus: "Qualitative",
    dataCollection: "Empirical",
    cost: "Medium",
    time: "High",
    description: "Participants document their experiences over time to reveal problems encountered during usage.",
    link: "https://www.nngroup.com/articles/diary-studies/"
  },
  {
    questions: ["What problems do people have as they use our product?"],
    method: "Search-Log Analysis",
    designPhase: "Release",
    analysisFocus: "Quantitative",
    dataCollection: "Empirical",
    cost: "Low",
    time: "Low",
    description: "Analyzing search logs to understand user queries and identify problems in finding information.",
    link: "https://www.nngroup.com/articles/search-log-analysis/"
  },
  {
    questions: ["What problems do people have as they use our product?"],
    method: "True Intent",
    designPhase: "Release",
    analysisFocus: "Quantitative",
    dataCollection: "Empirical",
    cost: "Low",
    time: "Low",
    description: "Combining website logs with surveys to understand user intent and issues faced.",
    link: "https://measuringu.com/true-intent/"
  },
  {
    questions: ["What problems do people have as they use our product?"],
    method: "Contextual Inquiry",
    designPhase: "Release",
    analysisFocus: "Qualitative",
    dataCollection: "Empirical",
    cost: "Medium",
    time: "Medium",
    description: "Conducting observations and interviews in the user's environment to uncover problems.",
    link: "https://measuringu.com/contextual-inquiry/"
  },
  {
    questions: ["How do we organize content and features?"],
    method: "Card Sort",
    designPhase: "Plan, Design",
    analysisFocus: "Qualitative",
    dataCollection: "Empirical",
    cost: "Low",
    time: "Low",
    description: "Participants group content into categories to inform information architecture.",
    link: "https://measuringu.com/card-sorting-ia/"
  }
];

// Helper functions to extract unique filter options
export function getUniqueQuestions(): string[] {
  const questions = new Set<string>();
  methods.forEach(m => m.questions.forEach(q => questions.add(q)));
  return [...questions].sort();
}

export function getUniqueDesignPhases(): string[] {
  const order = ['Plan', 'Design', 'Release'];
  const phases = new Set<string>();
  methods.forEach(m => {
    m.designPhase.split(',').map(p => p.trim()).forEach(p => phases.add(p));
  });
  return [...phases].sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

export function getUniqueAnalysisFocus(): string[] {
  const focuses = new Set<string>();
  methods.forEach(m => {
    m.analysisFocus.split(',').map(f => f.trim()).forEach(f => focuses.add(f));
  });
  return [...focuses].sort();
}

export function getUniqueDataCollection(): string[] {
  return [...new Set(methods.map(m => m.dataCollection.trim()))].sort();
}

export function getUniqueCost(): string[] {
  const order = ['Low', 'Medium', 'High'];
  return [...new Set(methods.map(m => m.cost))].sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

export function getUniqueTime(): string[] {
  const order = ['Low', 'Medium', 'High'];
  return [...new Set(methods.map(m => m.time))].sort((a, b) => order.indexOf(a) - order.indexOf(b));
}
