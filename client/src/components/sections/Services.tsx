import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/section-title";
import { servicesData } from "@/utils/servicesData";
import { ChevronRight } from "lucide-react";

// Service card component with animations and flip effect
const ServiceCard = memo(
	({
		service,
		index,
	}: {
		service: {
			title: string;
			description: string;
			icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
			features: string[];
			iconColor: string;
			bgColor: string;
		};
		index: number;
	}) => {
		const [isFlipped, setIsFlipped] = useState(false);
		const Icon = service.icon;

		return (
			<motion.div
				className="rounded-xl overflow-hidden neo-brutal-lg h-full relative perspective"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5, delay: index * 0.1 }}
				style={{ minHeight: "380px" }}
			>
				<div
					className={`flip-card-inner transition-all duration-700 w-full h-full ${
						isFlipped ? "flip-card-flipped" : ""
					}`}
				>
					{/* Front of the card */}
					<div className="flip-card-front p-8 glass-dark rounded-xl flex flex-col items-center text-center">
						<div
							className={`w-20 h-20 rounded-full ${service.bgColor} flex items-center justify-center mb-6`}
						>
							<Icon className={`w-10 h-10 ${service.iconColor}`} />
						</div>
						<h3 className="text-2xl font-bold mb-3">{service.title}</h3>
						<p className="text-gray-300 mb-6">{service.description}</p>

						<motion.button
							className="mt-auto text-primary flex items-center"
							onClick={() => setIsFlipped(true)}
							whileHover={{ x: 5 }}
						>
							<span>View Details</span>
							<ChevronRight className="w-5 h-5 ml-1" />
						</motion.button>
					</div>

					{/* Back of the card */}
					<div className="flip-card-back p-8 glass-dark rounded-xl">
						<div className="h-full flex flex-col">
							<h3 className="text-2xl font-bold mb-4">{service.title}</h3>
							<div className="mb-auto">
								<h4 className="text-lg font-semibold mb-3 text-primary">
									What's Included:
								</h4>
								<ul className="space-y-2">
									{service.features.map((feature, idx) => (
										<motion.li
											key={idx}
											className="flex items-start"
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: idx * 0.1 }}
										>
											<span
												className={`inline-block w-2 h-2 rounded-full ${service.bgColor} mt-2 mr-2`}
											></span>
											<span>{feature}</span>
										</motion.li>
									))}
								</ul>
							</div>

							<motion.button
								className="mt-auto text-primary flex items-center"
								onClick={() => setIsFlipped(false)}
								whileHover={{ x: -5 }}
							>
								<ChevronRight className="w-5 h-5 mr-1 rotate-180" />
								<span>Back</span>
							</motion.button>
						</div>
					</div>
				</div>
			</motion.div>
		);
	}
);

export default function Services() {
	return (
		<section id="services" className="py-24 relative overflow-hidden">
			{/* Background elements */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-950/50 to-transparent"></div>
				<div className="absolute top-0 right-0 w-full h-1/3 bg-gradient-to-b from-gray-950/50 to-transparent"></div>
			</div>

			<div className="container mx-auto px-6">
				<SectionTitle
					title="Services I Offer"
					highlight="Services"
					subtitle="Professional solutions tailored to meet your digital needs."
					startDelay={50}
					isHero={false}
				/>

				{/* Services Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
					<AnimatePresence>
						{servicesData.map((service, index) => (
							<ServiceCard
								key={service.title}
								service={service}
								index={index}
							/>
						))}
					</AnimatePresence>
				</div>

				{/* Inquiry CTA */}
				<motion.div
					className="mt-20 text-center"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h3 className="text-2xl font-bold mb-4">Need a custom solution?</h3>
					<p className="text-gray-300 max-w-2xl mx-auto mb-8">
						Every project is unique. If you don't see exactly what you're
						looking for, I'm happy to discuss your specific needs and create a
						tailored approach.
					</p>
					<motion.a
						href="#contact"
						className="inline-block neo-brutal bg-primary text-white px-8 py-4 rounded-lg overflow-hidden relative group"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.98 }}
					>
						<span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
						<span className="relative z-10">Get in Touch</span>
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
}
