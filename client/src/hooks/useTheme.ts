import { useState, useEffect } from "react";

type Theme = "dark";

export default function useTheme() {
	// Always use dark theme
	const getInitialTheme = (): Theme => {
		return "dark";
	};

	const [theme, setTheme] = useState<Theme>(getInitialTheme);

	// Set theme mode (only dark is supported)
	const setMode = (mode: Theme) => {
		window.localStorage.setItem("theme", mode);
		setTheme(mode);
	};

	// No toggle function needed as we only have dark mode

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light");
		root.classList.add("dark");
	}, []);

	return { theme, setTheme };
}
