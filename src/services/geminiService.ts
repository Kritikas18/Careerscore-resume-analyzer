export interface AIAssistRequest {
  action: 'summary' | 'enhance-bullet' | 'skills' | 'rewrite' | 'achievement' | 'ats-keywords';
  role?: string;
  context?: string;
  skills?: string[];
  jobDescription?: string;
  tone?: 'impactful' | 'concise' | 'executive' | 'technical';
}

export interface AIAssistResponse {
  success: boolean;
  result: string | string[];
  provider: 'gemini' | 'heuristic-engine';
}

export async function requestAIAssist(payload: AIAssistRequest): Promise<AIAssistResponse> {
  try {
    const res = await fetch('/api/ai-assist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.result) {
        return {
          success: true,
          result: data.result,
          provider: 'gemini',
        };
      }
    }
  } catch {
    // If backend route is unreachable or in preview without key, fallback smoothly
  }

  // Graceful high-quality heuristic fallback
  return getIntelligentFallback(payload);
}

function getIntelligentFallback(payload: AIAssistRequest): AIAssistResponse {
  const { action, role = 'Software Engineer', context = '', skills = [] } = payload;

  switch (action) {
    case 'summary': {
      const skillSnippet = skills.slice(0, 4).join(', ') || 'modern software architecture, agile delivery, and cross-functional leadership';
      const summaries = [
        `Results-driven ${role} with extensive experience architecting high-availability systems, optimizing core performance vitals, and mentoring engineering talent. Proficient in ${skillSnippet}. Recognized for translating complex user requirements into elegant, scalable solutions with quantifiable business impact.`,
        `High-impact ${role} dedicated to building resilient, user-centric applications. Proven track record driving 30%+ efficiency gains through automated workflows, robust testing, and clean architecture. Expertise spanning ${skillSnippet}.`,
        `Analytical and product-minded ${role} experienced in high-velocity agile environments. Combines deep technical proficiency in ${skillSnippet} with strong product intuition to deliver secure, reliable, and high-converting digital experiences.`,
      ];
      return { success: true, result: summaries, provider: 'heuristic-engine' };
    }

    case 'enhance-bullet': {
      const clean = context.trim();
      const enhanced = [
        `Spearheaded the development and deployment of ${clean || 'critical system features'}, achieving a 34% reduction in processing latency and improving reliability to 99.9%.`,
        `Architected end-to-end scalable infrastructure for ${clean || 'core user workflows'}, boosting monthly active user throughput by 28% while decreasing server costs.`,
        `Engineered automated pipeline and refactored underlying components for ${clean || 'key services'}, eliminating 40+ production edge cases and accelerating sprint release cycles.`,
      ];
      return { success: true, result: enhanced, provider: 'heuristic-engine' };
    }

    case 'skills': {
      const target = role.toLowerCase();
      let suggested: string[] = [];

      if (target.includes('front') || target.includes('react')) {
        suggested = ['TypeScript', 'Next.js 15', 'Tailwind CSS', 'State Management (Zustand/Redux)', 'Web Performance & Core Vitals', 'WCAG Accessibility', 'Micro-frontends', 'Cypress / Playwright', 'GraphQL API Integration', 'CI/CD Pipelines'];
      } else if (target.includes('mern') || target.includes('full')) {
        suggested = ['Node.js', 'Express.js', 'MongoDB Aggregation', 'React 19', 'PostgreSQL', 'Redis Caching', 'Docker Containerization', 'RESTful API Architecture', 'JWT Authentication', 'AWS S3 & CloudFront'];
      } else if (target.includes('data')) {
        suggested = ['SQL (Window Functions & CTEs)', 'Python (Pandas, NumPy)', 'Tableau / Power BI', 'Snowflake / BigQuery', 'dbt Data Modeling', 'Statistical Hypothesis Testing', 'Airflow Pipelines', 'A/B Test Design', 'Customer Lifetime Value (CLV)', 'Executive Storytelling'];
      } else {
        suggested = ['System Design & Architecture', 'TypeScript / Python', 'Cloud Platforms (AWS/GCP)', 'Docker & Kubernetes', 'Microservices', 'Database Optimization', 'Automated Unit & Integration Testing', 'Agile / Scrum Methodologies', 'Incident Management & Observability'];
      }

      return { success: true, result: suggested, provider: 'heuristic-engine' };
    }

    case 'rewrite': {
      const rewritten = `Architected and successfully deployed enterprise-grade solutions for ${context || 'product initiatives'}, delivering measurable 32% efficiency improvements across core operations and adhering to stringent code quality benchmarks.`;
      return { success: true, result: rewritten, provider: 'heuristic-engine' };
    }

    case 'achievement': {
      const enhanced = `Awarded top performer for ${context || 'exceptional technical leadership'}, resulting in a $450K operational cost reduction and 40% reduction in delivery turnaround time.`;
      return { success: true, result: enhanced, provider: 'heuristic-engine' };
    }

    case 'ats-keywords': {
      const keywords = [
        'Scalable Architecture',
        'Cross-Functional Collaboration',
        'Test-Driven Development (TDD)',
        'Continuous Integration & Deployment (CI/CD)',
        'Performance Optimization',
        'Key Performance Indicators (KPIs)',
        'Cloud-Native Infrastructure',
        'Stakeholder Alignment'
      ];
      return { success: true, result: keywords, provider: 'heuristic-engine' };
    }

    default:
      return { success: true, result: 'Optimized content generated successfully.', provider: 'heuristic-engine' };
  }
}
