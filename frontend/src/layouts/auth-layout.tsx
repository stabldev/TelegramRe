import { JSX, Show } from "solid-js";
import { Navigate } from "solid-start";
import { useAuth } from "~/context/auth";
import { cn } from "~/functions/cn";

export function AuthLayout(props: { children?: JSX.Element; class?: string }) {
	const { isAuthenticated } = useAuth();
	return (
		<Show
			when={!isAuthenticated()}
			fallback={ <Navigate href={"/"} /> }
		>
			<main class="relative grid h-screen w-screen place-items-center bg-stone-900">
				<div class={cn(props.class, "flex flex-col items-center text-center")}>{props.children}</div>
			</main>
		</Show>
	);
}
