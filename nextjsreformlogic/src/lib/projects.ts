export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  techStack: string[];
  category: string;
  isFeatured: boolean;
  isConfidential?: boolean;
  challenge?: string;
  approach?: string;
  results?: string;
  testimonial?: {
    quote: string;
    name: string;
    title: string;
    org: string;
  };
}

export const projects: Project[] = [
  {
    slug: "ime-platform",
    title: "Enterprise Retail Platform",
    summary:
      "Revenue-driving platform serving major home improvement retailers with complex product configuration and financial integrations",
    description:
      "Primary architect and Subject Matter Expert for a customer-facing platform " +
      "powering home improvement installation services for national retailers. The system " +
      "handles complex multi-step product configuration wizards, real-time pricing calculations, " +
      "financial integrations with Synchrony Financial, and retailer onboarding automation.\n\n" +
      "Architected a Strangler Fig migration from a monolithic Umbraco 8 application to 5 " +
      "independent microservices using Domain-Driven Design, eliminating massive technical debt " +
      "and enabling SOC compliance. Built automated retailer onboarding that reduced setup time " +
      "from 2 days to 5 minutes.",
    techStack: [
      "C# / .NET",
      "Umbraco CMS",
      "Domain-Driven Design",
      "Microservices",
      "SQL Server",
      "Azure",
      "Docker",
      "CI/CD",
    ],
    category: "Enterprise",
    isFeatured: true,
    challenge:
      "A failing legacy platform that was losing money and suffering frequent production incidents. The monolithic architecture made changes risky and slow.",
    approach:
      "Implemented the Strangler Fig pattern to incrementally migrate from the monolith to microservices. Applied Domain-Driven Design to model core business logic independently. Established code review standards and CI/CD protocols across the team.",
    results:
      "4.5x revenue growth to 121% of profit targets. 90% reduction in production incidents. 75% improvement in page load times (60s to 5s). Retailer onboarding reduced from 2 days to 5 minutes.",
  },
  {
    slug: "scientific-games",
    title: "Gaming Platform Migration",
    summary:
      "Full system rewrite from legacy .NET 3.5 to modern Umbraco CMS for high-volume lottery and gaming systems",
    description:
      "Developed mission-critical features for high-volume lottery and gaming systems " +
      "serving millions of daily transactions. Architected a complete system rewrite migrating " +
      "legacy .NET 3.5 applications to modern Umbraco CMS 8 and .NET 4.8.\n\n" +
      "Consulted directly with executive stakeholders to define requirements for the " +
      "legacy CMS enhancements, ensuring the migration preserved critical business logic " +
      "while modernizing the technology stack.",
    techStack: [
      "C# / .NET 4.8",
      "Umbraco CMS 8",
      "SQL Server",
      "Legacy Migration",
    ],
    category: "Enterprise",
    isFeatured: false,
    challenge:
      "Aging .NET 3.5 applications that couldn't scale to handle growing transaction volumes and were increasingly difficult to maintain.",
    approach:
      "Complete system rewrite to Umbraco CMS 8 and .NET 4.8, preserving critical business logic while modernizing infrastructure. Direct executive stakeholder consultation throughout.",
    results:
      "Successfully migrated from .NET 3.5 to modern .NET 4.8 / Umbraco 8 platform. System continued serving millions of daily transactions with improved reliability.",
  },
  {
    slug: "rockrms-consulting",
    title: "RockRMS Church Solutions",
    summary:
      "Custom .NET solutions for church clients on the Rock RMS platform, including React/Redux group-finding functionality",
    description:
      "Delivered custom .NET solutions for multiple church clients on the Rock RMS " +
      "open-source church management platform at BEMA Information Technologies, a " +
      "professional RockRMS consulting firm.\n\n" +
      "Built a React/Redux/GraphQL solution for complex group-finding functionality, " +
      "enabling church members to discover and join small groups based on location, " +
      "interests, and availability. Managed client relationships through direct remote " +
      "consultations and requirements gathering.",
    techStack: [
      "C# / .NET",
      "RockRMS",
      "React",
      "Redux",
      "GraphQL",
      "Church Management",
    ],
    category: "Ministry",
    isFeatured: true,
    challenge:
      "Churches needed custom functionality beyond what RockRMS provides out of the box, particularly for member engagement and group discovery.",
    approach:
      "Built custom plugins and integrations on the RockRMS platform, combining .NET backend development with modern React frontends. Direct client consultations ensured solutions matched actual ministry workflows.",
    results:
      "Delivered functional group-finding system enabling church members to discover and join small groups. Multiple successful client engagements with ongoing consulting relationships.",
  },
  {
    slug: "taskforge",
    title: "TaskForge",
    summary: "Kanban-based project tracker with real-time collaboration",
    description:
      "A full-stack project management application demonstrating Domain-Driven Design at scale. " +
      "The domain layer models Boards, Columns, and Tasks as aggregate roots with rich invariants — " +
      "tasks enforce workflow state machines, columns maintain sort order integrity, and boards " +
      "coordinate cross-column operations via domain events.\n\n" +
      "The CQRS pipeline separates write operations (MediatR commands with FluentValidation) from " +
      "optimized read models served via denormalized query handlers. Real-time updates flow through " +
      "WebSocket connections, pushing board state changes to all connected clients instantly.\n\n" +
      "The Deno Fresh frontend renders the initial board server-side for instant load times, then " +
      "hydrates only the interactive Kanban island — keeping the JavaScript payload minimal while " +
      "delivering a rich drag-and-drop experience.",
    techStack: [
      "Deno Fresh 2",
      "C# 12",
      "CQRS / MediatR",
      "PostgreSQL",
      "WebSockets",
      "FluentValidation",
      "EF Core",
      "Docker",
    ],
    category: "Demo",
    isFeatured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
