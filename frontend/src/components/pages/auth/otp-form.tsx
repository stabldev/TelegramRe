import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { Show } from "solid-js";
import Spinner from "~/components/ui/spinner";
import TextInput from "~/components/ui/text-input";
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
			<div class="flex flex-col md:gap-3">
				<h2 class="font-medium text-accent md:text-3xl">
					Email verification
				</h2>
				<span class="flex self-center text-neutral-100 md:text-base">
					Please enter the OTP which we've send to <br /> your email address
					to complete.
				</span>
			</div>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-3"
			>
				<TextInput inputProps={{
					autofocus: true,
					required: true,
					minLength: 5,
					maxLength: 5,
					type: "text",
					name: "otp",
					placeholder: "OTP",
				}} />
				<button
					disabled={loading()}
					class="group disabled:cursor-progress bg-primary text-accent uppercase w-full h-12 rounded-xl flex items-center justify-center md:gap-2"
				>
					verify
					<Show when={loading()}>
						<Spinner />
					</Show>
				</button>
			</form>
		</>
	);
};

export default OtpForm;
