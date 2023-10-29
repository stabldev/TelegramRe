import { JSX } from "solid-js";

export function AuthLayout(props: { children?: JSX.Element }) {
	return (
		<main class="relative w-screen h-screen grid grid-cols-[1fr_1fr]">
			<div></div>
			<div class="grid place-items-center bg-stone-100">
				{ props.children }
			</div>
		</main>
	)
};