import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";

interface ScrambledTextProps {
	text: string;
	className?: string;
	scrambleDelay?: number;
	scrambleDuration?: number;
	startDelay?: number;
	once?: boolean;
	charSet?: string;
	id?: string; // Add unique ID for tracking
	shouldActivate?: boolean; // Add property to control when to activate the scrambling effect
}

/**
 * ScrambledText component: Creates a "hacker-style" scrambled text animation
 * where random characters transition to the final text
 */
const ScrambledText = memo(
	({
		text,
		className = "",
		scrambleDelay = 60,
		scrambleDuration = 2800,
		startDelay = 0,
		once = true,
		charSet = "!@#$%^&*()_+-={}[]|;:,.<>?/~`",
		id, // Unique identifier
		shouldActivate = true, // By default, activate the scrambling effect
	}: ScrambledTextProps) => {
		const [displayedText, setDisplayedText] = useState("");
		const [isComplete, setIsComplete] = useState(false);
		const [isMounted, setIsMounted] = useState(false);
		const [shouldAnimate, setShouldAnimate] = useState(false);
		// Track if animation has been shown already
		const [hasAnimated, setHasAnimated] = useState(false);

		// Generate a unique ID if not provided
		const textId =
			id ||
			`scrambled-${text.substring(0, 10).replace(/\s+/g, "-").toLowerCase()}`;

		useEffect(() => {
			setIsMounted(true);

			// Always start with scrambled initial text (visible difference from final text)
			if (shouldActivate && !hasAnimated) {
				setDisplayedText(generateRandomText(text.length, charSet));
			} else if (!shouldActivate && !hasAnimated) {
				// If not activating yet, just show the final text
				setDisplayedText(text);
			}
		}, []);

		// Watch for shouldActivate changes to trigger animation
		useEffect(() => {
			if (shouldActivate && isMounted && !hasAnimated) {
				// Only set shouldAnimate if we haven't animated yet or if we're allowing multiple animations
				setShouldAnimate(true);

				// If once is true, mark as having animated
				if (once) {
					setHasAnimated(true);
				}
			}
		}, [shouldActivate, isMounted, hasAnimated, once]);

		// Start scrambling when shouldAnimate becomes true
		useEffect(() => {
			if (shouldAnimate && isMounted) {
				// Start with scrambled text before beginning animation
				setDisplayedText(generateRandomText(text.length, charSet));

				const timer = setTimeout(() => {
					handleScramble();
				}, startDelay);

				return () => clearTimeout(timer);
			}
		}, [shouldAnimate, isMounted]);

		// Generate initial random text of same length as final text
		const generateRandomText = (length: number, chars: string): string => {
			let result = "";
			for (let i = 0; i < length; i++) {
				result += chars.charAt(Math.floor(Math.random() * chars.length));
			}
			return result;
		};

		const handleScramble = () => {
			// Create a copy of the text as array to track completion status of each character
			const finalTextArray = text.split("");
			const completionStatus = Array(finalTextArray.length).fill(false);

			let scrambleProgress = 0;
			let iterations = 0;
			// Lower for faster animation but still noticeable
			const maxIterations = 15;

			// Calculate a reasonable delay to fit within desired duration
			const effectiveDuration = Math.min(scrambleDuration, 1500);
			const totalPossibleIterations = effectiveDuration / scrambleDelay;

			const interval = setInterval(() => {
				if (
					iterations > maxIterations ||
					scrambleProgress >= finalTextArray.length
				) {
					clearInterval(interval);
					setDisplayedText(text);
					setIsComplete(true);
					return;
				}

				iterations++;

				// Make transition clear and noticeable
				const fixChance = Math.min(0.2 + iterations / 20, 0.5);

				// Build current display text from both scrambled and fixed characters
				let currentText = "";
				for (let i = 0; i < finalTextArray.length; i++) {
					if (completionStatus[i]) {
						// This character is already fixed
						currentText += finalTextArray[i];
					} else if (i < scrambleProgress && Math.random() < fixChance) {
						// Fix this character
						completionStatus[i] = true;
						currentText += finalTextArray[i];
					} else if (i < scrambleProgress) {
						// Scramble this character
						const randomChar = charSet.charAt(
							Math.floor(Math.random() * charSet.length)
						);
						currentText += randomChar;
					} else {
						// Show random character for unprocessed parts
						const randomChar = charSet.charAt(
							Math.floor(Math.random() * charSet.length)
						);
						currentText += randomChar;
					}
				}

				setDisplayedText(currentText);

				// Increase the portion of text being processed in smaller steps
				if (iterations % 1 === 0 && scrambleProgress < finalTextArray.length) {
					scrambleProgress += 1;
				}

				// Check if all characters are fixed
				if (completionStatus.every((status) => status)) {
					clearInterval(interval);
					setIsComplete(true);
				}
			}, scrambleDelay);

			return () => clearInterval(interval);
		};

		return (
			<motion.span
				initial={{ opacity: 1 }}
				animate={{ opacity: 1 }}
				className={className}
			>
				{displayedText || text}
			</motion.span>
		);
	}
);

export default ScrambledText;
