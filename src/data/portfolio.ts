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
  details?: { title: string; items: string[] }[]
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
  "introduction": "I'm a Software Engineering graduate building full-stack web applications with C#, ASP.NET Core, React.js, Node.js, and relational and NoSQL databases. I'm seeking a Junior Full-Stack Developer or Software Engineer opportunity.",
  "about": [
    "I'm a Software Engineering graduate with hands-on experience developing full-stack web applications using C#, ASP.NET Core, React.js, Node.js, and relational and NoSQL databases.",
    "I completed two development internships, contributing to REST APIs, authentication, responsive interfaces, application testing, and debugging.",
    "I enjoy collaborating with teams, solving practical problems, and delivering deployed software projects. I'm looking to continue growing as a Junior Full-Stack Developer or Software Engineer."
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
    "linkedin": "https://www.linkedin.com/in/ramez-al-maayah-b076ba425/",
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
        "JavaScript",
        "TypeScript",
        "SQL"
      ]
    },
    {
      "name": "Frontend Development",
      "icon": "layout",
      "items": [
        "React.js",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Bootstrap",
        "Razor",
        "AJAX",
        "Vite"
      ]
    },
    {
      "name": "Backend & APIs",
      "icon": "server",
      "items": [
        "ASP.NET Core MVC",
        "ASP.NET Core Web API",
        "Entity Framework Core",
        "LINQ",
        "Node.js",
        "Express.js",
        "REST APIs"
      ]
    },
    {
      "name": "Databases",
      "icon": "database",
      "items": [
        "SQL Server",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Supabase"
      ]
    },
    {
      "name": "Architecture & Security",
      "icon": "shield",
      "items": [
        "ASP.NET Core Identity",
        "JWT",
        "RBAC",
        "OOP",
        "SOLID",
        "Clean Architecture",
        "Dependency Injection"
      ]
    },
    {
      "name": "Tools & Testing",
      "icon": "testing",
      "items": [
        "Git",
        "GitHub",
        "Postman",
        "Unit Testing",
        "Integration Testing",
        "API Testing",
        "Agile/Scrum"
      ]
    }
  ],
  "experience": [
    {
      "company": "DOT Jordan",
      "role": "Full-Stack Development Intern",
      "duration": "July 2026 \u2013 September 2026",
      "description": "Developed FR Compare, a supplier quotation management application using React.js, Node.js, Express.js, and MongoDB.",
      "responsibilities": [
        "Built responsive interfaces and integrated REST APIs for procurement workflows.",
        "Implemented JWT authentication and database integration.",
        "Tested application flows and debugged frontend and backend features.",
        "Collaborated using Git and GitHub."
      ]
    },
    {
      "company": "The Hope International",
      "role": "Full-Stack Development Intern",
      "duration": "July 2026 \u2013 September 2026",
      "description": "Built a Moodle Excel Management Dashboard prototype using PHP, MySQL, and PhpSpreadsheet.",
      "responsibilities": [
        "Developed Excel-based workflows for users, courses, enrollments, teachers, and groups.",
        "Integrated Moodle workflows in a local environment.",
        "Tested administrative flows and troubleshot application and database issues."
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
      "title": "AI Engineering Training Program",
      "provider": "Apex Company",
      "status": "In Progress"
    },
    {
      "title": "ASP.NET & Oracle APEX Training",
      "provider": "The Hope International",
      "status": null
    },
    {
      "title": "English for IT 1",
      "provider": "Cisco Networking Academy",
      "status": null
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
    "github": "https://github.com/RamezAlmaayah/unseen-jo",
    "demo": "https://unseenjo.netlify.app/",
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
    "context": "Project Management System",
    "stage": null,
    "featured": true,
    "description": "Planora is a Scrum-based project management platform designed to support structured software development through sprint planning, task management, interactive Kanban boards, role-based authorization, and quality assurance workflows.",
    "problem": "Software teams require centralized tools to coordinate requirements, track development tasks, manage sprint progress, and maintain visibility across different project roles. Fragmented workflows can make project tracking and quality assurance more difficult.",
    "solution": "Planora brings essential project management activities into a unified platform, supporting Scrum-based planning, task tracking, team collaboration, and structured quality assurance.",
    "roles": [
      "Team Leader & Full-Stack Developer"
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
      "Requirements engineering and team leadership across the development workflow.",
      "Role-based authorization and database-driven Kanban task tracking.",
      "Sprint and backlog management with QA review workflows.",
      "Application testing and deployment."
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
    "slug": "fr-compare",
    "number": "05",
    "title": "FR Compare",
    "subtitle": "Supplier Quotation Management System",
    "category": "Full-Stack Web Application / Procurement",
    "year": "2026",
    "context": "DOT Jordan Internship",
    "stage": null,
    "featured": false,
    "description": "FR Compare is a full-stack supplier quotation management platform for organizing suppliers, catalog items, requests for quotations, and competing offers to support informed purchasing decisions.",
    "problem": "Comparing supplier quotations across separate documents makes it difficult to align item prices, delivery times, and supplier ratings before a purchasing decision.",
    "solution": "A shared procurement workflow connects suppliers and catalog items to RFQs, quotations, side-by-side comparisons, and recorded purchasing decisions.",
    "roles": [
      "Full-Stack Developer"
    ],
    "features": [
      "Secure user registration and JWT authentication",
      "Supplier management and item catalog",
      "RFQ creation and management",
      "Supplier quotation management",
      "Side-by-side quotation comparison",
      "Cheapest overall offer and cheapest supplier per item",
      "Split-award item-subtotal analysis",
      "Weighted best-value evaluation",
      "Purchasing decisions and supplier ratings",
      "Historical prices from selected quotations",
      "Private image uploads",
      "Dashboard summaries and reporting views"
    ],
    "technologies": [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Mongoose",
      "Vite",
      "Bootstrap",
      "JWT"
    ],
    "highlights": [
      "React and Vite frontend on Netlify, Express REST API on Render, and MongoDB Atlas persistence.",
      "Contributed to procurement interfaces, REST API integration, JWT authentication, testing, and debugging.",
      "Comparison logic separates final quotation totals from split-award item subtotals.",
      "Integration-test suites cover quotation calculations, comparison, decisions, ownership, and production behavior."
    ],
    "flow": [
      {
        "title": "Organize",
        "description": "Create suppliers and catalog items, then build an RFQ with quantities."
      },
      {
        "title": "Collect",
        "description": "Record supplier quotations, unit prices, delivery days, additional costs, and discounts."
      },
      {
        "title": "Compare",
        "description": "Evaluate overall totals, per-item prices, split-award subtotals, and weighted scores."
      },
      {
        "title": "Decide",
        "description": "Select a quotation, complete the RFQ, rate the chosen supplier, and review historical prices."
      }
    ],
    "github": "https://github.com/RamezAlmaayah/FR-Compare",
    "demo": "https://frcompare.netlify.app",
    "image": "/work/fr-compare.svg",
    "imageAlt": "FR Compare editorial cover with the FR monogram and request-to-decision workflow; not an application screenshot.",
    "details": [
      {
        "title": "Technical architecture",
        "items": [
          "React pages use a shared Axios client and authentication context. Vite builds the frontend, with Bootstrap and CSS for responsive interfaces.",
          "Express routes delegate to controllers, Mongoose models, and calculation utilities. MongoDB Atlas stores application data; production uploads use GridFS."
        ]
      },
      {
        "title": "Authentication and security",
        "items": [
          "Passwords are hashed with bcrypt. Login issues an expiring JWT; protected requests verify the token and confirm the user still exists.",
          "User ownership scopes supplier, RFQ, quotation, and file access. Private image downloads require authentication and return private, no-store cache headers.",
          "Uploads validate JPG/PNG types and signatures with a 5 MB limit. The API includes input validation, Helmet headers, allowed-origin CORS, and request rate limits."
        ]
      },
      {
        "title": "Supplier quotation comparison logic",
        "items": [
          "At least two quotations are required. Grand totals equal quantity \u00d7 unit price summed across items, plus additional cost, minus discount. Ties remain visible.",
          "Per-item analysis identifies every supplier tied at the lowest unit price. Split-award analysis sums those prices \u00d7 quantities; it excludes supplier-specific final charges and is not guaranteed savings.",
          "Weighted scoring combines price, delivery, and supplier rating. Defaults are 60%, 25%, and 15%; weights must total 100%. Unrated suppliers use a neutral 3/5 rating. Missing delivery data blocks scoring when delivery has a positive weight."
        ]
      },
      {
        "title": "Challenges and solutions",
        "items": [
          "Comparable offers need matching line items. Server validation requires exactly one price for each RFQ item and rejects duplicate or unknown rows.",
          "Files must survive backend restarts without becoming public. Production storage uses GridFS, with ownership checks before download.",
          "Purchasing decisions need consistent state. RFQ-scoped decision locking coordinates quotation selection and supplier rating; only the selected supplier can be rated for a completed RFQ."
        ]
      },
      {
        "title": "Results and learning outcomes",
        "items": [
          "Delivered a connected supplier-to-decision workflow with explainable comparison modes and a deployed frontend and API.",
          "The project developed my practical experience with React and Express integration, MongoDB data modeling, JWT authentication, and testing procurement workflows."
        ]
      }
    ]
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
