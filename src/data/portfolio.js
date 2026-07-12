export const personal = {
  name: "Pragadeesh Elangaivendhan",
  title: "Software Engineer",
  location: "Chennai, India",
  email: "pragadeesh.e12@gmail.com",
  phone: "+91-9025244487",
  linkedin: "https://www.linkedin.com/in/pragadeesh-elangaivendhan",
  github: "https://github.com/pragadeeshe12-ops",
  summary:
    "Software Engineer with experience building scalable enterprise applications, distributed systems, and REST APIs using Python, Django, React, and TypeScript. Proven track record of delivering production-grade features, improving platform reliability, resolving critical production incidents, and developing automated testing solutions in Agile environments.",
};

export const skills = [
  {
    category: "Languages & Backend",
    items: ["Python", "SQL", "C", "C++", "Kotlin", "JavaScript", "TypeScript"],
  },
  {
    category: "Frontend Development",
    items: ["React", "TypeScript", "HTML", "CSS", "JavaScript (ES6+)"],
  },
  {
    category: "Backend & Distributed Systems",
    items: ["Django", "REST APIs", "GraphQL", "gRPC", "Celery", "Kafka"],
  },
  {
    category: "Databases",
    items: ["MySQL", "Relational Databases", "MongoDB", "Redis", "Schema Design"],
  },
  {
    category: "Testing & Automation",
    items: [
      "Karma",
      "Jest",
      "Python unittest",
      "Integration Testing",
      "API Testing",
      "Root Cause Analysis",
    ],
  },
  {
    category: "Tools & Practices",
    items: ["Git", "Agile", "Scrum"],
  },
  {
    category: "AI & Emerging Tech",
    items: [
      "LangChain",
      "RAG",
      "Hugging Face",
      "XGBoost",
      "ChatGPT",
      "GitHub Copilot",
      "Vector DB",
    ],
  },
];

export const experience = [
  {
    role: "Software Engineer",
    company: "Udemy",
    location: "Chennai",
    period: "2025 – Present",
    highlights: [
      "Designed India-specific GST taxation workflows integrating Adyen, Stripe, UPI, and Taxamo for regulatory compliance and seamless transactions.",
      "Shipped enterprise B2B features including goal-setting and learner monitoring dashboards for 50+ customers, driving 5–10% MAU growth.",
      "Built scalable backend services and REST APIs with Python and Django following code review and testing best practices.",
      "Delivered Regional Learning Path for Japan end-to-end — 12K enrollments on launch day, 13K+ total, projected $2.7M revenue growth.",
      "Contributed to AI-powered course search with RAG, GPT models, and prompt engineering for improved content discovery.",
    ],
  },
  {
    role: "Software Engineer (Intern)",
    company: "Udemy",
    location: "Chennai",
    period: "Jun 2024 – Dec 2024",
    highlights: [
      "Worked on enterprise translation pipelines and localization for international markets.",
      "Developed learner progress dashboards for organizational learning visibility and analytics.",
      "Built automated test suites with Karma and Jest, improving regression coverage and software quality.",
      "Participated in defect investigation, debugging, and release verification activities.",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech in Electronics and Computer Engineering",
    school: "SRM Institute of Science and Technology",
    period: "2024",
    detail: "CGPA: 8.9 / 10",
  },
  {
    degree: "Higher Secondary Education (Class XII)",
    school: "ST. Joseph Met. Hr. Sec. School",
    period: "2020",
    detail: "Percentage: 76%",
  },
  {
    degree: "Secondary Education (Class X)",
    school: "ST. Joseph Met. Hr. Sec. School",
    period: "2018",
    detail: "Percentage: 88.4%",
  },
];

export const projects = [
  {
    title: "Good Food",
    subtitle: "Mess Lunch Ordering Platform",
    description:
      "Full-stack office and mess lunch ordering web app. Students place daily meal orders, track history, and admins manage users via a dashboard with kitchen reports. Deployed with React on Vercel, Django REST API on Railway, and PostgreSQL on Supabase.",
    tech: [
      "React",
      "TypeScript",
      "Django",
      "REST APIs",
      "PostgreSQL",
      "Supabase",
      "Vercel",
      "Railway",
      "JWT",
    ],
    link: "https://github.com/pragadeeshe12-ops/good-food",
  },
  {
    title: "7-Day User Journey",
    subtitle: "Udemy Hackathon · Dec 2024",
    description:
      "Gamified onboarding journey addressing learner drop-off in the first 7 days. Features daily objectives, progress tracking, achievement badges, and milestone rewards with real-time visualization.",
    tech: ["Python", "Django", "React", "TypeScript", "REST APIs", "MySQL"],
    link: null,
  },
  {
    title: "Predict.it",
    subtitle: "Stock Market Prediction Platform",
    status: "In Progress",
    description:
      "ML-powered platform predicting stock price ranges using XGBoost. Includes automated data pipelines, Hugging Face model hosting, and GitHub Actions MLOps for continuous retraining and deployment.",
    tech: [
      "Python",
      "Django",
      "React",
      "TypeScript",
      "Supabase",
      "Hugging Face",
      "XGBoost",
      "GitHub Actions",
    ],
    link: "https://github.com/pragadeeshe12-ops/Predict.it",
  },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
