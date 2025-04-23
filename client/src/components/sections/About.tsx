import { useRef, useMemo, memo, useState, useEffect } from "react";
import { motion, useScroll, useTransform, easeInOut } from "framer-motion";
import SectionTitle from "@/components/ui/section-title";
import RocketPath from "@/components/RocketPath";

interface TimelineItem {
	year: string;
	title: string;
	description: string;
	position: "left" | "right";
	icon?: React.ReactNode;
}

// Define timeline items outside component to prevent recreation
const timelineItems: TimelineItem[] = [
	{
		year: "2018",
		title: "Starting Point: Humanities",
		description:
			"My journey began with humanities studies, which gave me a unique perspective and approach to problem-solving. This foundation in critical thinking helped me see technology as a tool for human expression.",
		position: "left",
		icon: (
			<svg
				className="w-8 h-8 text-primary"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		year: "2019",
		title: "Discovered Web Development",
		description:
			"Fascinated by creating digital experiences, I started learning HTML, CSS & JavaScript. The ability to bring ideas to life through code opened up a whole new world of creative possibilities.",
		position: "right",
		icon: (
			<svg
				className="w-8 h-8 text-primary"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		year: "2019",
		title: "First Open Source Contribution",
		description:
			"Made my first contribution to open source projects, learning the value of collaboration in coding. Working with developers from around the world expanded my horizons and taught me about code quality and standards.",
		position: "left",
		icon: (
			<svg
				className="w-8 h-8 text-primary"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M17.25 18a.75.75 0 000-1.5h-1.5v-2.25A4.5 4.5 0 0011.25 9.8V9a3 3 0 10-6 0v.75a.75.75 0 001.5 0V9a1.5 1.5 0 113 0v.75a3 3 0 013 3V18H9.75v-3.75a.75.75 0 00-1.5 0V18h-1.5a.75.75 0 000 1.5h10.5z"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		year: "2020",
		title: "First Projects",
		description:
			"Built my first websites and applications, learning through creating and overcoming challenges. Every bug fixed and feature implemented taught me valuable lessons about problem-solving and persistence.",
		position: "right",
		icon: (
			<svg
				className="w-8 h-8 text-primary"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		year: "2020",
		title: "Mobile App Development",
		description:
			"Expanded my skills to mobile app development using React Native, building cross-platform applications. This journey into mobile development taught me to think about user experience across different device contexts.",
		position: "left",
		icon: (
			<svg
				className="w-8 h-8 text-primary"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		year: "2021",
		title: "Mastering React",
		description:
			"Diving deep into modern frontend frameworks to create dynamic, responsive applications. React's component-based architecture resonated with my approach to breaking down complex problems into manageable pieces.",
		position: "right",
		icon: (
			<svg
				className="w-8 h-8 text-primary"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		year: "2022",
		title: "Backend Development",
		description:
			"Learned Node.js and Express to build powerful backend systems, completing my full-stack developer journey. Understanding databases, APIs, and server architecture gave me the ability to build complete applications from scratch.",
		position: "left",
		icon: (
			<svg
				className="w-8 h-8 text-primary"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M5.25 14.25h13.5m-13.5-4.5h13.5M8.25 3v1.5M12 3v7.5m3.75-6v1.5m3.75 9v6a3 3 0 01-3 3H7.5a3 3 0 01-3-3v-6m13.5 0V5.25a3 3 0 00-3-3h-9a3 3 0 00-3 3v10.5"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		year: "2023",
		title: "Cloud & DevOps Skills",
		description:
			"Ventured into cloud technologies and DevOps practices using AWS, Docker, and CI/CD pipelines. This expanded my capabilities to deploy, scale, and maintain applications in production environments with modern best practices.",
		position: "right",
		icon: (
			<svg
				className="w-8 h-8 text-primary"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		year: "Present",
		title: "Dreaming of AI & Future",
		description:
			"Now exploring AI and advanced technologies to create the next generation of web experiences. Combining my humanities background with technical skills allows me to approach AI with both creativity and ethical awareness.",
		position: "left",
		icon: (
			<svg
				className="w-8 h-8 text-primary"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M9.25 3v1.25M15 3v1.25M21 8.5V17c0 2.5-1.5 4-4 4H7c-2.5 0-4-1.5-4-4V8.5c0-2.5 1.5-4 4-4h10c2.5 0 4 1.5 4 4zM8 14c0 .75.21 1.46.56 2.06.34.6.83 1.08 1.44 1.44.6.35 1.31.56 2.06.56.75 0 1.46-.21 2.06-.56.6-.36 1.1-.84 1.44-1.44.36-.6.55-1.31.55-2.06 0-.75-.21-1.46-.56-2.06-.34-.6-.83-1.08-1.44-1.44-.6-.35-1.31-.56-2.06-.56-.75 0-1.46.21-2.06.56-.6.36-1.08.84-1.44 1.44-.35.6-.56 1.31-.56 2.06z"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
];

const TimelineItem = memo(
	({ item, index }: { item: TimelineItem; index: number }) => {
		return (
			<motion.div
				className={`timeline-item flex ${
					item.position === "left" ? "justify-start" : "justify-end"
				} w-full`}
				initial={{ opacity: 0, x: item.position === "left" ? -50 : 50, y: 20 }}
				whileInView={{ opacity: 1, x: 0, y: 0 }}
				viewport={{ once: true, margin: "-50px" }}
				transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
			>
				<div
					className={`timeline-content timeline-${item.position} glass-dark rounded-xl w-full md:w-5/12 p-6 border-2 border-gray-800 group hover:border-primary/30 transition-all duration-300`}
				>
					<div className="flex items-center mb-4">
						<motion.div
							className="mr-4 bg-gray-800 p-2 rounded-lg group-hover:bg-primary/10 transition-colors duration-300"
							whileHover={{ scale: 1.1, rotate: 5 }}
							initial={{ rotate: 0 }}
						>
							{item.icon}
						</motion.div>
						<div>
							<h3 className="text-xl font-semibold">{item.title}</h3>
							<p className="text-primary font-mono text-sm">{item.year}</p>
						</div>
					</div>

					<div className="ml-16 border-l-2 border-primary/20 pl-4 group-hover:border-primary/40 transition-colors duration-300">
						<p className="text-gray-300">{item.description}</p>
					</div>

					<motion.div
						className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
				</div>
			</motion.div>
		);
	}
);

const About = memo(function About() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end end"],
	});

	// Apply custom styles through CSS variables to handle the timeline appearance
	useEffect(() => {
		const style = document.createElement("style");
		style.innerHTML = `
			/* Ensure timeline items have proper spacing */
			.timeline-item {
				position: relative;
				z-index: 10;
			}
		`;
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);

	// Memoize timeline items to prevent unnecessary re-renders
	const timelineComponents = useMemo(
		() =>
			timelineItems.map((item, index) => (
				<TimelineItem key={index} item={item} index={index} />
			)),
		[]
	);

	return (
		<section id="about" className="py-24 relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 -z-10 opacity-30">
				<div className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl -top-48 -left-48"></div>
				<div className="absolute w-96 h-96 rounded-full bg-secondary/10 blur-3xl bottom-0 right-0"></div>
			</div>

			<div className="container mx-auto px-6">
				{/* Scrambled Title with highlight */}
				<SectionTitle
					title="My Origin Story"
					highlight="Origin"
					subtitle="A journey from humanities to code, driven by curiosity and the desire to create digital experiences that matter."
					startDelay={50}
					isHero={false}
				/>

				{/* Journey path with timeline */}
				<div ref={containerRef} className="relative mt-24 pb-20">
					{/* Timeline Items with rocket path in background */}
					<div className="space-y-16 md:space-y-20 relative">
						{/* Rocket path component behind timeline cards */}
						<div className="absolute inset-0 z-0">
							<RocketPath />
						</div>

						{/* Timeline Items */}
						<div className="relative z-10">{timelineComponents}</div>
					</div>
				</div>
			</div>
		</section>
	);
});

export default About;
