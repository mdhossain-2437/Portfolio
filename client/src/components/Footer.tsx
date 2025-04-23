import { motion } from "framer-motion";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	// Smooth scroll function
	const scrollToSection = (sectionId: string) => {
		const section = document.getElementById(sectionId);

		if (section) {
			window.scrollTo({
				top: section.offsetTop - 80,
				behavior: "smooth",
			});
		}
	};

	const socialLinks = [
		{ name: "GitHub", url: "https://github.com/mdhossain-2437" },
		{ name: "LinkedIn", url: "https://linkedin.com/in/mdhossain2437" },
		{ name: "Twitter", url: "https://twitter.com/mdhossain2437" },
		{ name: "Instagram", url: "https://instagram.com/delowarhossain874" },
	];

	return (
		<footer className="bg-gray-900 py-10 relative overflow-hidden">
			{/* Background decorations */}
			<div className="absolute inset-0 -z-10 opacity-10">
				<div className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl -bottom-48 -right-48"></div>
				<div className="absolute w-96 h-96 rounded-full bg-secondary/20 blur-3xl top-10 left-10"></div>
				<motion.div
					className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
					animate={{
						opacity: [0.2, 0.5, 0.2],
						scaleX: [0.9, 1.1, 0.9],
					}}
					transition={{
						duration: 5,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</div>

			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<motion.div
						className="mb-6 md:mb-0"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<motion.a
							href="#"
							className="text-2xl font-bold font-clash tracking-wider group relative"
							onClick={(e) => {
								e.preventDefault();
								scrollToSection("home");
							}}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<span className="text-primary group-hover:animate-pulse">D</span>
							elowar
							<span className="text-secondary">.</span>
							<span className="text-primary group-hover:animate-pulse">
								dev
							</span>
							<motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
						</motion.a>
						<motion.p
							className="text-gray-400 mt-2"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2, duration: 0.5 }}
						>
							Crafting digital experiences with code
						</motion.p>
					</motion.div>

					<motion.div
						className="flex flex-wrap justify-center gap-6"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						{["about", "skills", "projects", "services", "contact"].map(
							(item, i) => (
								<motion.button
									key={item}
									onClick={() => scrollToSection(item)}
									className="hover:text-primary transition-colors cursor-pointer relative group"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.1 * i, duration: 0.3 }}
								>
									{item.charAt(0).toUpperCase() + item.slice(1)}
									<motion.span
										className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"
										whileHover={{ width: "100%" }}
									/>
								</motion.button>
							)
						)}
					</motion.div>
				</div>

				{/* Social links */}
				<motion.div
					className="mt-8 flex justify-center space-x-6"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{socialLinks.map((link, i) => (
						<motion.a
							key={link.name}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-primary transition-colors duration-300"
							whileHover={{ scale: 1.2, rotate: 5 }}
							whileTap={{ scale: 0.9 }}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 * i, duration: 0.3 }}
						>
							{link.name}
						</motion.a>
					))}
				</motion.div>

				<motion.div
					className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<motion.p
						className="text-gray-400 text-sm mb-2 md:mb-0"
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						&copy; {currentYear} MD Delowar Hossain. All rights reserved.
					</motion.p>

					<motion.div
						className="text-gray-400 text-sm"
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						<p>Designed & Developed By Delowar Hossain</p>
					</motion.div>
				</motion.div>
			</div>
		</footer>
	);
}
