import { createEventDispatcher } from "@solid-primitives/event-dispatcher";

interface Props {
	onPasswordSubmit: (e: CustomEvent) => void;
}

const PasswordForm = (props: Props) => {
	const dispatch = createEventDispatcher(props);

	const handleFormSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		dispatch("passwordSubmit", formData);
	};

	return (
		<>
			<div class="flex flex-col items-center md:gap-[0.5vw]">
				<h2 class="flex items-center font-semibold text-stone-50 md:gap-[0.75vw] md:text-[1.75vw]">Complete Verification!</h2>
				<span class="flex max-w-[17vw] self-center text-stone-400 md:text-[1.05vw]">Please enter your Password as a final verification</span>
			</div>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-[1vw]"
			>
				<input
					autofocus
					name="password"
					placeholder="Password"
					class="w-full border-stone-700 bg-transparent text-stone-50 md:rounded-[0.65vw] md:border-[0.1vw] md:p-[0.75vw] md:text-[1.1vw]"
				/>
				<button class="bg-blue-600 font-medium uppercase leading-none text-white md:rounded-[0.65vw] md:p-[1vw] md:text-[1.1vw]">Verify</button>
			</form>
		</>
	);
};

export default PasswordForm;
