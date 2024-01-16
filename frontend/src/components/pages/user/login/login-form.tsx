import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { Show } from "solid-js";
import { useAuth } from "~/context/auth";
import Spinner from "~/icons/spinner";

interface Props {
	onFormSubmit: (e: CustomEvent) => void;
}

const LoginForm = (props: Props) => {
	const { loading, authForm } = useAuth();
	const dispatch = createEventDispatcher(props);

	const handleFormSubmit = (evt: SubmitEvent) => {
		evt.preventDefault();
		const formElement = evt.currentTarget as HTMLFormElement;
		const formData = new FormData(formElement);

		dispatch("formSubmit", formData);
	};

	return (
		<>
			<div class="flex flex-col md:gap-[0.5vw]">
				<h2 class="font-semibold text-stone-50 md:text-[1.75vw]">Sign in to Telegram RE</h2>
				<span class="flex max-w-[17vw] self-center text-stone-400 md:text-[1.05vw]">Sign in via Google or please enter your Email address to get OTP</span>
			</div>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-[1vw]"
			>
				<input
					required
					type="email"
					name="email"
					value={authForm().email}
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
					{loading() ? "please wait..." : "sign in"}
				</button>
				<span class="text-stone-400 md:text-[0.9vw]">Note: If this email doesn't exists, we'll create a new user with this email.</span>
			</form>
		</>
	);
};

export default LoginForm;
