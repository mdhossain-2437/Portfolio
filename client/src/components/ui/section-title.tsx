import { memo, lazy, Suspense, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ScrambledText from "./scrambled-text";

interface SectionTitleProps {
	title: string;
	subtitle?: string;
	highlight?: string;
	className?: string;
	titleClassName?: string;
	subtitleClassName?: string;
	withAccent?: boolean;
	center?: boolean;
	startDelay?: number;
	id?: string;
	isHero?: boolean;
}

/**
 * Reusable section title component with scrambled text animation
 * and consistent styling across the portfolio
 */
const SectionTitle = memo(
	({
		title,
		subtitle,
		highlight,
		className = "",
		titleClassName = "",
		subtitleClassName = "",
		withAccent = true,
		center = true,
		startDelay = 0,
		id,
		isHero = false,
	}: SectionTitleProps) => {
		// Replace the highlighted text with styled version
		const formattedTitle = highlight
			? title.replace(
					highlight,
					`<span class="text-primary">${highlight}</span>`
			  )
			: title;

		// Reduced startDelay to make it load faster
		const effectiveStartDelay = Math.min(startDelay, 150);

		// Create a more noticeable scramble effect
		const scrambleDuration = 1500; // Increased from 1000 to 1500ms

		// Generate section ID if not provided
		const sectionId =
			id || `section-${title.toLowerCase().replace(/\s+/g, "-")}`;

		// Ref for the section title element
		const sectionRef = useRef<HTMLDivElement>(null);
		// State to track if the section has been viewed once
		const [hasBeenViewed, setHasBeenViewed] = useState(false);
		// State to control when to trigger the scrambling effect
		const [shouldScramble, setShouldScramble] = useState(isHero);

		// Setup intersection observer to detect when section comes into view
		useEffect(() => {
			// If this is the hero section, we don't need to observe it
			if (isHero) return;

			const observer = new IntersectionObserver(
				(entries) => {
					const [entry] = entries;
					if (entry.isIntersecting && !hasBeenViewed) {
						// Only trigger scrambling effect once when first coming into view
						setShouldScramble(true);
						setHasBeenViewed(true);
					}
				},
				{
					root: null,
					threshold: 0.3, // Trigger when 30% of the element is visible
				}
			);

			if (sectionRef.current) {
				observer.observe(sectionRef.current);
			}

			return () => {
				if (sectionRef.current) {
					observer.unobserve(sectionRef.current);
				}
			};
		}, [hasBeenViewed, isHero]);

		return (
			<div
				ref={sectionRef}
				className={`${className} ${center ? "text-center" : ""} mb-12`}
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.3, delay: effectiveStartDelay / 1000 }}
				>
					{withAccent && (
						<div className="flex justify-center mb-3">
							<div className="h-1 w-10 bg-primary rounded-full mr-2"></div>
							<div className="h-1 w-6 bg-secondary rounded-full mr-2"></div>
							<div className="h-1 w-3 bg-accent rounded-full"></div>
						</div>
					)}

					<h2
						className={`text-4xl md:text-5xl font-bold font-clash mb-4 ${titleClassName}`}
					>
						{highlight ? (
							<>
								{title.split(highlight).map((part, index) => (
									<span key={index}>
										{index > 0 && (
											<span className="text-primary">{highlight}</span>
										)}
										{part && (
											<ScrambledText
												text={part}
												startDelay={shouldScramble ? effectiveStartDelay : 0}
												scrambleDelay={70}
												scrambleDuration={scrambleDuration}
												id={`${sectionId}-part-${index}`}
												charSet="!@#$%^&*()_+{}<>?|"
												once={true}
												shouldActivate={shouldScramble}
											/>
										)}
									</span>
								))}
							</>
						) : (
							<ScrambledText
								text={title}
								startDelay={shouldScramble ? effectiveStartDelay : 0}
								scrambleDelay={70}
								scrambleDuration={scrambleDuration}
								id={sectionId}
								charSet="!@#$%^&*()_+{}<>?|"
								once={true}
								shouldActivate={shouldScramble}
							/>
						)}
					</h2>

					{subtitle && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: 0.5,
								delay: (effectiveStartDelay + 200) / 1000,
							}}
							className={`text-lg ${
								center ? "mx-auto max-w-2xl" : ""
							} ${subtitleClassName}`}
						>
							{subtitle}
						</motion.p>
					)}
				</motion.div>
			</div>
		);
	}
);

export default SectionTitle;
