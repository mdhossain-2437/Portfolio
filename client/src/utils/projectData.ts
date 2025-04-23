export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  challenge: string;
  solution: string;
  technologies: string[];
  category: "react" | "vanilla" | "fullstack";
  image: string;
  liveLink: string;
  githubLink: string;
}

export const projectsData: Project[] = [
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    shortDescription: "Real-time weather app with forecast and location detection",
    longDescription: "A real-time weather application that provides current conditions and forecasts for locations worldwide.",
    challenge: "Integrating multiple weather APIs while ensuring the UI remains clean and intuitive across devices.",
    solution: "Used React with context API for state management and created a responsive design that adapts to different screen sizes.",
    technologies: ["React", "OpenWeather API", "Tailwind CSS", "LocalStorage"],
    category: "react",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    liveLink: "https://weather-dashboard-demo.netlify.app/",
    githubLink: "https://github.com/mddelowar/weather-dashboard"
  },
  {
    id: "task-manager",
    title: "Task Manager",
    shortDescription: "Full-stack task management with user authentication",
    longDescription: "A full-stack task management application with user authentication and real-time updates.",
    challenge: "Creating a smooth, intuitive UI that handles real-time data updates without performance issues.",
    solution: "Implemented a React frontend with Redux for state management and Express/MongoDB backend with Socket.io for real-time features.",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Socket.io"],
    category: "fullstack",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    liveLink: "https://task-manager-demo.netlify.app/",
    githubLink: "https://github.com/mddelowar/task-manager"
  },
  {
    id: "memory-game",
    title: "Memory Game",
    shortDescription: "Interactive card matching game with animations",
    longDescription: "An interactive card matching game built with vanilla JavaScript to test users' memory skills.",
    challenge: "Creating smooth animations and ensuring game logic functions correctly across all scenarios.",
    solution: "Used CSS transitions for card flipping animations and implemented a clear game state management system.",
    technologies: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
    category: "vanilla",
    image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    liveLink: "https://memory-game-demo.netlify.app/",
    githubLink: "https://github.com/mddelowar/memory-game"
  }
];
