export interface Technology {
  id: string
  name: string
  aliases: string[]
  logo?: string
  surface?: 'navy' | 'white'
  family?: string
}

const logo = (
  id: string,
  name: string,
  aliases: string[] = [],
  surface: Technology['surface'] = 'white',
): Technology => ({ id, name, aliases, logo: `/technologies/${id}.svg`, surface })

// Brand-family aliases intentionally share the family logo, never an unrelated mark.
export const technologies: Technology[] = [
  { ...logo('react', 'React', ['React.js', 'ReactJS', 'React Hooks'], 'navy'), family: 'React' },
  logo('csharp', 'C#', ['CSharp', 'C Sharp']),
  {
    ...logo('dotnetcore', '.NET', [
      '.NET Core',
      'Microsoft .NET',
      'ASP.NET',
      'ASP.NET Core',
      'ASP.NET Core MVC',
      'ASP.NET Core Web API',
      'ASP.NET Core Identity',
      'Identity',
    ]),
    family: 'Microsoft .NET',
  },
  logo('javascript', 'JavaScript', ['JS', 'JavaScript (ES6+)']),
  logo('html5', 'HTML5', ['HTML']),
  logo('css3', 'CSS3', ['CSS']),
  logo('python', 'Python'),
  logo('php', 'PHP'),
  logo('nodejs', 'Node.js', ['NodeJS', 'Node']),
  logo('mongodb', 'MongoDB', ['MongoDB Atlas']),
  logo('express', 'Express.js', ['Express']),
  logo('mongoose', 'Mongoose'),
  logo('mysql', 'MySQL'),
  logo('microsoftsqlserver', 'SQL Server', ['Microsoft SQL Server', 'MSSQL']),
  logo('git', 'Git'),
  logo('github', 'GitHub'),
  logo('visualstudio', 'Visual Studio'),
  logo('vscode', 'Visual Studio Code', ['VS Code', 'VSCode']),
  logo('figma', 'Figma'),
  logo('postman', 'Postman'),
  logo('tailwindcss', 'Tailwind CSS', ['Tailwind', 'TailwindCSS'], 'navy'),
  logo('typescript', 'TypeScript', ['TS']),
  logo('angular', 'Angular', ['Angular.js']),
  logo('bootstrap', 'Bootstrap'),
  logo('moodle', 'Moodle'),
  logo('entityframeworkcore', 'Entity Framework Core', ['EF Core', 'EFCore']),
  { ...logo('leaflet', 'Leaflet', ['React Leaflet']), family: 'Leaflet' },
  logo('openstreetmap', 'OpenStreetMap', ['OSM']),
  logo('postgresql', 'PostgreSQL', ['Postgres']),
  { ...logo('supabase', 'Supabase', ['Supabase Auth'], 'navy'), family: 'Supabase' },
  logo('reactrouter', 'React Router'),
  logo('vite', 'Vite'),
  { ...logo('docker', 'Docker', ['Docker Compose']), family: 'Docker' },
  logo('githubactions', 'GitHub Actions'),
  logo('jira', 'Jira'),
  logo('swagger', 'Swagger', ['Swagger / OpenAPI']),
  { id: 'motion', name: 'Motion', aliases: [], logo: '/technologies/motion.png', surface: 'white' },
  ...[
    'OOP',
    'SOLID',
    'Dependency Injection',
    'JWT',
    'RBAC',
    'Agile/Scrum',
    'SQL',
    'Razor',
    'AJAX',
    'RESTful APIs',
    'NASA POWER',
    'GPM IMERG',
    'PhpSpreadsheet',
    'Browser Geolocation API',
    'LINQ',
    'Row Level Security (RLS)',
    'JWT Authentication',
    'Cookie Authentication',
    'Role-Based Access Control (RBAC)',
    'SOLID Principles',
    'Design Patterns',
    'Clean Architecture',
    'Onion Architecture',
    'CI/CD',
    'Unit Testing',
    'Integration Testing',
    'API Testing',
    'Security Testing',
    'Manual Testing',
    'Agile / Scrum',
    'Requirements Analysis',
  ].map((name) => ({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name,
    aliases: name === 'RESTful APIs' ? ['REST APIs', 'REST API'] : [],
  })),
]

const normalize = (name: string) => name.trim().toLowerCase().replace(/\s+/g, ' ')
const byAlias = new Map(
  technologies.flatMap((technology) =>
    [technology.name, ...technology.aliases].map((name) => [normalize(name), technology] as const),
  ),
)

export function getTechnology(name: string): Technology | undefined {
  return byAlias.get(normalize(name))
}
