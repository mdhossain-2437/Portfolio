import { memo, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/section-title";
import { coreSkills, toolsSkills, learningSkills } from "@/utils/skillsData";
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
} from "recharts";

// Skill proficiency data for radar chart
const skillProficiency = [
	{ subject: "HTML/CSS", A: 90, fullMark: 100 },
	{ subject: "JavaScript", A: 85, fullMark: 100 },
	{ subject: "React", A: 80, fullMark: 100 },
	{ subject: "UI/UX", A: 75, fullMark: 100 },
	{ subject: "Node.js", A: 65, fullMark: 100 },
	{ subject: "MongoDB", A: 60, fullMark: 100 },
];

// Skill card component with animations and interactivity
const SkillCard = memo(
	({
		skill,
		index,
		category,
	}: {
		skill: {
			name: string;
			icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
		};
		index: number;
		category: string;
	}) => {
		const Icon = skill.icon;
		const [isHovered, setIsHovered] = useState(false);

		// Get appropriate color based on category
		const getColor = () => {
			switch (category) {
				case "core":
					return "text-blue-500";
				case "tools":
					return "text-purple-500";
				case "learning":
					return "text-amber-500";
				default:
					return "text-gray-500";
			}
		};

		// Get appropriate background based on category
		const getBgColor = () => {
			switch (category) {
				case "core":
					return "bg-blue-500/10 group-hover:bg-blue-500/20";
				case "tools":
					return "bg-purple-500/10 group-hover:bg-purple-500/20";
				case "learning":
					return "bg-amber-500/10 group-hover:bg-amber-500/20";
				default:
					return "bg-gray-500/10 group-hover:bg-gray-500/20";
			}
		};

		// Get appropriate border based on category
		const getBorderColor = () => {
			switch (category) {
				case "core":
					return "border-blue-500/30 group-hover:border-blue-500";
				case "tools":
					return "border-purple-500/30 group-hover:border-purple-500";
				case "learning":
					return "border-amber-500/30 group-hover:border-amber-500";
				default:
					return "border-gray-500/30 group-hover:border-gray-500";
			}
		};

		return (
			<motion.div
				className={`rounded-xl overflow-hidden neo-brutal p-6 group border ${getBorderColor()} transition-all duration-300`}
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.4, delay: index * 0.1 }}
				onHoverStart={() => setIsHovered(true)}
				onHoverEnd={() => setIsHovered(false)}
				whileHover={{
					y: -5,
					boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
				}}
			>
				<div className="flex flex-col items-center text-center">
					<div
						className={`w-20 h-20 rounded-full ${getBgColor()} flex items-center justify-center mb-4 transition-all duration-300`}
					>
						<motion.div
							animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
							transition={{ duration: 1, ease: "easeInOut" }}
							className={`text-4xl ${getColor()}`}
						>
							<Icon />
						</motion.div>
					</div>
					<h3 className="text-lg font-bold">{skill.name}</h3>
					<div className="w-12 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full mt-2"></div>
				</div>
			</motion.div>
		);
	}
);

// Skill group component for each category
const SkillGroup = memo(
	({
		title,
		skills,
		category,
	}: {
		title: string;
		skills: Array<{
			name: string;
			icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
		}>;
		category: string;
	}) => {
		return (
			<div className="mb-14">
				<h3 className="text-2xl font-bold mb-6 text-center md:text-left">
					<span className="inline-block border-b-2 border-primary pb-1">
						{title}
					</span>
				</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{skills.map((skill, index) => (
						<SkillCard
							key={skill.name}
							skill={skill}
							index={index}
							category={category}
						/>
					))}
				</div>
			</div>
		);
	}
);

export default function Skills() {
	return (
		<section id="skills" className="py-24 relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute w-72 h-72 rounded-full bg-primary/5 blur-3xl -top-20 -right-20"></div>
				<div className="absolute w-72 h-72 rounded-full bg-secondary/5 blur-3xl bottom-20 -left-20"></div>
				<div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
			</div>

			<div className="container mx-auto px-6">
				<SectionTitle
					title="Skills & Expertise"
					highlight="Skills"
					subtitle="A comprehensive overview of my technical abilities, tools I use, and what I'm currently learning."
					startDelay={50}
					isHero={false}
				/>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
					<div className="lg:col-span-2">
						{/* Core Skills */}
						<SkillGroup
							title="Core Skills"
							skills={coreSkills}
							category="core"
						/>

						{/* Tools */}
						<SkillGroup
							title="Tools I Use"
							skills={toolsSkills}
							category="tools"
						/>

						{/* Learning */}
						<SkillGroup
							title="Currently Learning"
							skills={learningSkills}
							category="learning"
						/>
					</div>

					{/* Radar Chart */}
					<div className="lg:col-span-1">
						<motion.div
							className="h-full glass-dark p-6 rounded-xl"
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<h3 className="text-2xl font-bold mb-6 text-center">
								Skill Proficiency
							</h3>
							<div className="h-80 mt-8">
								<ResponsiveContainer width="100%" height="100%">
									<RadarChart
										cx="50%"
										cy="50%"
										outerRadius="80%"
										data={skillProficiency}
									>
										<PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
										<PolarAngleAxis
											dataKey="subject"
											tick={{ fill: "white", fontSize: 12 }}
										/>
										<PolarRadiusAxis
											angle={30}
											domain={[0, 100]}
											tick={{ fill: "white", fontSize: 10 }}
										/>
										<Radar
											name="Skills"
											dataKey="A"
											stroke="rgba(var(--primary-rgb), 0.8)"
											fill="rgba(var(--primary-rgb), 0.3)"
											fillOpacity={0.6}
										/>
									</RadarChart>
								</ResponsiveContainer>
							</div>

							<div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
								<h4 className="text-lg font-semibold mb-2">About My Skills</h4>
								<p className="text-sm text-gray-400">
									As a self-taught developer, I've focused on building a strong
									foundation in frontend technologies while expanding into
									backend development. My journey has been guided by real-world
									projects and continuous learning. The radar chart represents
									my relative confidence in each skill area.
								</p>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
