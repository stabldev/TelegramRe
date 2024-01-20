import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { useAuth } from "~/context/auth";

interface Props {
	onOtpSubmit: (e: CustomEvent) => void;
    authType: "login" | "register";
}

const OtpForm = (props: Props) => {
	const { loading } = useAuth();
	const dispatch = createEventDispatcher(props);

	const handleFormSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		const otp = formData.get("otp");

		dispatch("otpSubmit", otp);
	};

	return (
		<>
			<div class="flex flex-col md:gap-2">
				<h2 class="font-semibold text-stone-50 md:text-2xl">
					Email verification.
				</h2>
				<span class="flex self-center text-stone-400 md:text-sm">
					Please enter the OTP which we've send to <br /> your email to complete.
				</span>
			</div>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-3"
			>
				<input
					required
					autofocus
                    name="otp"
					placeholder="OTP you recieved"
					minLength={5}
					maxLength={5}
					class="w-full border-stone-700 bg-transparent text-stone-50 md:rounded-lg border md:p-2.5 md:text-base"
				/>
				<button
					disabled={loading()}
					classList={{ "opacity-75": loading() }}
					class="bg-blue-600 font-medium uppercase text-white transition-opacity md:rounded-lg md:p-2.5 md:text-sm"
				>
					verify
				</button>
			</form>
		</>
	);
};

export default OtpForm;
