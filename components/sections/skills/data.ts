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
  { name: "JavaScript (ES6+)", category: "Server", tier: "Expert" },
  { name: "Python", category: "Server", tier: "Proficient" },

  { name: "React.js", category: "Laptop", tier: "Expert" },
  { name: "Next.js", category: "Laptop", tier: "Expert" },
  { name: "Redux Toolkit / Zustand", category: "Laptop", tier: "Proficient" },
  { name: "Tailwind CSS", category: "Laptop", tier: "Expert" },
  { name: "ShadCN / MUI", category: "Laptop", tier: "Proficient" },
  { name: "HTML5", category: "Laptop", tier: "Expert" },
  { name: "CSS3 / SCSS", category: "Laptop", tier: "Expert" },

  { name: "Node.js", category: "Code", tier: "Expert" },
  { name: "Express.js", category: "Code", tier: "Proficient" },
  { name: "REST API Design", category: "Code", tier: "Expert" },
  { name: "GraphQL", category: "Code", tier: "Proficient" },
  { name: "Authentication (JWT / OAuth)", category: "Code", tier: "Proficient" },
  { name: "WebSockets / Real-time Apps", category: "Code", tier: "Proficient" },

  { name: "MongoDB", category: "Database", tier: "Proficient" },
  { name: "PostgreSQL", category: "Database", tier: "Proficient" },
  { name: "MySQL", category: "Database", tier: "Proficient" },
  { name: "Prisma ORM", category: "Database", tier: "Proficient" },
  { name: "Redis", category: "Database", tier: "Familiar" },

  { name: "LangChain", category: "Brain", tier: "Proficient" },
  { name: "AI API Integration", category: "Brain", tier: "Proficient" },
  { name: "OpenAI API", category: "Brain", tier: "Proficient" },
  { name: "Vector Databases (Pinecone)", category: "Brain", tier: "Familiar" },
  { name: "Embeddings & RAG", category: "Brain", tier: "Proficient" },
  { name: "Prompt Engineering", category: "Brain", tier: "Proficient" },
  { name: "LLM App Development", category: "Brain", tier: "Proficient" },

  { name: "Docker", category: "Cloud", tier: "Proficient" },
  { name: "Docker Compose", category: "Cloud", tier: "Proficient" },
  { name: "CI/CD (GitHub Actions)", category: "Cloud", tier: "Proficient" },
  { name: "AWS (EC2, S3)", category: "Cloud", tier: "Familiar" },
  { name: "Vercel Deployment", category: "Cloud", tier: "Expert" },


  { name: "Jest", category: "TestTube", tier: "Proficient" },
  { name: "React Testing Library", category: "TestTube", tier: "Proficient" },
  { name: "Cypress", category: "TestTube", tier: "Familiar" },

  { name: "Git & GitHub", category: "Wrench", tier: "Expert" },
  { name: "Postman", category: "Wrench", tier: "Expert" },

  { name: "Figma (Collaboration)", category: "Wrench", tier: "Familiar" },
  { name: "Agile / Scrum", category: "Wrench", tier: "Proficient" },
];