import type { Component } from "solid-js";
import Sidebar from "./components/sidebar";
import { AppRouter } from "./router";

const App: Component = () => {
	return (
		<>
			<main
				class="relative grid h-screen w-screen grid-cols-[25vw_1fr]"
				style={{
					"background-image":
						"url(https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/pattern-20.svg)"
				}}
			>
				{/* dark overlay for background-image */}
				<div class="absolute inset-0 -z-[9999] bg-black/95" />

				<Sidebar />
				<AppRouter />
			</main>
		</>
	);
};

export default App;
