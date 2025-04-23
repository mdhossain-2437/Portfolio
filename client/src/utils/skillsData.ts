import { ReactNode } from "react";
import {
	SiHtml5,
	SiCss3,
	SiJavascript,
	SiReact,
	SiTailwindcss,
	SiGit,
	SiVsco,
	SiFigma,
	SiNodedotjs,
	SiMongodb,
	SiThreedotjs,
	SiTypescript,
} from "react-icons/si";

interface Skill {
	name: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const coreSkills: Skill[] = [
	{
		name: "HTML5",
		icon: SiHtml5,
	},
	{
		name: "CSS3",
		icon: SiCss3,
	},
	{
		name: "JavaScript",
		icon: SiJavascript,
	},
	{
		name: "React",
		icon: SiReact,
	},
];

export const toolsSkills: Skill[] = [
	{
		name: "Tailwind",
		icon: SiTailwindcss,
	},
	{
		name: "Git",
		icon: SiGit,
	},
	{
		name: "VS Code",
		icon: SiVsco,
	},
	{
		name: "Figma",
		icon: SiFigma,
	},
];

export const learningSkills: Skill[] = [
	{
		name: "Node.js",
		icon: SiNodedotjs,
	},
	{
		name: "MongoDB",
		icon: SiMongodb,
	},
	{
		name: "Three.js",
		icon: SiThreedotjs,
	},
	{
		name: "TypeScript",
		icon: SiTypescript,
	},
];

export const skillsData = {
	coreSkills,
	toolsSkills,
	learningSkills,
};
