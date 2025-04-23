import { memo } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/section-title";
import { Book, Users, Zap, Award, Lightbulb, Heart } from "lucide-react";

interface DreamFeature {
	icon: JSX.Element;
	title: string;
	description: string;
	borderColor: string;
}

const dreamFeatures: DreamFeature[] = [
	{
		icon: <Book className="w-8 h-8" />,
		title: "Practical Courses",
		description:
			"Self-paced learning paths designed for real-world application, not just theory.",
		borderColor: "border-blue-500",
	},
	{
		icon: <Users className="w-8 h-8" />,
		title: "Community Support",
		description:
			"Join a thriving community of self-taught developers who help each other succeed.",
		borderColor: "border-purple-500",
	},
	{
		icon: <Zap className="w-8 h-8" />,
		title: "Interactive Challenges",
		description:
			"Hands-on coding challenges that build skills through practical problem-solving.",
		borderColor: "border-amber-500",
	},
	{
		icon: <Award className="w-8 h-8" />,
		title: "Achievement System",
		description:
			"Gamified learning experience with badges and certificates to track your progress.",
		borderColor: "border-green-500",
	},
	{
		icon: <Lightbulb className="w-8 h-8" />,
		title: "Mentorship",
		description:
			"Connect with experienced developers who can guide your learning journey.",
		borderColor: "border-pink-500",
	},
	{
		icon: <Heart className="w-8 h-8" />,
		title: "Inclusivity",
		description:
			"A platform designed for everyone, regardless of background or previous experience.",
		borderColor: "border-red-500",
	},
];

export default function Dream() {
	return (
		<section
			id="dream"
			className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950"
		>
			{/* Decorative elements */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute w-full h-full">
					<div className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl top-32 left-12"></div>
					<div className="absolute w-64 h-64 rounded-full bg-secondary/5 blur-3xl bottom-32 right-12"></div>
				</div>
				<div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
			</div>

			<div className="container mx-auto px-6">
				<SectionTitle
					title="WebDevWarrior"
					highlight="WebDevWarrior"
					subtitle="My vision to help aspiring developers overcome the challenges I faced through a platform built by self-taught developers, for self-taught developers."
					startDelay={200}
					isHero={false}
				/>

				{/* Vision Quote */}
				<motion.div
					className="max-w-4xl mx-auto my-10 p-8 glass-dark rounded-xl border border-primary/20 relative overflow-hidden"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<div className="absolute top-2 left-2 text-5xl opacity-20 z-0">"</div>
					<div className="absolute bottom-2 right-2 text-5xl opacity-20 z-0">
						"
					</div>
					<blockquote className="text-xl md:text-2xl text-center font-light italic text-gray-300 relative z-10">
						I want to help self-taught coders become warriors - equipped with
						the skills, confidence, and community support needed to thrive in
						the tech world.
					</blockquote>
					<p className="text-right mt-4 text-primary font-medium relative z-10">
						— MD Delowar Hossain
					</p>
				</motion.div>

				{/* Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
					{dreamFeatures.map((feature, index) => (
						<motion.div
							key={feature.title}
							className={`neo-brutal rounded-xl p-6 glass-dark border-l-4 hover:transform hover:-translate-y-2 transition-all duration-300 ${feature.borderColor}`}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: index * 0.1 }}
							whileHover={{ scale: 1.03 }}
						>
							<div className="flex items-start">
								<div
									className={`p-3 rounded-lg bg-gray-800 mr-4 text-${
										feature.borderColor.split("-")[1]
									}`}
								>
									{feature.icon}
								</div>
								<div>
									<h3 className="text-xl font-bold mb-2">{feature.title}</h3>
									<p className="text-gray-400">{feature.description}</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Call to Action */}
				<motion.div
					className="mt-20 text-center"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					<h3 className="text-2xl font-bold mb-6">Want to join the journey?</h3>
					<motion.button
						className="neo-brutal bg-primary/20 border-2 border-primary/50 text-white px-8 py-4 rounded-lg overflow-hidden relative"
						whileHover={{
							scale: 1.05,
							backgroundColor: "rgba(var(--primary-rgb), 0.3)",
						}}
						whileTap={{ scale: 0.98 }}
					>
						<motion.span
							className="absolute inset-0 bg-primary/20"
							initial={{ scale: 0, opacity: 0 }}
							whileHover={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.3 }}
						/>
						<span className="relative z-10">Join the Waitlist</span>
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
}
