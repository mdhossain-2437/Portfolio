import { useState, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { projectsData, Project } from "@/utils/projectData";
import { X, ExternalLink, Github, Code, Eye } from "lucide-react";
import SectionTitle from "@/components/ui/section-title";

// Project filter categories
type FilterCategory = "all" | "react" | "vanilla" | "fullstack";

// Project card component to improve code organization and prevent re-renders
const ProjectCard = memo(({ project }: { project: Project }) => {
	return (
		<motion.div
			key={project.id}
			className="project-card rounded-xl overflow-hidden relative group hover:z-10"
			layout
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.3 }}
			whileHover={{ y: -10, scale: 1.02 }}
		>
			<div className="relative h-80 neo-brutal shadow-lg hover:shadow-xl transition-all duration-300">
				{/* Project Image */}
				<div className="absolute inset-0 overflow-hidden rounded-xl">
					<img
						loading="lazy"
						src={project.image}
						alt={project.title}
						className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
						onError={(e) => {
							// Fallback if image fails to load
							const target = e.target as HTMLImageElement;
							target.onerror = null;
							target.src =
								"https://via.placeholder.com/800x450?text=Project+Image";
						}}
					/>

					{/* Gradient overlay for better text readability */}
					<div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent"></div>
				</div>

				{/* Project Info */}
				<div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
					<motion.h3
						className="text-2xl font-bold mb-2"
						initial={{ opacity: 0.8 }}
						whileHover={{ opacity: 1, x: 5 }}
						transition={{ duration: 0.2 }}
					>
						{project.title}
					</motion.h3>

					<p className="text-sm text-gray-300 mb-4 line-clamp-2">
						{project.shortDescription}
					</p>

					{/* Tech stack */}
					<div className="tech-stack flex flex-wrap gap-2 mb-4">
						{project.technologies.slice(0, 3).map((tech, index) => (
							<motion.span
								key={index}
								className="text-xs bg-primary/20 px-2 py-1 rounded-full border border-primary/20"
								whileHover={{
									scale: 1.1,
									backgroundColor: "rgba(var(--primary-rgb), 0.3)",
								}}
							>
								{tech}
							</motion.span>
						))}
						{project.technologies.length > 3 && (
							<span className="text-xs bg-gray-800/80 px-2 py-1 rounded-full">
								+{project.technologies.length - 3}
							</span>
						)}
					</div>

					{/* Action buttons */}
					<div className="flex justify-between items-center">
						<div className="space-x-2">
							<a
								href={project.liveLink}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center text-xs bg-primary/20 text-primary hover:bg-primary/30 p-2 rounded-md transition-colors"
							>
								<Eye className="h-3 w-3 mr-1" />
								<span>Demo</span>
							</a>

							<a
								href={project.githubLink}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center text-xs bg-gray-800 hover:bg-gray-700 p-2 rounded-md transition-colors"
							>
								<Code className="h-3 w-3 mr-1" />
								<span>Code</span>
							</a>
						</div>

						<Dialog>
							<DialogTrigger asChild>
								<motion.button
									className="text-xs bg-gray-800/80 hover:bg-gray-700 px-3 py-2 rounded-md"
									whileHover={{ scale: 1.05 }}
								>
									Case Study
								</motion.button>
							</DialogTrigger>
							<DialogContent className="max-w-4xl bg-gray-900 border-gray-800">
								<ProjectDetailDialog project={project} />
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</div>
		</motion.div>
	);
});

// Project detail dialog component
const ProjectDetailDialog = memo(({ project }: { project: Project }) => {
	return (
		<>
			<DialogHeader>
				<DialogTitle className="text-2xl font-bold">
					{project.title}
				</DialogTitle>
				<DialogClose className="absolute right-4 top-4 text-gray-400 hover:text-white">
					<X className="h-6 w-6" />
				</DialogClose>
			</DialogHeader>

			<div className="mt-4">
				<div className="relative">
					<img
						loading="lazy"
						src={project.image}
						alt={project.title}
						className="w-full h-64 object-cover rounded-lg mb-6"
						onError={(e) => {
							// Fallback if image fails to load
							const target = e.target as HTMLImageElement;
							target.onerror = null;
							target.src =
								"https://via.placeholder.com/800x450?text=Project+Image";
						}}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent rounded-lg"></div>
				</div>

				<p className="mb-6 text-gray-300">{project.longDescription}</p>

				<motion.div
					className="mb-6 glass-dark p-5 rounded-lg"
					initial={{ opacity: 0.9 }}
					whileHover={{ opacity: 1, y: -5 }}
					transition={{ duration: 0.2 }}
				>
					<h4 className="text-lg font-semibold mb-2 text-primary">
						The Challenge
					</h4>
					<p>{project.challenge}</p>
				</motion.div>

				<motion.div
					className="mb-6 glass-dark p-5 rounded-lg"
					initial={{ opacity: 0.9 }}
					whileHover={{ opacity: 1, y: -5 }}
					transition={{ duration: 0.2 }}
				>
					<h4 className="text-lg font-semibold mb-2 text-primary">
						The Solution
					</h4>
					<p>{project.solution}</p>
				</motion.div>

				<div className="mb-6">
					<h4 className="text-lg font-semibold mb-4">Technologies Used</h4>
					<div className="flex flex-wrap gap-2">
						{project.technologies.map((tech, index) => (
							<motion.span
								key={index}
								className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm border border-primary/10"
								whileHover={{
									scale: 1.05,
									backgroundColor: "rgba(var(--primary-rgb), 0.3)",
								}}
								transition={{ duration: 0.2 }}
							>
								{tech}
							</motion.span>
						))}
					</div>
				</div>

				<div className="flex flex-wrap gap-4 justify-between">
					<a
						href={project.liveLink}
						target="_blank"
						rel="noopener noreferrer"
						className="neo-brutal bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 inline-flex items-center group"
					>
						<ExternalLink className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
						View Live Demo
					</a>
					<a
						href={project.githubLink}
						target="_blank"
						rel="noopener noreferrer"
						className="neo-brutal bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 inline-flex items-center group"
					>
						<Github className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
						View Source Code
					</a>
				</div>
			</div>
		</>
	);
});

