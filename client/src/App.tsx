import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";

// Implement code splitting with React.lazy for performance optimization
const Home = lazy(() => import("@/pages/Home"));
const Resume = lazy(() => import("@/pages/Resume"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center">
					<div className="animate-pulse-glow w-8 h-8 rounded-full bg-primary/50"></div>
				</div>
			}
		>
			<Switch>
				<Route path="/" component={Home} />
				<Route path="/resume" component={Resume} />
				<Route component={NotFound} />
			</Switch>
		</Suspense>
	);
}

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate loading screen for 2 seconds
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Toaster />
				{loading ? (
					<LoadingScreen />
				) : (
					<>
						<ScrollProgress />
						<Suspense
							fallback={
								<div className="min-h-screen flex items-center justify-center">
									<div className="text-lg">Loading page...</div>
								</div>
							}
						>
							<Router />
						</Suspense>
					</>
				)}
			</TooltipProvider>
		</QueryClientProvider>
	);
}

export default App;
