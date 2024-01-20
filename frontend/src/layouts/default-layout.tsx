import { JSX } from "solid-js";
import Sidebar from "~/components/shared/sidebar";

export function DefaultLayout(props: { children?: JSX.Element }) {
	return (
		<main
			class="2xl:container mx-auto grid h-screen w-screen grid-cols-[21rem_1fr]"
		>
			{/* dark overlay for background-image */}
			<div class="absolute inset-0 -z-[9999] bg-black/95" />

			<Sidebar />
			{props.children}
		</main>
	);
}
