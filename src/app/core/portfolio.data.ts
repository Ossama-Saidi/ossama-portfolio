/**
 * All the portfolio content lives here, as typed data.
 * Components render it with @for, so changing a job or a project
 * never requires touching a template.
 */
export interface Profile {
  name: string;
  firstName: string;
  email: string;
  linkedin: string;
  location: string;
}
export interface NavLink { id: string; label: string; }
export interface Stat { value: number; label: string; }
export interface Job { period: string; title: string; place: string; summary: string; tags: string[]; }
export interface Project { source: string; title: string; subtitle: string; summary: string; tags: string[]; }
export interface SkillGroup { title: string; items: string[]; }
export interface Degree { title: string; school: string; years: string; }
export interface TerminalSegment { text: string; prompt?: boolean; }
export interface TerminalLine { segs: TerminalSegment[]; ok?: boolean; dim?: boolean; }

export const PROFILE: Profile = {
  name: 'Ossama Saidi',
  firstName: 'OSSAMA',
  email: 'ossama.saidi.eng@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ossama-saidi',
  location: 'Oujda, Morocco',
};

export const NAV_LINKS: NavLink[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
];

export const ROLES: string[] = [
  'Full Stack Engineer',
  'Angular · Next.js · React',
  'NestJS (Fastify) · Symfony · Laravel · Spring Boot',
  'PostgreSQL · MySQL · Oracle · SQL Server · MongoDB · Redis',
  'Elasticsearch · Prisma · TypeORM · Hibernate · EF Core',
  'Microservices & Event-Driven (RabbitMQ)',
  'CI/CD & DevOps (Docker · Kubernetes · Jenkins)',
];

export const STATS: Stat[] = [
  { value: 3, label: 'internships' },
  { value: 4, label: 'academic projects' },
  { value: 3, label: 'languages spoken' },
];

export const TECH_MARQUEE: string[] = [
  'Angular', 'NestJS', 'Fastify', 'Next.js', 'Symfony', 'Laravel', 'Spring Boot',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Oracle DB', 'SQL Server', 'Elasticsearch',
  'Prisma', 'TypeORM', 'Doctrine ORM', 'Eloquent ORM', 'Hibernate', 'EF Core', 'Sequelize',
  'Docker', 'Kubernetes', 'RabbitMQ', 'CI/CD',
];

export const TERMINAL: TerminalLine[] = [
  { segs: [{ text: '$ ', prompt: true }, { text: 'whoami' }] },
  { segs: [{ text: 'ossama saidi, full stack engineer' }], ok: true },
  { segs: [{ text: '$ ', prompt: true }, { text: 'cat stack.txt' }] },
  { segs: [{ text: 'Angular · Next.js · NestJS (Fastify) · Symfony · Laravel · Spring Boot' }], dim: true },
  { segs: [{ text: '$ ', prompt: true }, { text: 'cat data_layer.txt' }] },
  { segs: [{ text: 'PostgreSQL · MySQL · Oracle · SQL Server · MongoDB · Redis · Elasticsearch' }], dim: true },
  { segs: [{ text: 'Prisma · TypeORM · Doctrine · Eloquent · Hibernate · EF Core · Sequelize' }], ok: true },
  { segs: [{ text: '$ ', prompt: true }, { text: './ship --pipeline' }] },
  { segs: [{ text: '✓ build  ✓ test  ✓ sonarqube  ✓ docker  ✓ deploy' }], ok: true },
];

export const JOBS: Job[] = [
  {
    period: 'Mar 2026 – Aug 2026',
    title: 'IT Intern, Final Year Project',
    place: 'Oriotel, Oujda',
    summary:
      'Designed and developed a global digital transformation solution: a SaaS ERP system for telecom operations built on a microservices architecture (NestJS Fastify, Next.js, Laravel), with MySQL, Oracle Database, Redis, and Elasticsearch, plus a showcase website for Oriotel.',
    tags: ['SaaS ERP', 'Microservices', 'NestJS (Fastify)', 'Laravel', 'Oracle DB', 'MySQL', 'Redis'],
  },
  {
    period: 'Sep 2025 – Oct 2025',
    title: 'PHP Developer Intern',
    place: 'SQLI, Oujda',
    summary:
      'Built a log management web application to read, filter and analyze .log files, with an intuitive interface, Doctrine ORM, and structured storage in PostgreSQL and Elasticsearch.',
    tags: ['PHP', 'Symfony', 'Doctrine ORM', 'Twig', 'PostgreSQL', 'Elasticsearch'],
  },
  {
    period: 'Jul 2025 – Sep 2025',
    title: 'Java Developer Intern',
    place: 'Ministry of Health, Mohammed VI Hospital Center',
    summary:
      'Built a meeting room reservation application with three interfaces (user, secretary, admin) covering requests, schedules and resources, using Spring Boot, Hibernate / JPA, and Microsoft SQL Server.',
    tags: ['Spring Boot', 'Hibernate / JPA', 'Next.js', 'SQL Server'],
  },
];

