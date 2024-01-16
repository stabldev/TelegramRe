import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { Show } from "solid-js";
import { useAuth } from "~/context/auth";
import Pencil from "~/icons/pencil";
import Spinner from "~/icons/spinner";

interface Props {
	onOtpSubmit: (e: CustomEvent) => void;
}

const OtpForm = (props: Props) => {
	const { authForm, setActiveForm, loading } = useAuth();
	const dispatch = createEventDispatcher(props);

	const handleFormSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		dispatch("otpSubmit", formData);
	};

	const handleEditClick = () => {
		setActiveForm("login");
	};

	return (
		<>
			<div class="flex flex-col md:gap-[0.5vw]">
				<h2 class="flex items-center font-semibold text-stone-50 md:gap-[0.75vw] md:text-[1.75vw]">
					<span>{authForm().email}</span>
					<button
						onClick={handleEditClick}
						class="text-stone-400 transition-colors hover:text-stone-300"
					>
						<Pencil />
					</button>
				</h2>
				<span class="flex max-w-[17vw] self-center text-stone-400 md:text-[1.05vw]">We have send you a message in Email with the Code</span>
			</div>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-[1vw]"
			>
				<input
					required
					autofocus
                    name="code"
					placeholder="Code"
					minLength={5}
					maxLength={5}
					class="w-full border-stone-700 bg-transparent text-stone-50 md:rounded-[0.65vw] md:border-[0.1vw] md:p-[0.75vw] md:text-[1.1vw]"
				/>
				<button
					disabled={loading()}
					classList={{ "opacity-75": loading() }}
					class="flex items-center justify-center bg-blue-600 font-medium uppercase leading-none text-white transition-opacity md:gap-[1vw] md:rounded-[0.65vw] md:p-[1vw] md:text-[1.1vw]"
				>
					<Show when={loading()}>
						<Spinner class="md:size-[1vw]" />
					</Show>
					{loading() ? "please wait..." : "submit"}
				</button>
			</form>
		</>
	);
};

export default OtpForm;
