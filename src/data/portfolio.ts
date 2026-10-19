export interface ProjectScreenshot {
  src: string
  title: string
  caption: string
  width: number
  height: number
  srcSet?: string
  thumbnail?: string
}

export interface Project {
  slug: string
  number: string
  title: string
  subtitle: string
  category: string
  year: string
  context: string
  stage: string | null
  description: string
  problem: string
  solution: string
  features: string[]
  technologies: string[]
  roles: string[]
  highlights: string[]
  flow: { title: string; description: string }[]
  github: string | null
  demo: string | null
  image: string
  imageAlt: string
  gallery?: ProjectScreenshot[]
  featured: boolean
}

export const portfolio = {
  "name": "Ramez Ahmad ALMAAYE'H",
  "role": "Full-Stack Developer | Software Engineer",
  "location": "Madaba, Jordan",
  "phone": "+962 7 7914 9585",
  "phoneHref": "tel:+962779149585",
  "email": "ramezmayaa@gmail.com",
  "heroHeading": [
    "Engineering",
    "Thoughtful Digital",
    "Experiences."
  ],
  "introduction": "I'm a Software Engineering graduate and Full-Stack Developer building responsive, database-driven applications with React, TypeScript, ASP.NET Core, and modern databases. I focus on secure workflows, clear interfaces, and reliable software.",
  "about": [
    "I'm a Software Engineering graduate and Full-Stack Developer with hands-on experience building responsive, database-driven web applications using React, TypeScript, C#, ASP.NET Core, SQL Server, PostgreSQL, Supabase, and Node.js.",
    "My experience includes developing secure authentication and authorization workflows, integrating RESTful APIs, building interactive user interfaces, and implementing software testing processes.",
    "I also apply software engineering concepts including SOLID principles, design patterns, Clean/Onion Architecture, requirements analysis, and modern development workflows involving Docker and CI/CD."
  ],
  "focus": [
    "Full-Stack Development",
    "Software Engineering",
    "Requirements Engineering",
    "Software Architecture",
    "API and Database Development",
    "Testing and Quality Assurance"
  ],
  "strengths": [
    "Problem Solving",
    "Team Leadership",
    "Collaboration",
    "Communication",
    "Time Management",
    "Attention to Detail",
    "Adaptability"
  ],
  "languages": [
    "Arabic — Native",
    "English — Good Working Proficiency"
  ],
  "social": {
    "linkedin": "https://www.linkedin.com/in/ramez-al-maayah-b076ba425",
    "github": "https://github.com/RamezAlmaayah"
  },
  "cv": "/ramez-ahmad-resume.pdf" as string | null,
  "cvAsset": "public/ramez-ahmad-resume.pdf",
  "skills": [
    {
      "name": "Programming Languages",
      "icon": "code",
      "items": [
        "C#",
        "JavaScript (ES6+)",
        "TypeScript",
        "SQL",
        "Python",
        "PHP"
      ]
    },
    {
      "name": "Frontend Development",
      "icon": "layout",
      "items": [
        "React.js",
        "React Hooks",
        "React Router",
        "Tailwind CSS",
        "Bootstrap",
        "HTML5",
        "CSS3",
        "Razor",
        "AJAX",
        "Vite",
        "Motion"
      ]
    },
    {
      "name": "Backend Development & APIs",
      "icon": "server",
      "items": [
        "ASP.NET Core MVC",
        "ASP.NET Core Web API",
        "Node.js",
        "REST APIs",
        "Entity Framework Core",
        "LINQ",
        "Swagger / OpenAPI"
      ]
    },
    {
      "name": "Databases & Cloud",
      "icon": "database",
      "items": [
        "SQL Server",
        "PostgreSQL",
        "Supabase",
        "MySQL",
        "MongoDB",
        "Supabase Auth",
        "Row Level Security (RLS)"
      ]
    },
    {
      "name": "Authentication, Security & Architecture",
      "icon": "shield",
      "items": [
        "ASP.NET Core Identity",
        "JWT Authentication",
        "Cookie Authentication",
        "Role-Based Access Control (RBAC)",
        "SOLID Principles",
        "Design Patterns",
        "Clean Architecture",
        "Onion Architecture"
      ]
    },
    {
      "name": "DevOps & Development Tools",
      "icon": "terminal",
      "items": [
        "Docker",
        "Docker Compose",
        "GitHub Actions",
        "CI/CD",
        "Git",
        "GitHub",
        "Jira",
        "Postman",
        "Visual Studio",
        "Visual Studio Code"
      ]
    },
    {
      "name": "Testing & Methodologies",
      "icon": "testing",
      "items": [
        "Unit Testing",
        "Integration Testing",
        "API Testing",
        "Security Testing",
        "Manual Testing",
        "Agile / Scrum",
        "Requirements Analysis"
      ]
    }
  ],
  "experience": [
    {
      "company": "The Hope International",
      "role": "Full-Stack Development Intern",
      "duration": "July 2026 – September 2026",
      "description": "Developed a Moodle Excel Management System Dashboard for bulk student, course, teacher, and group administration using PHP, MySQL, and PhpSpreadsheet.",
      "responsibilities": [
        "Developed Excel-based administrative workflows.",
        "Supported student, course, teacher, and group management.",
        "Configured local application and database environments.",
        "Validated key administrative workflows using functional and integration testing."
      ]
    },
    {
      "company": "DOT Jordan",
      "role": "Full-Stack Development Intern",
      "duration": "July 2026 – September 2026",
      "description": "Contributed to an ongoing full-stack web application using React.js, JavaScript, Node.js, and MongoDB, including responsive frontend development and database integration.",
      "responsibilities": [
        "Worked on responsive React interfaces.",
        "Contributed to frontend/backend workflows.",
        "Worked with Node.js and MongoDB.",
        "Supported debugging and database integration.",
        "Used Git and GitHub for version control and collaboration."
      ]
    }
  ],
  "education": {
    "degree": "Bachelor of Science in Software Engineering",
    "school": "Middle East University",
    "location": "Jordan",
    "duration": "2022–2026"
  },
  "training": [
    {
      "title": "ASP.NET Training",
      "provider": "The Hope International"
    },
    {
      "title": "Oracle APEX Training",
      "provider": "The Hope International"
    },
    {
      "title": "Agile, Scrum and Waterfall",
      "provider": "Middle East University"
    }
  ],
  "contactDescription": "I’m open to opportunities where I can contribute to meaningful software projects, collaborate with ambitious teams, and continue growing as a Full-Stack Developer and Software Engineer."
}

