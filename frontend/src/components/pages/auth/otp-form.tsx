import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { useAuth } from "~/context/auth";
import At from "~/icons/at";

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
				<h2 class="font-semibold text-accent md:text-2xl">Email verification.</h2>
				<span class="flex self-center text-secondary md:text-sm">
					Please enter the OTP which we've send to <br /> your email to complete.
				</span>
			</div>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-3"
			>
				<input
					autofocus
					required
					name="otp"
					minLength={5}
					maxLength={5}
					placeholder="OTP you recieved"
					class="w-full bg-transparent text-accent border-2 border-neutral focus-within:border-primary md:rounded-lg md:p-2.5 md:text-base"
				/>
				<button
					disabled={loading()}
					classList={{ "opacity-75": loading() }}
					class="btn btn-primary uppercase"
				>
					verify
				</button>
			</form>
		</>
	);
};

export default OtpForm;
