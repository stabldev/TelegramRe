import { JSX } from "solid-js";
import { ChatVector } from "~/vectors/chat_vector";

export function AuthLayout(props: { children?: JSX.Element }) {
	return (
		<main class="w-screen h-screen grid grid-cols-[2fr_1fr]">
			<div class="grid place-items-center">
				<ChatVector class="w-[35vw] h-auto" />
			</div>
			{ props.children }
		</main>
	)
};