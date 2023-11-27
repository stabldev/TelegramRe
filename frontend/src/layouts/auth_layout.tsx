import { JSX } from "solid-js";
import { cn } from "~/functions/cn";

export function AuthLayout(props: { children?: JSX.Element; class?: string }) {
	return (
		<main class="relative w-screen h-screen grid grid-cols-[1fr_1fr] text-stone-900 leading-none">
			<div
				class="bg-no-repeat bg-cover bg-center"
				style={{"background-image": "url(/images/auth-bg-01.jpg)"}}
			></div>
			<div class={cn(props.class, "flex flex-col items-start justify-center bg-stone-100 md:px-[12vw]")}>
				{ props.children }
			</div>
		</main>
	)
};