export default function Projects() {
	const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

	// Using useCallback to prevent unnecessary re-renders when this function is passed as prop
	const handleFilterClick = useCallback((filter: FilterCategory) => {
		setActiveFilter(filter);
	}, []);

	// Using useMemo to avoid refiltering on every render
	const filteredProjects = useMemo(() => {
		return activeFilter === "all"
			? projectsData
			: projectsData.filter((project) => project.category === activeFilter);
	}, [activeFilter]);

	return (
		<section id="projects" className="py-24 relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl -top-48 right-0"></div>
				<div className="absolute w-96 h-96 rounded-full bg-secondary/5 blur-3xl bottom-48 -left-48"></div>
			</div>

			<div className="container mx-auto px-6">
				{/* Title with scrambled text effect */}
				<SectionTitle
					title="The Dev Lab"
					highlight="Dev"
					subtitle="A collection of projects I've built to solve problems, learn new technologies, and express my creativity."
					startDelay={50}
					isHero={false}
				/>

				{/* Filter Buttons */}
				<div className="flex flex-wrap justify-center gap-3 mb-16">
					<motion.button
						className={`neo-brutal px-6 py-3 rounded-lg transition-all duration-300 ${
							activeFilter === "all"
								? "bg-primary/20 border-primary text-primary font-medium"
								: "bg-gray-900/80 hover:bg-gray-800"
						}`}
						onClick={() => handleFilterClick("all")}
						whileHover={{ y: -3 }}
						whileTap={{ scale: 0.98 }}
					>
						All Projects
					</motion.button>

					<motion.button
						className={`neo-brutal px-6 py-3 rounded-lg transition-all duration-300 ${
							activeFilter === "react"
								? "bg-primary/20 border-primary text-primary font-medium"
								: "bg-gray-900/80 hover:bg-gray-800"
						}`}
						onClick={() => handleFilterClick("react")}
						whileHover={{ y: -3 }}
						whileTap={{ scale: 0.98 }}
					>
						React
					</motion.button>

					<motion.button
						className={`neo-brutal px-6 py-3 rounded-lg transition-all duration-300 ${
							activeFilter === "vanilla"
								? "bg-primary/20 border-primary text-primary font-medium"
								: "bg-gray-900/80 hover:bg-gray-800"
						}`}
						onClick={() => handleFilterClick("vanilla")}
						whileHover={{ y: -3 }}
						whileTap={{ scale: 0.98 }}
					>
						Vanilla JS
					</motion.button>

					<motion.button
						className={`neo-brutal px-6 py-3 rounded-lg transition-all duration-300 ${
							activeFilter === "fullstack"
								? "bg-primary/20 border-primary text-primary font-medium"
								: "bg-gray-900/80 hover:bg-gray-800"
						}`}
						onClick={() => handleFilterClick("fullstack")}
						whileHover={{ y: -3 }}
						whileTap={{ scale: 0.98 }}
					>
						Full Stack
					</motion.button>
				</div>

				{/* Projects Grid with staggered animation */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					layout
					transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
				>
					<AnimatePresence mode="popLayout">
						{filteredProjects.map((project, index) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</AnimatePresence>

					{/* Empty state message when no projects match filter */}
					{filteredProjects.length === 0 && (
						<motion.div
							className="col-span-full text-center py-20"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<h3 className="text-xl mb-2">No projects found</h3>
							<p className="text-gray-400">
								No projects match your current filter. Try selecting a different
								category.
							</p>
						</motion.div>
					)}
				</motion.div>

				{/* See more on GitHub Button */}
				<motion.div
					className="text-center mt-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<motion.a
						href="https://github.com/mddelowar"
						target="_blank"
						rel="noopener noreferrer"
						className="neo-brutal inline-block relative bg-primary/10 border-2 border-primary/30 text-white px-8 py-4 rounded-lg transition-all overflow-hidden group"
						whileHover={{
							scale: 1.05,
							backgroundColor: "rgba(var(--primary-rgb), 0.2)",
						}}
						whileTap={{ scale: 0.98 }}
					>
						<span className="absolute inset-0 w-full h-full bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
						<span className="relative z-10 font-medium flex items-center">
							<Github className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
							<span>See More on GitHub</span>
						</span>
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
}
