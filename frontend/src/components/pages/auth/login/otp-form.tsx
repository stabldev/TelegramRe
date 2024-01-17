import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { useAuth } from "~/context/auth";

interface Props {
	onOtpSubmit: (e: CustomEvent) => void;
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
			<div class="flex flex-col md:gap-[0.5vw]">
				<h2 class="font-semibold text-stone-50 md:text-[1.75vw]">
					Email verification.
				</h2>
				<span class="flex max-w-[20vw] self-center text-stone-400 md:text-[1.05vw]">
					Please enter the OTP which we've send to your email to complete.
				</span>
			</div>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-[1vw]"
			>
				<input
					required
					autofocus
                    name="otp"
					placeholder="OTP you recieved"
					minLength={5}
					maxLength={5}
					class="w-full border-stone-700 bg-transparent text-stone-50 md:rounded-[0.65vw] md:border-[0.1vw] md:p-[0.75vw] md:text-[1.1vw]"
				/>
				<button
					disabled={loading()}
					classList={{ "opacity-75": loading() }}
					class="flex items-center justify-center bg-blue-600 font-medium uppercase leading-none text-white transition-opacity md:gap-[1vw] md:rounded-[0.65vw] md:p-[1vw] md:text-[1.1vw]"
				>
					verify
				</button>
			</form>
		</>
	);
};

export default OtpForm;
