import { JSX, Show } from "solid-js";
import { Navigate } from "@solidjs/router";
import { useAuth } from "~/context/auth";
import { cn } from "~/functions/cn";

export function AuthLayout(props: { children?: JSX.Element; class?: string }) {
	const { isAuthenticated } = useAuth();
	return (
		<Show
			when={!isAuthenticated()}
			fallback={<Navigate href={"/"} />}
		>
			<main class="relative grid place-items-center h-screen w-screen bg-base-100 bg-[url(/wallpaper.svg)]">
				<div
					class={cn(
						props.class,
						"flex flex-col items-center text-center relative"
					)}
				>
					{props.children}
					<span class="absolute mx-auto -bottom-8 text-neutral-100 text-sm">Telegram Web RE 1.0</span>
				</div>
			</main>
		</Show>
	);
}
