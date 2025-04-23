import { Monitor, Palette, BookOpen } from "lucide-react";

interface Service {
	title: string;
	description: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	features: string[];
	iconColor: string;
	bgColor: string;
}

export const servicesData: Service[] = [
	{
		title: "Web Development",
		description:
			"Custom websites and web applications built with modern technologies and best practices.",
		icon: Monitor,
		features: [
			"Responsive mobile-first design",
			"Performance optimization",
			"SEO-friendly structure",
			"Interactive UI with modern frameworks",
			"API integrations and backend solutions",
		],
		iconColor: "text-primary",
		bgColor: "bg-primary/20",
	},
	{
		title: "UI/UX Design",
		description:
			"User-centered design solutions that enhance usability and create delightful experiences.",
		icon: Palette,
		features: [
			"User research & testing",
			"Wireframing & prototyping",
			"Visual design & branding",
			"Interactive mockups",
			"Accessibility compliance",
		],
		iconColor: "text-secondary",
		bgColor: "bg-secondary/20",
	},
	{
		title: "Consulting & Training",
		description:
			"Expert guidance and knowledge sharing to empower your team with modern web skills.",
		icon: BookOpen,
		features: [
			"Code review & optimization",
			"Team training workshops",
			"Technical project planning",
			"Best practice implementation",
			"Performance audits",
		],
		iconColor: "text-accent",
		bgColor: "bg-accent/20",
	},
];