export const projects: Project[] = [
  {
    "slug": "unseen-jo",
    "number": "01",
    "title": "Unseen Jo",
    "subtitle": "Tourism Discovery Platform",
    "category": "Full-Stack Web Application / Tourism Technology",
    "year": "2026",
    "context": "Tourism Discovery Platform",
    "stage": null,
    "featured": true,
    "description": "Unseen Jo is a responsive tourism discovery platform that helps visitors and residents explore destinations and local experiences across Jordan through personalized recommendations, interactive maps, and location-based discovery.",
    "problem": "Discovering suitable tourism experiences can require users to search across multiple platforms and manually compare places based on budget, interests, time, accessibility, and location.",
    "solution": "Unseen Jo simplifies destination discovery through a personalized recommendation system and interactive exploration experience, helping users find places that match their needs and travel preferences.",
    "roles": [],
    "features": [
      "Personalized Surprise Me recommendations based on interests, budget, available time, location, transportation, and travel group preferences",
      "Supabase Authentication and user-specific authentication flows",
      "PostgreSQL relational data with Supabase integration",
      "Row Level Security (RLS)",
      "Interactive maps with React Leaflet and OpenStreetMap",
      "Location-based exploration",
      "Reusable React components",
      "Responsive Tailwind CSS interface",
      "Motion animations and interactive components",
      "Lazy loading",
      "Route-based code splitting",
      "Optimized images"
    ],
    "technologies": [
      "React.js",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Supabase",
      "Supabase Auth",
      "PostgreSQL",
      "React Router",
      "React Leaflet",
      "OpenStreetMap",
      "Motion",
      "Vite"
    ],
    "highlights": [
      "Relational data modeling with PostgreSQL.",
      "Row Level Security for database access.",
      "Supabase Authentication integration.",
      "Preference-based recommendations; not a trained machine-learning model.",
      "Interactive maps with React Leaflet and OpenStreetMap.",
      "Reusable React components and a responsive interface.",
      "Frontend performance optimization through lazy loading, route-based code splitting, and optimized images."
    ],
    "flow": [
      {
        "title": "Personalize",
        "description": "Choose interests, budget, time, location, transportation, and travel group preferences."
      },
      {
        "title": "Discover",
        "description": "Explore preference-based Surprise Me recommendations and nearby destinations."
      },
      {
        "title": "Explore",
        "description": "Use interactive React Leaflet maps and OpenStreetMap to explore Jordan."
      },
      {
        "title": "Connect",
        "description": "User-specific authentication flows backed by Supabase Auth, PostgreSQL, and Row Level Security."
      }
    ],
    "github": null,
    "demo": null,
    "image": "/projects/unseen-jo/homepage.png",
    "imageAlt": "Unseen Jo homepage with a Jordan landscape, exploration links, and the destination collection empty state.",
    "gallery": [
      {
        "src": "/projects/unseen-jo/homepage.png",
        "srcSet": "/projects/unseen-jo/homepage-640.webp 640w, /projects/unseen-jo/homepage-960.webp 960w, /projects/unseen-jo/homepage.webp 1362w",
        "thumbnail": "/projects/unseen-jo/homepage-320.webp",
        "title": "Homepage",
        "caption": "A scenic introduction to Jordan with Start Exploring and Explore Map links. The captured destination collection shows its unpublished-content empty state.",
        "width": 1362,
        "height": 766
      },
      {
        "src": "/projects/unseen-jo/explore-map.png",
        "srcSet": "/projects/unseen-jo/explore-map-640.webp 640w, /projects/unseen-jo/explore-map-960.webp 960w, /projects/unseen-jo/explore-map.webp 1362w",
        "thumbnail": "/projects/unseen-jo/explore-map-320.webp",
        "title": "Explore and Map",
        "caption": "Destination search and interest filters alongside a map of Jordan. This capture shows zero published destinations and the corresponding empty state.",
        "width": 1362,
        "height": 764
      },
      {
        "src": "/projects/unseen-jo/surprise-me-preferences.png",
        "srcSet": "/projects/unseen-jo/surprise-me-preferences-640.webp 640w, /projects/unseen-jo/surprise-me-preferences-960.webp 960w, /projects/unseen-jo/surprise-me-preferences.webp 1361w",
        "thumbnail": "/projects/unseen-jo/surprise-me-preferences-320.webp",
        "title": "Surprise Me Preferences",
        "caption": "Travel preferences for location, time, budget, interests, transportation, and group. The captured demo explicitly opens a fixed Figma sample rather than personalized recommendations.",
        "width": 1361,
        "height": 767
      }
    ]
  },
  {
    "slug": "planora",
    "number": "02",
    "title": "Planora",
    "subtitle": "Project Management System",
    "category": "Full-Stack Software Engineering",
    "year": "2026",
    "context": "Graduation Project",
    "stage": null,
    "featured": true,
    "description": "Planora is a Scrum-based project management platform designed to support structured software development through sprint planning, task management, interactive Kanban boards, role-based authorization, and quality assurance workflows.",
    "problem": "Software teams require centralized tools to coordinate requirements, track development tasks, manage sprint progress, and maintain visibility across different project roles. Fragmented workflows can make project tracking and quality assurance more difficult.",
    "solution": "Planora brings essential project management activities into a unified platform, supporting Scrum-based planning, task tracking, team collaboration, and structured quality assurance.",
    "roles": [
      "Team Leader",
      "Full-Stack Developer",
      "Requirements Analysis",
      "UI/UX Design"
    ],
    "features": [
      "Sprint Backlog",
      "Kanban Board",
      "Task Management",
      "Scrum Workflows",
      "QA Review",
      "QA Pass/Fail",
      "Role-Based Authorization",
      "ASP.NET Core Identity",
      "Drag-and-Drop Task Updates",
      "AJAX Interactions",
      "Server-Side Validation",
      "Unit Testing",
      "Integration Testing",
      "Security Testing"
    ],
    "technologies": [
      "C#",
      "ASP.NET Core MVC",
      "Entity Framework Core",
      "SQL Server",
      "Razor",
      "JavaScript",
      "AJAX",
      "ASP.NET Core Identity"
    ],
    "highlights": [
      "Structured authorization across multiple application roles.",
      "Database-driven task management with interactive frontend behavior.",
      "Quality assurance integrated into the development workflow.",
      "Clean and Onion Architecture principles."
    ],
    "flow": [
      {
        "title": "Plan",
        "description": "Product backlog and Scrum sprint planning."
      },
      {
        "title": "Build",
        "description": "Role-based task assignment and Kanban tracking."
      },
      {
        "title": "Review",
        "description": "QA review with pass/fail processing."
      },
      {
        "title": "Complete",
        "description": "Task status and automatic backlog completion."
      }
    ],
    "github": "https://github.com/RamezAlmaayah/Planora-Project-Management-System",
    "demo": "https://planora.dynv6.net/",
    "image": "/work/planora-dashboard.png",
    "imageAlt": "Planora admin dashboard showing project overview, task activity, progress, and project statuses.",
    "gallery": [
      {
        "src": "/work/planora-dashboard.png",
        "title": "Admin Dashboard",
        "caption": "Project overview, task activity, project progress, and planning, active, completed, and archived statuses.",
        "width": 1360,
        "height": 767
      },
      {
        "src": "/work/planora-analytics.png",
        "title": "Project Analytics",
        "caption": "Task distribution, project progress, issues overview, and QA pass/fail results across the workspace.",
        "width": 1360,
        "height": 767
      }
    ]
  },
  {
    "slug": "caeloterra",
    "number": "03",
    "title": "CaeloTerra",
    "subtitle": "NASA Space Apps 2026",
    "category": "Climate Technology / Decision Support",
    "year": "2026",
    "context": "NASA Space Apps 2026",
    "stage": "IN DEVELOPMENT",
    "featured": true,
    "description": "CaeloTerra is a climate-resilient crop-rotation decision-support application designed to combine NASA Earth-observation data with agricultural inputs to support multi-season planning and explainable crop-rotation recommendations.",
    "problem": "Agricultural planning must account for changing climate conditions, water availability, crop history, and competing farm priorities. Evaluating these factors together can be difficult without structured decision-support tools.",
    "solution": "CaeloTerra is being developed to combine environmental observations and farm-specific inputs into multi-season crop-rotation scenarios, with climate stress testing, robustness evaluation, and explainable recommendations.",
    "roles": [],
    "features": [
      "React frontend architecture",
      "ASP.NET Core Web API backend architecture",
      "NASA POWER data integration design",
      "GPM IMERG data integration design",
      "Farm and climate inputs",
      "Multi-season rotation logic",
      "Robustness scoring",
      "Explainable recommendations"
    ],
    "technologies": [
      "React.js",
      "C#",
      "ASP.NET Core Web API",
      "Python",
      "SQL",
      "REST APIs",
      "NASA POWER",
      "GPM IMERG"
    ],
    "highlights": [
      "React frontend and ASP.NET Core Web API backend.",
      "Designed to integrate NASA environmental datasets.",
      "Farm-specific inputs inform proposed multi-season scenarios.",
      "Climate stress testing and explainability are development goals, not validated outcomes."
    ],
    "flow": [
      {
        "title": "Observe",
        "description": "Planned NASA POWER and GPM IMERG data integration."
      },
      {
        "title": "Contextualize",
        "description": "Farm, soil, irrigation, crop history, and farmer priorities."
      },
      {
        "title": "Evaluate",
        "description": "Proposed rotation scenarios, climate stress tests, and robustness scoring."
      },
      {
        "title": "Explain",
        "description": "Planned transparent recommendations for agricultural planning."
      }
    ],
    "github": null,
    "demo": null,
    "image": "/work/caeloterra.svg",
    "imageAlt": "Illustrative aerial field geometry and Earth-observation orbit lines, representing the CaeloTerra concept."
  },
  {
    "slug": "moodle-dashboard",
    "number": "04",
    "title": "Moodle Excel Management Dashboard",
    "subtitle": "Less repetition. More clarity.",
    "category": "Learning Management / Administrative Automation",
    "year": "2026",
    "context": "The Hope International Internship",
    "stage": null,
    "featured": false,
    "description": "A custom administration dashboard developed to streamline and automate Moodle management tasks through Excel-based data workflows.",
    "problem": "Managing students, courses, teachers, and learning groups through repetitive administrative processes can require substantial manual effort.",
    "solution": "The project provides Excel-driven administrative workflows for managing Moodle-related data and course structures through a centralized dashboard.",
    "roles": [],
    "features": [
      "Excel-based student administration",
      "Course management workflows",
      "Teacher-related data operations",
      "Group management",
      "Course structure management",
      "Moodle integration",
      "PHP and MySQL processing",
      "PhpSpreadsheet for Excel handling",
      "Local server and database configuration",
      "Functional testing",
      "Integration testing"
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "Moodle",
      "PhpSpreadsheet",
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "highlights": [
      "Excel-driven workflows for Moodle-related administration.",
      "PhpSpreadsheet handles Excel data with PHP and MySQL processing.",
      "Local Moodle, database, and server configuration.",
      "Functional and integration testing."
    ],
    "flow": [
      {
        "title": "Excel data",
        "description": "Structured student, teacher, course, and group information."
      },
      {
        "title": "Process",
        "description": "Excel handling with PhpSpreadsheet and PHP."
      },
      {
        "title": "Manage",
        "description": "Centralized Moodle administration and MySQL data operations."
      },
      {
        "title": "Verify",
        "description": "Functional and integration testing of workflows."
      }
    ],
    "github": null,
    "demo": null,
    "image": "/work/moodle.svg",
    "imageAlt": "Illustrative document-to-data workflow showing Excel administration connected to Moodle."
  },
  {
    "slug": "gym-management",
    "number": "05",
    "title": "Gym Management System",
    "subtitle": "Operations, connected.",
    "category": "Full-Stack Web Application",
    "year": "",
    "context": "Personal Project",
    "stage": null,
    "featured": false,
    "description": "A web-based gym management application designed to organize operational information for members, memberships, trainers, payments, attendance, and fitness classes.",
    "problem": "",
    "solution": "",
    "roles": [],
    "features": [
      "Members",
      "Memberships",
      "Trainers",
      "Payments",
      "Attendance",
      "Classes"
    ],
    "technologies": [
      "C#",
      "ASP.NET Core MVC",
      "Entity Framework Core",
      "SQL Server",
      "Razor",
      "JavaScript",
      "AJAX"
    ],
    "highlights": [
      "API testing with Postman."
    ],
    "flow": [],
    "github": null,
    "demo": null,
    "image": "/work/gym.svg",
    "imageAlt": "Abstract geometric illustration representing connected gym operations."
  }
]

export const unseenDetails = {
  "preferences": [
    "Interests",
    "Budget",
    "Available time",
    "Location",
    "Transportation",
    "Travel group preferences"
  ],
  "security": [
    "Supabase Authentication",
    "User-specific authentication flows",
    "PostgreSQL relational data modeling",
    "Row Level Security (RLS)"
  ],
  "interface": [
    "React Leaflet interactive maps",
    "OpenStreetMap",
    "Location-based exploration",
    "Reusable React components",
    "Responsive Tailwind CSS interface",
    "Motion animations"
  ],
  "performance": [
    "Lazy loading",
    "Route-based code splitting",
    "Optimized images"
  ],
  "value": "The implemented platform combines preference-based discovery, interactive maps, and secure user-specific flows. Recommendations use travel preferences; no trained machine-learning model is claimed."
}

export const navigation = [
  {
    "id": "home",
    "label": "Home"
  },
  {
    "id": "about",
    "label": "About"
  },
  {
    "id": "skills",
    "label": "Expertise"
  },
  {
    "id": "projects",
    "label": "Projects"
  },
  {
    "id": "experience",
    "label": "Experience"
  },
  {
    "id": "contact",
    "label": "Contact"
  }
]
