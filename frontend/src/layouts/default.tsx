import { JSX, Show } from "solid-js";
import Sidebar from "~/components/shared/sidebar";
import { useAuth } from "~/context/auth";
import AuthLayout from "./auth";

const DefaultLayout = (props: { children?: JSX.Element }) => {
	const { isAuthenticated } = useAuth();

	return (
		<Show
			when={isAuthenticated()}
			fallback={<AuthLayout />}
		>
			<main class="mx-auto grid h-screen w-screen grid-cols-[21rem_1fr_auto] bg-[url(/wallpaper.svg)]">
				{/* dark overlay for background-image */}
				<div class="absolute inset-0 -z-[9999] bg-base-100" />

				<Sidebar />
				{props.children}
			</main>
		</Show>
	);
};

export default DefaultLayout;