export const FEATURED_PROJECT: Project = {
  source: 'End-of-Year Project, EHEI',
  title: 'EHEI Connect',
  subtitle: 'An educational social platform',
  summary:
    'A modular social network for students and teachers with real-time messaging, SSE notifications and advanced search. Microservices expose REST APIs built with NestJS (Fastify) and communicate through RabbitMQ in an event-driven architecture with Prisma ORM, MySQL, Redis, and Elasticsearch, monitored with Prometheus and Grafana.',
  tags: [
    'NestJS', 'Fastify', 'Next.js', 'RabbitMQ', 'Prisma ORM',
    'MySQL', 'Redis', 'Elasticsearch', 'WebSocket', 'Prometheus', 'Grafana',
  ],
};

export const PROJECTS: Project[] = [
  {
    source: 'Bachelor’s Final Project, UMP',
    title: 'AttendMe',
    subtitle: 'An attendance management system',
    summary: 'A mobile application that manages class attendance through a QR code system, powered by an Express / NestJS backend and MongoDB with TypeORM.',
    tags: ['React Native', 'Expo', 'NestJS', 'MongoDB', 'TypeORM'],
  },
  {
    source: 'CRM Project, EHEI',
    title: 'Symfony CRM',
    subtitle: 'Client and invoice management',
    summary: 'A robust CRM system for managing clients and invoices, built with Symfony and Doctrine ORM, backed by PostgreSQL and delivered through an automated CI/CD pipeline.',
    tags: ['Symfony', 'Doctrine ORM', 'PostgreSQL', 'Jenkins', 'Docker', 'SonarQube', 'Ansible'],
  },
  {
    source: 'IoT Project, EHEI',
    title: 'Cold Chain Monitoring',
    subtitle: 'Intelligent laboratory monitoring',
    summary:
      'Temperature and humidity acquisition with an ESP8266 and DHT11 sensor. Alerts through Telegram, WhatsApp and Twilio, with SQLite / PostgreSQL persistence, deployed on Render.',
    tags: ['Django REST', 'React', 'SQLite', 'PostgreSQL', 'Chart.js', 'ESP8266', 'Twilio'],
  },
];

export const SKILLS: SkillGroup[] = [
  {
    title: 'Frontend Frameworks & Web',
    items: ['Angular (v17/18/19)', 'Next.js', 'React', 'React Native', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Tailwind CSS'],
  },
  {
    title: 'Backend Frameworks & Microservices',
    items: ['NestJS (Fastify & Express)', 'Symfony', 'Laravel', 'Spring Boot', 'ASP.NET Core', 'Express.js', 'FastAPI', 'Django REST'],
  },
  {
    title: 'Databases & Search Engines',
    items: ['PostgreSQL', 'MySQL', 'SQLite', 'Oracle Database', 'Microsoft SQL Server', 'MongoDB', 'Redis', 'Elasticsearch'],
  },
  {
    title: 'ORMs & Data Persistence',
    items: ['Prisma', 'TypeORM', 'Doctrine ORM', 'Eloquent ORM', 'Hibernate / JPA', 'Entity Framework (EF Core)', 'Sequelize'],
  },
  {
    title: 'DevOps & Containerization',
    items: ['Docker', 'Kubernetes', 'CI/CD (Jenkins, GitHub Actions)', 'SonarQube', 'Ansible', 'Git / GitHub', 'Linux / Bash'],
  },
  {
    title: 'Architecture & Observability',
    items: ['Microservices Architecture', 'REST & GraphQL APIs', 'RabbitMQ (Event-Driven)', 'WebSockets & SSE', 'Prometheus & Grafana'],
  },
];

export const DEGREES: Degree[] = [
  { title: 'State Engineering Degree in Computer Engineering', school: 'École des Hautes Études d’Ingénierie (EHEI)', years: '2024–2026' },
  { title: 'Bachelor’s Degree in Mathematics and Computer Science', school: 'Mohammed First University', years: '2022–2024' },
  { title: 'DEUG in Mathematics and Computer Science', school: 'Mohammed First University', years: '2020–2022' },
  { title: 'Baccalaureate in Mathematical Sciences', school: 'Lycée Jaber Ibn Hayyan', years: '2019–2020' },
];

export const LANGUAGES: string[] = ['Arabic: native', 'French: fluent (C1)', 'English: intermediate (B2)'];

export const STUDENT_LIFE: string[] = [
  'Active member of the Student Council',
  'Member of the AI & New Technologies Club',
  'Organizer of the 2026 Career Forum',
  'Organizer of the 2025 graduation ceremony',
];
