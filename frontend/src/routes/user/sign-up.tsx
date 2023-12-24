import { createSignal } from "solid-js";
import { A } from "solid-start";
import { useAuth } from "~/context/auth";
import { AuthLayout } from "~/layouts/auth_layout";

export default function SignUp() {
	const { signUpUser } = useAuth();

	const handleFormSubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const formData = new FormData(evt.currentTarget as HTMLFormElement);

		await signUpUser(formData.get("username") as string, formData.get("password") as string);
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
						Keep me logged in
					</label>
				</div>
				<input
					type="submit"
					value="Sign up"
					class="cursor-pointer bg-stone-900 font-medium text-white md:rounded-full md:py-[1vw] md:text-[1.1vw]"
				/>
				<span class="self-center md:text-[1.1vw]">
					Don't have an account?&nbsp;
					<A
						href="/user/sign-in/"
						class="font-medium underline"
					>
						Sign in
					</A>
					&nbsp; now!
				</span>
			</form>
		</AuthLayout>
	);
}
