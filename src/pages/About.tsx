import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background p-5">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to MethodMatch
          </Link>
          <ThemeToggle />
        </div>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1>About</h1>

          <h2>What Is MethodMatch?</h2>
          <p>
            MethodMatch is a web-based decision-support tool designed to help UX professionals select the most appropriate research methods for their specific projects.
          </p>
          <p>
            Developed by <a href="https://www.psacramento.com/" target="_blank" rel="noopener noreferrer">pSacramento</a> as an interactive, searchable database, it catalogs 17 established UX research methodologies and provides intelligent filtering to match methods to project requirements. Rather than offering generic descriptions, MethodMatch connects research questions, project constraints, and practical considerations to recommend the best-fit methods for any given situation.
          </p>

          <h2>Core Functionality</h2>
          <p>
            The app operates as an interactive decision tool with a clean, accessible interface. Users begin by filtering methods across six key dimensions:
          </p>
          <p>
            <strong>Question</strong> - What you want to answer (e.g., "Are there problems in the interface?", "Where do people look for information?", "What features do people want?")
          </p>
          <p>
            <strong>Design Phase</strong> - When the research occurs (Plan, Design, or Release phases)
          </p>
          <p>
            <strong>Analysis Focus</strong> - The data analysis approach, ranging from "how many" (Quantitative) to "why and what" (Qualitative)
          </p>
          <p>
            <strong>Data Collection</strong> - Whether data comes from Analytic sources (like logs and analytics) or Empirical sources (direct user interaction)
          </p>
          <p>
            <strong>Cost</strong> - Resource requirements (Low, Medium, or High)
          </p>
          <p>
            <strong>Time</strong> - Timeline for completion (Low, Medium, or High)
          </p>
          <p>
            As you adjust filters, the database immediately shows only matching methods, displaying 17 options when all filters are active and narrowing down as constraints are applied.
          </p>

          <h2>The 17 Methods Covered</h2>
          <p>
            MethodMatch includes comprehensive coverage of foundational UX research approaches:
          </p>
          <p>
            <strong>Early-Stage Discovery</strong>: Interview, Survey, Card Sort, Observation, Contextual Inquiry, Diary Study
          </p>
          <p>
            <strong>Problem Identification</strong>: Formative Usability Testing, Heuristic Evaluation, Tree Test, Search-Log Analysis, True Intent
          </p>
          <p>
            <strong>Comparative Evaluation</strong>: A/B Testing, Task-Based Benchmark, Retrospective Benchmark (Survey), PURE, Click Test, Usability Test
          </p>

          <h2>Who Benefits from MethodMatch?</h2>
          <p>
            <strong>UX Researchers and Designers</strong> - The primary audience. Those responsible for conducting user research can quickly identify applicable methods without needing to consult multiple references or expertise they may not possess internally.
          </p>
          <p>
            <strong>Product Managers</strong> - Help justify research investments and understand what data can be gathered within budget and timeline constraints.
          </p>
          <p>
            <strong>Team Leaders and Stakeholders</strong> - Gain visibility into why specific methods are chosen and what they'll reveal.
          </p>
          <p>
            <strong>Researchers Earlier in Their Careers</strong> - Those building expertise in research methods can discover approaches they may not have considered and understand the tradeoffs between different techniques.
          </p>
          <p>
            <strong>Agencies and Consultancies</strong> - Sales and project planning teams can scope what's possible within client constraints.
          </p>

          <h2>Primary Use Cases</h2>
          <p>
            <strong>Method Selection Under Constraints</strong> - A team needs to identify problems in their interface but has limited budget and a tight timeline. MethodMatch immediately filters to low-cost, quick methods like Heuristic Evaluation or Click Test.
          </p>
          <p>
            <strong>Matching Questions to Methods</strong> - A product manager asks "What features do users actually want?" MethodMatch shows that Survey and Interview are the relevant methods, with different cost/time tradeoffs.
          </p>
          <p>
            <strong>Planning Research Programs</strong> - When designing a comprehensive research strategy, teams can see how different methods address different questions across the project lifecycle.
          </p>
          <p>
            <strong>Learning and Reference</strong> - UX professionals can explore the database to refresh their knowledge or discover methods they're less familiar with, complete with brief descriptions and external links to authoritative sources.
          </p>
          <p>
            <strong>Justifying Research Approaches</strong> - When proposing research, teams can show stakeholders why a particular method was chosen and how it balances their specific constraints.
          </p>

          <h2>Key Advantages</h2>
          <p>
            <strong>Speed and Accessibility</strong> - Finding the right method takes seconds rather than hours of research or consultation. The visual filtering interface is intuitive for both experts and newcomers.
          </p>
          <p>
            <strong>Contextual Decision Making</strong> - Unlike generic method guides, MethodMatch forces explicit consideration of real-world constraints. You can't ignore whether you have a week or a month; the tool makes these tradeoffs transparent.
          </p>
          <p>
            <strong>Comprehensive Coverage with Practical Details</strong> - Each method includes multiple dimensions of comparison—not just descriptions, but clear indicators of cost, time, and data type. This prevents the common mistake of choosing an elegant method that's actually impractical.
          </p>
          <p>
            <strong>Connected to Authoritative Sources</strong> - Method names link to detailed guides from respected sources like Nielsen Norman Group and MeasuringU, providing depth when needed.
          </p>
          <p>
            <strong>Prevents Analysis Paralysis</strong> - For teams uncertain about research direction, the tool provides structure and clear alternatives rather than open-ended choices.
          </p>
          <p>
            <strong>Lightweight and Focused</strong> - The tool does one thing well: method selection. No bloated features, signup requirements, or unnecessary complexity.
          </p>

          <h2>Typical Workflow</h2>
          <p>A typical user session might look like:</p>
          <ol>
            <li>Start with a research question ("Are there problems in the interface?")</li>
            <li>Apply practical constraints (Low cost, Medium time available)</li>
            <li>Review the 3-6 matching methods</li>
            <li>Compare tradeoffs between them</li>
            <li>Click through to detailed resources for the chosen method</li>
            <li>Implement the research</li>
          </ol>
          <p>
            This entire process can take 5-15 minutes, compared to potentially hours of scattered research through books, courses, or expert consultation.
          </p>

          <h2>Contextual Strengths</h2>
          <p>
            <strong>For Organizations Building Research Practice</strong> - MethodMatch serves as a teaching tool, normalizing the idea that method selection is a deliberate, criteria-based decision rather than "we always do usability testing."
          </p>
          <p>
            <strong>For Distributed or Remote Teams</strong> - Provides a shared language and reference for discussing research approach across time zones and offices.
          </p>
          <p>
            <strong>For Researchers Without Formal Training</strong> - Removes gatekeeping around research methodology. You don't need a PhD to select an appropriate method.
          </p>
          <p>
            <strong>For Scope Management</strong> - When clients or stakeholders want "more research," the tool makes clear what's possible within real constraints.
          </p>

          <h2>Limitations to Consider</h2>
          <p>
            MethodMatch excels at selection but assumes you already know what question you need to answer. It doesn't help if you're unsure whether you need research at all, or what questions to ask. The 17 methods cover most common situations but aren't exhaustive—highly specialized contexts (international research, accessibility testing, etc.) may require deeper expertise. And while it shows tradeoffs, actually executing research requires skills the tool doesn't teach.
          </p>

          <h2>Conclusion</h2>
          <p>
            MethodMatch fills a genuine gap in UX practice. Research method selection shouldn't require diving through academic literature or relying on individual memory and preference. By making method selection transparent, constraint-aware, and fast, the tool democratizes a decision that affects the quality of insights teams generate. Whether you're a seasoned researcher optimizing a portfolio of studies or a product team doing user research for the first time, MethodMatch reduces the friction between asking a research question and knowing which method can answer it.
          </p>
        </article>

        <Footer />
      </div>
    </div>
  );
};

export default About;
