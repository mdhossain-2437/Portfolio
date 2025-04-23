import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const RocketPath: React.FC = () => {
	const rocketRef = useRef<HTMLDivElement | null>(null);
	const lastScrollY = useRef<number>(0);
	const [isScrollingUp, setIsScrollingUp] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setIsScrollingUp(currentScrollY < lastScrollY.current);
			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (rocketRef.current) {
			gsap.to(rocketRef.current, {
				scrollTrigger: {
					trigger: ".path-container",
					start: "top top",
					end: "bottom bottom",
					scrub: 1,
				},
				duration: 5,
				ease: "none",
				motionPath: {
					path: "#rocketPath",
					align: "#rocketPath",
					autoRotate: true,
					alignOrigin: [0.5, 0.5], // perfectly centered
				},
			});
		}
	}, []);

	const rocketImage = isScrollingUp
		? "https://i.ibb.co/6xn5gTT/rocket-reverse.png"
		: "https://i.ibb.co/8D1mW7NP/rocket.png";

	return (
		<div className="path-container relative min-h-[4000px] w-full bg-[#0f172a] overflow-hidden">
			{/* 🚀 Rocket With Flame */}
			<div
				ref={rocketRef}
				className="absolute top-0 left-0 z-20 w-10 sm:w-12 md:w-16 lg:w-20 flex flex-col items-center"
			>
				<img
					src={rocketImage}
					alt="Rocket"
					className="w-full h-auto transition-all duration-300 ease-in-out"
				/>
			</div>

			{/* 🌀 SVG Path */}
			<svg
				className="absolute left-1/2 top-24 transform -translate-x-1/2"
				width="501"
				height="100%"
				viewBox="0 0 501 3680"
				fill="none"
				preserveAspectRatio="none"
			>
				<path
					id="rocketPath"
					d="M 1 1.712 h 467 c 17.673 0 32 14.327 32 32 v 350 c 0 17.673 -14.327 32 -32 32 H 33 c -17.673 0 -32 14.327 -32 32 v 340 c 0 17.673 14.327 32 32 32 h 435 c 17.673 0 32 14.327 32 32 v 340 c 0 17.68 -14.327 32 -32 32 H 33 c -17.673 0 -32 14.33 -32 32 v 345 c 0 17.68 14.327 32 32 32 h 435 c 17.673 0 32 14.33 32 32 v 345 c 0 17.68 -14.327 32 -32 32 H 33 c -17.673 0 -32 14.33 -32 32 v 345 c 0 17.68 14.327 32 32 32 h 435 c 17.673 0 32 14.33 32 32 v  350 c 0 17.68 -14.327 32 -32 32 H 33 c -17.673 0 -32 14.33 -32 32 v 340 c 0 17.68 14.327 32 32 32 h 435 c 17.673 0 32 14.33 32 32 v 230"
					stroke="#6366F1"
					strokeWidth="2"
					strokeDasharray="5 5"
				>
					<animate
						attributeName="stroke-dashoffset"
						from="120"
						to="0"
						dur="8s"
						repeatCount="indefinite"
					/>
				</path>
			</svg>
		</div>
	);
};

export default RocketPath;
