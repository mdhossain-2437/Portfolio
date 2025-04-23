import { useEffect, useState, useCallback, memo, useRef } from "react";
import { motion } from "framer-motion";
import ScrambledText from "@/components/ui/scrambled-text";

const Hero = memo(function Hero() {
	const [isReady, setIsReady] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [shouldScramble, setShouldScramble] = useState(false);
	const heroRef = useRef<HTMLDivElement>(null);

	// Memoize the scroll function using useCallback to prevent re-renders
	const handleScrollToAbout = useCallback(() => {
		document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
	}, []);

	useEffect(() => {
		// Show hero content after loading screen
		const timer = setTimeout(() => {
			setIsReady(true);
		}, 200);

		// Delay visibility for animation sequence
		const visibilityTimer = setTimeout(() => {
			setIsVisible(true);
		}, 300);

		// Setup intersection observer for hero section
		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.isIntersecting) {
					// Trigger scrambling effect when hero is in view
					setShouldScramble(true);
					// Unobserve once triggered
					if (heroRef.current) {
						observer.unobserve(heroRef.current);
					}
				}
			},
			{
				root: null,
				threshold: 0.3, // Trigger when 30% of the element is visible
			}
		);

		if (heroRef.current) {
			observer.observe(heroRef.current);
		}

		return () => {
			clearTimeout(timer);
			clearTimeout(visibilityTimer);
			if (heroRef.current) {
				observer.unobserve(heroRef.current);
			}
		};
	}, []);

	return (
		<section
			id="home"
			ref={heroRef}
			className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
		>
			{/* Gradient Background with Glass Morphism Grid - Fusion of styles */}
			<div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
				{/* Grid pattern overlay for visual interest */}
				<div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>

				{/* Glass panels floating for depth */}
				<div className="glass-panels">
					<motion.div
						className="absolute glass opacity-20 rounded-2xl"
						style={{ width: "300px", height: "300px", left: "10%", top: "20%" }}
						animate={{
							y: [0, -20, 0],
							rotate: [0, 5, 0],
							scale: [1, 1.05, 1],
						}}
						transition={{
							duration: 15,
							repeat: Infinity,
							repeatType: "reverse",
						}}
					/>
					<motion.div
						className="absolute glass opacity-10 rounded-2xl"
						style={{
							width: "200px",
							height: "200px",
							right: "15%",
							top: "30%",
						}}
						animate={{
							y: [0, 20, 0],
							rotate: [0, -5, 0],
							scale: [1, 1.03, 1],
						}}
						transition={{
							duration: 12,
							repeat: Infinity,
							repeatType: "reverse",
							delay: 0.5,
						}}
					/>
					<motion.div
						className="absolute glass opacity-15 rounded-full"
						style={{
							width: "150px",
							height: "150px",
							left: "20%",
							bottom: "20%",
						}}
						animate={{
							y: [0, 15, 0],
							x: [0, 10, 0],
							scale: [1, 1.1, 1],
						}}
						transition={{
							duration: 18,
							repeat: Infinity,
							repeatType: "reverse",
							delay: 0.7,
						}}
					/>
				</div>

				{/* Animated stars - more dynamic and interactive */}
				<div className="stars-container">
					{[...Array(15)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute rounded-full bg-white"
							style={{
								width: Math.random() * 3 + 1 + "px",
								height: Math.random() * 3 + 1 + "px",
								left: Math.random() * 100 + "%",
								top: Math.random() * 100 + "%",
								opacity: Math.random() * 0.5 + 0.3,
							}}
							animate={{
								y: [0, Math.random() * 15 - 7.5],
								x: [0, Math.random() * 15 - 7.5],
								opacity: [0.3, 0.7, 0.3],
								scale: [1, Math.random() * 0.5 + 1, 1],
							}}
							transition={{
								duration: Math.random() * 5 + 3,
								repeat: Infinity,
								repeatType: "reverse",
							}}
						/>
					))}
				</div>
			</div>

			<div className="container mx-auto px-6 py-12 z-10 relative">
				<div className="max-w-4xl mx-auto text-center">
					{/* Enhanced Scrambled Text Animation with glowing effect */}
					<motion.div
						className="mb-8 relative"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 30 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
					>
						<div className="absolute blur-3xl opacity-30 bg-primary/30 w-full h-full rounded-full transform -translate-y-1/2"></div>
						<h1 className="text-4xl md:text-7xl font-bold font-clash">
							<span className="block mb-2">
								<ScrambledText
									text="Hi, I'm Delowar"
									scrambleDelay={30}
									startDelay={300}
									charSet="!@#$%^&*()_+{}[]<>?/"
									shouldActivate={shouldScramble}
								/>
							</span>
							<span className="text-primary">
								<ScrambledText
									text="Hossain"
									scrambleDelay={30}
									startDelay={500}
									charSet="{}>?|:+_)(*&^%$#@!"
									shouldActivate={shouldScramble}
								/>
							</span>
						</h1>
					</motion.div>

					{/* Animated journey path with staggered animation */}
					<motion.div
						className="flex flex-wrap justify-center items-center font-light mb-12 text-xl md:text-2xl"
						initial={{ opacity: 0 }}
						animate={{ opacity: isVisible ? 1 : 0 }}
						transition={{ duration: 0.3, delay: 0.7 }}
					>
						<motion.span
							className="inline-block px-3 py-1 m-1 glass rounded-md"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
							transition={{ duration: 0.3, delay: 0.8 }}
						>
							Non CSE
						</motion.span>

						<motion.span
							className="inline-block mx-1 text-primary"
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{
								opacity: isVisible ? 1 : 0,
								scale: isVisible ? 1 : 0.5,
							}}
							transition={{ duration: 0.2, delay: 0.9 }}
						>
							➜
						</motion.span>

						<motion.span
							className="inline-block px-3 py-1 m-1 glass rounded-md"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
							transition={{ duration: 0.3, delay: 1.0 }}
						>
							Web Development
						</motion.span>

						<motion.span
							className="inline-block mx-1 text-primary"
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{
								opacity: isVisible ? 1 : 0,
								scale: isVisible ? 1 : 0.5,
							}}
							transition={{ duration: 0.2, delay: 1.1 }}
						>
							➜
						</motion.span>

						<motion.span
							className="inline-block px-3 py-1 m-1 glass rounded-md"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
							transition={{ duration: 0.3, delay: 1.2 }}
						>
							AI Dreamer
						</motion.span>
					</motion.div>

					{/* Interactive CTA Button with enhanced effects */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
						transition={{ duration: 0.3, delay: 1.3 }}
						className="relative"
					>
						<div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent blur-md opacity-30 rounded-lg group-hover:opacity-100 transition duration-500"></div>
						<button
							className="relative neo-brutal bg-gray-900 border-2 border-primary text-white px-8 py-5 text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-primary/20 group overflow-hidden"
							onClick={handleScrollToAbout}
						>
							<span className="relative z-10 flex items-center">
								<span>Enter My Universe</span>
								<motion.span
									className="inline-block ml-2 text-xl"
									animate={{ x: [0, 5, 0] }}
									transition={{
										duration: 1.5,
										repeat: Infinity,
										repeatType: "reverse",
									}}
								>
									→
								</motion.span>
							</span>
							<span className="absolute inset-0 bg-gradient-to-r from-primary/40 to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
						</button>
					</motion.div>
				</div>
			</div>

			<motion.div
				className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
				initial={{ opacity: 0, y: -10 }}
				animate={{
					opacity: [0.4, 0.8, 0.4],
					y: [0, 10, 0],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					repeatType: "loop",
					delay: 1.5,
				}}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					whileHover={{ scale: 1.2 }}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					/>
				</motion.svg>
			</motion.div>
		</section>
	);
});

export default Hero;
