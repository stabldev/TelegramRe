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
		<AuthLayout class="md:gap-[2vw] md:w-[25vw]">
			<img
				src="/favicon.ico"
				class="md:size-[10vw]"
			/>
			<div class="flex flex-col md:gap-[0.5vw]">
				<h2 class="text-stone-50 md:text-[1.75vw] font-semibold">Sign in to Telegram RE</h2>
				<span class="text-stone-400 max-w-[17vw] flex self-center md:text-[1.05vw]">Sign in via Google or please enter your Email address to get OTP</span>
			</div>
			<form class="w-full flex flex-col md:gap-[1vw]">
				<input
					placeholder="Email address"
					class="w-full bg-transparent border-stone-700 md:border-[0.1vw] md:p-[0.75vw] md:rounded-[0.65vw] text-stone-50 md:text-[1.1vw]"
				/>
				<div class="text-stone-50 md:text-[1vw] flex items-center md:gap-[1vw]">
					<input checked id="keep-me" type="checkbox" class="md:size-[1vw]" />
					<label for="keep-me">Keep me signed in</label>
				</div>
				<button class="uppercase bg-blue-600 text-white leading-none md:text-[1.1vw] md:p-[1vw] md:rounded-[0.65vw] font-medium">
					sign in
				</button>
				<span class="text-stone-400 md:text-[0.9vw]">Note: If this email doesn't exists, we'll create a new user with this email.</span>
			</form>
		</AuthLayout>
	);
}
