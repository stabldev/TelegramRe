import { JSX, Show } from "solid-js";
import { Navigate } from "@solidjs/router";
import Sidebar from "~/components/shared/sidebar";
import { useAuth } from "~/context/auth";

export function DefaultLayout(props: { children?: JSX.Element }) {
	const { isAuthenticated } = useAuth();

	return (
		<Show
			when={isAuthenticated()}
			fallback={<Navigate href={"/auth/login"} />}
		>
			<main class="mx-auto grid h-screen w-screen grid-cols-[21rem_1fr_auto] bg-[url(/wallpaper.svg)]">
				{/* dark overlay for background-image */}
				<div class="absolute inset-0 -z-[9999] bg-base-100" />

				<Sidebar />
				{props.children}
			</main>
		</Show>
	);
}
