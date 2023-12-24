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
		<AuthLayout class="md:gap-[3vw]">
			<div class="flex flex-col md:gap-[0.5vw]">
				<h2 class="font-bold md:text-[2vw]">Welcome to Telegram-re</h2>
				<h4 class="opacity-75 md:text-[1.2vw]">A Telegram inspired web messaging experience</h4>
			</div>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-[1vw]"
			>
				<div class="flex flex-col md:gap-[0.25vw]">
					<label
						class="font-medium opacity-50 md:text-[1vw]"
						for="username"
					>
						Username:
					</label>
					<input
						autofocus
						type="text"
						id="username"
						name="username"
						placeholder="eg: forger"
						class="border-stone-400 bg-transparent font-medium transition-colors focus:border-stone-900 md:border-b-[0.15vw] md:py-[0.5vw] md:text-[1.1vw]"
					/>
				</div>
				<div class="flex flex-col md:gap-[0.25vw]">
					<label
						class="font-medium opacity-50 md:text-[1vw]"
						for="password"
					>
						Password:
					</label>
					<input
						type="text"
						id="password"
						name="password"
						placeholder="eg: forger-****"
						class="border-stone-400 bg-transparent font-medium transition-colors focus:border-stone-900 md:border-b-[0.15vw] md:py-[0.5vw] md:text-[1.1vw]"
					/>
				</div>
				<div class="flex flex-col md:gap-[0.25vw]">
					<label
						class="font-medium opacity-50 md:text-[1vw]"
						for="confirm-password"
					>
						Confirm Password:
					</label>
					<input
						type="text"
						id="confirm-password"
						name="confirm-password"
						placeholder="eg: forger-****"
						class="border-stone-400 bg-transparent font-medium transition-colors focus:border-stone-900 md:border-b-[0.15vw] md:py-[0.5vw] md:text-[1.1vw]"
					/>
				</div>
				<div class="flex items-center md:gap-[0.5vw]">
					<input
						checked
						type="checkbox"
						id="remember-me"
						name="remember-me"
						class="accent-stone-900"
					/>
					<label
						for="remember-me"
						class="opacity-75 md:text-[1vw]"
					>
						Agree with Terms and conditions
					</label>
				</div>
				<input
					type="submit"
					value="Sign in"
					class="cursor-pointer bg-stone-900 font-medium text-white md:rounded-full md:py-[1vw] md:text-[1.1vw]"
				/>
				<span class="self-center md:text-[1.1vw]">
					Don't have an account?&nbsp;
					<A
						href="/user/sign-up/"
						class="font-medium underline"
					>
						Sign up
					</A>
					&nbsp; now!
				</span>
			</form>
		</AuthLayout>
	);
}
