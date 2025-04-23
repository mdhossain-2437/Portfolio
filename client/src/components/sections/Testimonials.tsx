import { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/section-title";
import { testimonialsData } from "@/utils/testimonialsData";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

// Single testimonial component
const TestimonialCard = memo(
	({
		testimonial,
		isActive,
	}: {
		testimonial: {
			name: string;
			title: string;
			text: string;
			avatarUrl: string;
		};
		isActive: boolean;
	}) => {
		return (
			<motion.div
				className={`absolute inset-0 p-8 md:p-12 transition-opacity duration-500 ${
					isActive ? "opacity-100 z-10" : "opacity-0 -z-10"
				}`}
				initial={{ opacity: 0 }}
				animate={{ opacity: isActive ? 1 : 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="glass-dark rounded-2xl p-8 h-full flex flex-col relative overflow-hidden border border-gray-800 shadow-xl">
					{/* Background decoration */}
					<div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>

					{/* Quote icon */}
					<Quote className="w-12 h-12 text-primary/20 absolute top-4 right-4" />

					<div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
						<motion.div
							className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30"
							whileHover={{ scale: 1.1 }}
						>
							<img
								src={testimonial.avatarUrl}
								alt={testimonial.name}
								className="w-full h-full object-cover"
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.onerror = null;
									target.src = "https://via.placeholder.com/100?text=Profile";
								}}
							/>
						</motion.div>

						<div className="text-center md:text-left">
							<h3 className="text-2xl font-bold">{testimonial.name}</h3>
							<p className="text-gray-400">{testimonial.title}</p>
						</div>
					</div>

					<div className="flex-grow">
						<blockquote className="text-lg md:text-xl italic text-gray-300 leading-relaxed">
							"{testimonial.text}"
						</blockquote>
					</div>
				</div>
			</motion.div>
		);
	}
);

// Testimonial navigation dots
const NavigationDots = memo(
	({
		total,
		active,
		onSelect,
	}: {
		total: number;
		active: number;
		onSelect: (index: number) => void;
	}) => {
		return (
			<div className="flex justify-center mt-8 space-x-3">
				{Array.from({ length: total }).map((_, index) => (
					<motion.button
						key={index}
						className={`w-3 h-3 rounded-full ${
							active === index ? "bg-primary" : "bg-gray-600"
						}`}
						onClick={() => onSelect(index)}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
					/>
				))}
			</div>
		);
	}
);

export default function Testimonials() {
	const [activeIndex, setActiveIndex] = useState(0);

	const handlePrev = useCallback(() => {
		setActiveIndex((prev) =>
			prev === 0 ? testimonialsData.length - 1 : prev - 1
		);
	}, []);

	const handleNext = useCallback(() => {
		setActiveIndex((prev) =>
			prev === testimonialsData.length - 1 ? 0 : prev + 1
		);
	}, []);

	const handleSelect = useCallback((index: number) => {
		setActiveIndex(index);
	}, []);

	return (
		<section id="testimonials" className="py-24 relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950"></div>
				<div className="absolute inset-0 opacity-30">
					<div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
					<div className="absolute -top-10 -right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
					<div className="absolute -bottom-10 -left-10 w-60 h-60 bg-secondary/5 rounded-full blur-3xl"></div>
				</div>
			</div>

			<div className="container mx-auto px-6">
				<SectionTitle
					title="What Clients Say"
					highlight="Clients"
					subtitle="Feedback from people I've worked with on various projects."
					startDelay={50}
					isHero={false}
				/>

				{/* Testimonials Carousel */}
				<div className="max-w-4xl mx-auto mt-16 relative">
					{/* Navigation arrows */}
					<div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between z-20 px-2 md:px-4">
						<motion.button
							className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-white"
							onClick={handlePrev}
							whileHover={{
								scale: 1.1,
								backgroundColor: "rgba(var(--primary-rgb), 0.2)",
							}}
							whileTap={{ scale: 0.9 }}
						>
							<ArrowLeft className="w-5 h-5" />
						</motion.button>

						<motion.button
							className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-white"
							onClick={handleNext}
							whileHover={{
								scale: 1.1,
								backgroundColor: "rgba(var(--primary-rgb), 0.2)",
							}}
							whileTap={{ scale: 0.9 }}
						>
							<ArrowRight className="w-5 h-5" />
						</motion.button>
					</div>

					{/* Testimonials */}
					<div className="relative h-[500px] md:h-[420px]">
						{testimonialsData.map((testimonial, index) => (
							<TestimonialCard
								key={testimonial.name}
								testimonial={testimonial}
								isActive={activeIndex === index}
							/>
						))}
					</div>

					{/* Navigation dots */}
					<NavigationDots
						total={testimonialsData.length}
						active={activeIndex}
						onSelect={handleSelect}
					/>
				</div>

				{/* Call to action */}
				<motion.div
					className="text-center mt-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<p className="text-lg max-w-xl mx-auto mb-6">
						Ready to work together and create something amazing? Let's discuss
						your project and bring your ideas to life.
					</p>
					<motion.a
						href="#contact"
						className="inline-block neo-brutal bg-gray-800 text-white px-8 py-4 rounded-lg group overflow-hidden relative"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.98 }}
					>
						<span className="absolute inset-0 w-full h-full bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
						<span className="relative z-10">Start a Conversation</span>
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
}
