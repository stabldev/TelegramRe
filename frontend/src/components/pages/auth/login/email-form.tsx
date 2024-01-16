import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { Show } from "solid-js";
import { A } from "solid-start";
import { useAuth } from "~/context/auth";
import Github from "~/icons/github";
import Google from "~/icons/google";
import Spinner from "~/icons/spinner";

interface Props {
	onFormSubmit: (e: CustomEvent) => void;
}

const EmailForm = (props: Props) => {
	const { loading } = useAuth();
	const dispatch = createEventDispatcher(props);

	const handleFormSubmit = (evt: SubmitEvent) => {
		evt.preventDefault();
		const formData = new FormData(evt.currentTarget as HTMLFormElement);
		const email = formData.get("email");

		dispatch("formSubmit", email);
	};

	return (
		<>
			<div class="flex flex-col md:gap-[0.5vw]">
				<h2 class="font-semibold text-stone-50 md:text-[1.75vw]">Login to Telegram RE</h2>
				<span class="flex max-w-[17vw] self-center text-stone-400 md:text-[1.05vw]">
					Use OAuth or login via Email <br /> ( Passwordless )
				</span>
			</div>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-[0.75vw]"
			>
				<div class="w-full grid grid-cols-2 md:gap-[1vw]">
					<button type="button" class="flex items-center bg-stone-800 text-stone-100 md:p-[1vw] leading-none justify-center md:gap-[0.75vw] md:text-[1.1vw] font-medium md:rounded-[0.65vw]">
						<Google class="md:size-[1.5vw]" />
						Google
					</button>
					<button type="button" class="flex items-center bg-stone-800 text-stone-100 md:p-[1vw] leading-none justify-center md:gap-[0.75vw] md:text-[1.1vw] font-medium md:rounded-[0.65vw]">
						<Github class="md:size-[1.5vw]" />
						Github
					</button>
				</div>
				<input
					required
					type="email"
					name="email"
					autofocus
					placeholder="Email address"
					class="w-full border-stone-700 bg-transparent text-stone-50 md:rounded-[0.65vw] md:border-[0.1vw] md:p-[0.75vw] md:text-[1.1vw]"
				/>
				<div class="flex items-center text-stone-50 md:gap-[1vw] md:text-[1vw]">
					<input
						name="keep-me"
						checked
						id="keep-me"
						type="checkbox"
						class="md:size-[1vw]"
					/>
					<label for="keep-me">Keep me signed in</label>
				</div>
				<button
					disabled={loading()}
					classList={{ "opacity-75": loading() }}
					class="flex items-center justify-center bg-blue-600 font-medium uppercase leading-none text-white transition-opacity md:gap-[1vw] md:rounded-[0.65vw] md:p-[1vw] md:text-[1.1vw]"
				>
					<Show when={loading()}>
						<Spinner class="md:size-[1vw]" />
					</Show>
					{loading() ? "please wait..." : "submit"}
				</button>
				<A
					class="text-stone-400 md:text-[1.1vw]"
					href="../register"
				>
					Don't have an account? Register!
				</A>
			</form>
		</>
	);
};

export default EmailForm;
