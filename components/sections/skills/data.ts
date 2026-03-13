import { DetailedSkill, SkillCategory } from "@/types/HeroSection";

export const skillCategories: SkillCategory[] = [
  { title: "MERN Stack", icon: "Server" },
  { title: "Frontend", icon: "Laptop" },
  { title: "Backend", icon: "Code" },
  { title: "AI Engineering", icon: "Brain" },
  { title: "DevOps & Cloud", icon: "Cloud" },
  { title: "Database & Caching", icon: "Database" },
  { title: "Testing", icon: "TestTube" },
  { title: "Tools & Workflow", icon: "Wrench" },
];

export const detailedSkills: DetailedSkill[] = [
  { name: "JavaScript (ES6+)", percentage: 95 },
  { name: "TypeScript", percentage: 90 },
  { name: "Python", percentage: 85 },

  { name: "React.js", percentage: 90 },
  { name: "Next.js", percentage: 90 },
  { name: "Redux Toolkit / Zustand", percentage: 85 },
  { name: "Tailwind CSS", percentage: 90 },
  { name: "ShadCN / MUI", percentage: 80 },
  { name: "HTML5", percentage: 95 },
  { name: "CSS3 / SCSS", percentage: 90 },

  { name: "Node.js", percentage: 90 },
  { name: "Express.js", percentage: 85 },
  { name: "REST API Design", percentage: 90 },
  { name: "GraphQL", percentage: 75 },
  { name: "Authentication (JWT / OAuth)", percentage: 85 },
  { name: "WebSockets / Real-time Apps", percentage: 75 },

  { name: "MongoDB", percentage: 85 },
  { name: "PostgreSQL", percentage: 80 },
  { name: "MySQL", percentage: 75 },
  { name: "Prisma ORM", percentage: 85 },
  { name: "Redis", percentage: 70 },

  { name: "LangChain", percentage: 85 },
  { name: "AI API Integration", percentage: 85 },
  { name: "OpenAI API", percentage: 85 },
  { name: "Vector Databases (Pinecone)", percentage: 75 },
  { name: "Embeddings & RAG", percentage: 80 },
  { name: "Prompt Engineering", percentage: 85 },
  { name: "LLM App Development", percentage: 80 },

  { name: "Docker", percentage: 80 },
  { name: "Docker Compose", percentage: 75 },
  { name: "CI/CD (GitHub Actions)", percentage: 80 },
  { name: "AWS (EC2, S3)", percentage: 75 },
  { name: "Vercel Deployment", percentage: 90 },
  { name: "Nginx", percentage: 70 },

  { name: "Jest", percentage: 80 },
  { name: "React Testing Library", percentage: 75 },
  { name: "Cypress", percentage: 70 },

  { name: "Git & GitHub", percentage: 95 },
  { name: "Postman", percentage: 90 },
  { name: "VS Code", percentage: 95 },
  { name: "Figma (Collaboration)", percentage: 70 },
  { name: "Agile / Scrum", percentage: 80 },
];