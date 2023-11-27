import { JSX } from "solid-js";
import { cn } from "~/functions/cn";

export function AuthLayout(props: { children?: JSX.Element; class?: string }) {
	return (
		<main class="relative grid h-screen w-screen grid-cols-[1fr_1fr] leading-none text-stone-900">
			<div
				class="bg-cover bg-center bg-no-repeat"
				style={{ "background-image": "url(/images/auth-bg-01.jpg)" }}
			/>
			<div class={cn(props.class, "flex flex-col items-start justify-center bg-stone-100 md:px-[12vw]")}>{props.children}</div>
		</main>
	);
}
