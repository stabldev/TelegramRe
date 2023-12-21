import { JSX } from "solid-js";
import Sidebar from "~/components/sidebar";

export function DefaultLayout(props: { children?: JSX.Element }) {
	return (
		<main
			class="relative grid h-screen w-screen grid-cols-[25vw_1fr]"
			style={{
				"background-image": "url(/wallpaper.svg)"
			}}
		>
			{/* dark overlay for background-image */}
			<div class="absolute inset-0 -z-[9999] bg-black/95" />

			<Sidebar />
			{props.children}
		</main>
	);
}
