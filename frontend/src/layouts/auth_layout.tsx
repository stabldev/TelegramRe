import { JSX } from "solid-js";

export function AuthLayout(props: { children?: JSX.Element }) {
	return (
		<main class="relative w-screen h-screen grid grid-cols-[2fr_1fr]">
			<div></div>
			{ props.children }
		</main>
	)
};