import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { createSignal, Show } from "solid-js";
import CheckBox from "~/components/ui/checkbox";
import Spinner from "~/components/ui/spinner";
import TextInput from "~/components/ui/text-input";
import { useAuth } from "~/context/auth";
import Arrow from "~/icons/arrow";

interface Props {
	onEmailSubmit: (e: CustomEvent) => void;
}

const EmailForm = (props: Props) => {
	const { loading, verifyEmail, authState } = useAuth();
	const [error, setError] = createSignal("");

	const dispatch = createEventDispatcher(props);

	const handleFormSubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const formData = new FormData(evt.currentTarget as HTMLFormElement);
		const email = formData.get("email") as string;

		try {
			await verifyEmail(email);
			setError("");
			dispatch("emailSubmit", {});
		} catch (err) {
			const errorMsg = (err as {message: string}).message;
			setError(errorMsg);
		};
	};

	return (
		<>
			<div class="flex flex-col md:gap-3">
				<h2 class="font-medium text-accent md:text-3xl">
					Sign in to Telegram
				</h2>
				<span class="flex self-center text-neutral-100 md:text-base">
					Please confirm your country and <br /> enter your email
					address.
				</span>
			</div>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-3.5"
			>
				<TextInput
					value={authState()?.country}
					inputProps={{
						type: "text",
						name: "country",
						placeholder: "Country"
					}}
				>
					{/* TODO: add select country function */}
					<Arrow
						variant="down"
						class="absolute right-0 text-neutral-100 md:end-2.5 md:size-7"
					/>
				</TextInput>
				<TextInput
					inputProps={{
						required: true,
						type: "email",
						name: "email",
						placeholder: "Email address"
					}}
					errorMsg={error()}
				/>
				<CheckBox
					inputProps={{
						placeholder: "Keep me signed in",
						checked: true,
						name: "keep-me"
					}}
				/>
				<button
					disabled={loading()}
					class="group flex h-12 w-full items-center justify-center rounded-xl bg-primary uppercase text-accent disabled:cursor-progress md:gap-2"
				>
					next
					<Show when={loading()}>
						<Spinner />
					</Show>
				</button>
			</form>
		</>
	);
};

export default EmailForm;
