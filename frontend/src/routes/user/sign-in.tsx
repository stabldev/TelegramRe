import { A } from "solid-start";
import { AuthLayout } from "~/layouts/auth-layout";

export default function SignIn() {
	const handleFormSubmit = (evt: SubmitEvent) => {
		evt.preventDefault();
		const formElement = evt.currentTarget as HTMLFormElement;
		const formData = new FormData(formElement);
		console.log(formData);
	};

	return (
		<AuthLayout class="md:w-[25vw] md:gap-[2vw]">
			<img
				src="/favicon.ico"
				class="md:size-[10vw]"
			/>
			<div class="flex flex-col md:gap-[0.5vw]">
				<h2 class="font-semibold text-stone-50 md:text-[1.75vw]">Sign in to Telegram RE</h2>
				<span class="flex max-w-[17vw] self-center text-stone-400 md:text-[1.05vw]">Sign in via Google or please enter your Email address to get OTP</span>
			</div>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-[1vw]"
			>
				<input
					name="email"
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
				<button class="bg-blue-600 font-medium uppercase leading-none text-white md:rounded-[0.65vw] md:p-[1vw] md:text-[1.1vw]">sign in</button>
				<span class="text-stone-400 md:text-[0.9vw]">Note: If this email doesn't exists, we'll create a new user with this email.</span>
			</form>
		</AuthLayout>
	);
}
