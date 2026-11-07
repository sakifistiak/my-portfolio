export type ProjectCategory = 'all' | 'saas' | 'web' | 'infrastructure' | 'bot' | 'erp';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  tags: string[];
  technologies: string[];
  status: 'In Active Development' | 'Production / Internal' | 'Deployed / Commercial' | 'Concept & Prototype' | 'Infrastructure Operations';
  statusColor: 'emerald' | 'blue' | 'amber' | 'purple';
  featured: boolean;
  architectureHighlights: string[];
  keyFeatures: string[];
  links?: {
    github?: string;
    live?: string;
    demo?: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface TechItem {
  name: string;
  category: 'Backend' | 'Frontend' | 'Database' | 'Infrastructure & DevOps' | 'Tools & Platforms';
  proficiency: 'Working Daily' | 'Proficient' | 'Active Exploration';
  iconName: string;
  description: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  type: 'Work Experience' | 'Education' | 'Milestone';
  description: string;
  skills: string[];
  highlights: string[];
  current?: boolean;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
