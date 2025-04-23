import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("home");

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			// Change navbar style on scroll
			if (window.scrollY > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}

			// Determine active section for highlighting in navbar
			const sections = document.querySelectorAll<HTMLElement>("section[id]");
			let currentSection = "";

			sections.forEach((section) => {
				const sectionTop = section.offsetTop - 100;
				const sectionHeight = section.offsetHeight;

				if (
					window.scrollY >= sectionTop &&
					window.scrollY < sectionTop + sectionHeight
				) {
					currentSection = section.getAttribute("id") || "";
				}
			});

			if (currentSection !== activeSection && currentSection) {
				setActiveSection(currentSection);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [activeSection]);

	// Smooth scroll function
	const scrollToSection = (sectionId: string) => {
		const section = document.getElementById(sectionId);

		if (section) {
			// Close mobile menu if open
			setMobileMenuOpen(false);

			window.scrollTo({
				top: section.offsetTop - 80,
				behavior: "smooth",
			});
		}
	};

	const navLinks = [
		{ name: "About", href: "about" },
		{ name: "Skills", href: "skills" },
		{ name: "Projects", href: "projects" },
		{ name: "Services", href: "services" },
		{ name: "Dream", href: "dream" },
		{ name: "Contact", href: "contact" },
	];

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
				scrolled
					? "py-1 backdrop-blur-md bg-gray-900/80"
					: "py-3 bg-transparent"
			}`}
		>
			<nav
				className={`${
					scrolled ? "shadow-lg" : ""
				} mx-auto px-6 py-2 flex justify-between items-center max-w-7xl`}
			>
				<div className="flex items-center">
					<a
						href="#"
						className="text-2xl font-bold font-clash tracking-wider group"
						onClick={(e) => {
							e.preventDefault();
							scrollToSection("home");
						}}
					>
						<span className="text-primary group-hover:animate-pulse">D</span>
						elowar
						<span className="text-secondary">.</span>
						<span className="text-primary group-hover:animate-pulse">dev</span>
					</a>
				</div>

				<div className="hidden md:flex items-center justify-center space-x-1 flex-1 mx-4">
					{navLinks.map((link) => (
						<motion.button
							key={link.name}
							onClick={() => scrollToSection(link.href)}
							className={`px-3 py-2 rounded-md mx-1 transition-all duration-300 ${
								activeSection === link.href
									? "text-white bg-primary/20 font-medium"
									: "text-gray-300 hover:text-white hover:bg-gray-800/50"
							}`}
							whileHover={{ y: -2 }}
							whileTap={{ scale: 0.95 }}
						>
							{link.name}
						</motion.button>
					))}
				</div>

				<div className="hidden md:block">
					<Link href="/resume">
						<motion.a
							className="neo-brutal bg-primary/90 text-white px-4 py-2 rounded-md cursor-pointer"
							whileHover={{
								scale: 1.05,
								backgroundColor: "rgba(var(--primary-rgb), 1)",
							}}
							whileTap={{ scale: 0.95 }}
						>
							Resume
						</motion.a>
					</Link>
				</div>

				<button
					className="md:hidden"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label="Toggle mobile menu"
				>
					<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						{mobileMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</motion.div>
				</button>
			</nav>

			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="md:hidden backdrop-blur-md bg-gray-900/90 border-t border-gray-800"
					>
						<div className="px-4 pt-2 pb-3 space-y-1">
							{navLinks.map((link) => (
								<motion.button
									key={link.name}
									onClick={() => scrollToSection(link.href)}
									className={`w-full text-left block px-3 py-2 rounded-md mb-2 ${
										activeSection === link.href
											? "text-white bg-primary/20 font-medium"
											: "text-gray-300 hover:text-white hover:bg-gray-800/50"
									}`}
									whileTap={{ scale: 0.95 }}
								>
									{link.name}
								</motion.button>
							))}
							<div className="pt-4 pb-3 border-t border-gray-700">
								<Link href="/resume">
									<motion.a
										className="flex items-center justify-center w-full neo-brutal bg-primary/90 text-white px-4 py-2 rounded-md cursor-pointer"
										whileTap={{ scale: 0.95 }}
									>
										Resume
									</motion.a>
								</Link>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
