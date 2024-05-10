import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { onMount, createSignal } from "solid-js";
import CheckBox from "~/components/ui/checkbox";
import TextInput from "~/components/ui/text-input";
import { createLocationSignal } from "~/hooks/location";
import Arrow from "~/icons/arrow";
import { LocationResponse } from "~/types/location";

interface Props {
	onFormSubmit: (e: CustomEvent) => void;
}

const EmailForm = (props: Props) => {
	const [location, setLocation] = createSignal<LocationResponse | undefined>();

	const dispatch = createEventDispatcher(props);

	const handleFormSubmit = (evt: SubmitEvent) => {
		evt.preventDefault();
		const formData = new FormData(evt.currentTarget as HTMLFormElement);
		const email = formData.get("email");

		dispatch("formSubmit", email);
	};

	onMount(async () => {
		const locationRes = await createLocationSignal();
		setLocation(locationRes());
	});

	return (
		<>
			<div class="flex flex-col md:gap-3">
				<h2 class="font-medium text-accent md:text-3xl">
					Sign in to Telegram
				</h2>
				<span class="flex self-center text-neutral-100 md:text-base">
					Please confirm your country and <br /> enter your email address.
				</span>
			</div>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-3.5"
			>
				<TextInput inputProps={{
					type: "text",
					name: "country",
					placeholder: "Country",
					value: location()?.country ?? "",
				}} >
					{/* TODO: add select country function */}
					<Arrow
						variant="down"
						class="absolute right-0 md:end-2.5 text-neutral-100 md:size-7"
					/>
				</TextInput>
				<TextInput inputProps={{
					autofocus: true,
					required: true,
					type: "email",
					name: "email-address",
					placeholder: "Email address",
				}} />
				<CheckBox inputProps={{
					placeholder: "Keep me signed in",
					checked: true,
					name: "keep-me",
				}} />
				<button class="bg-primary text-accent uppercase w-full h-12 rounded-xl">Next</button>
			</form>
		</>
	);
};

export default EmailForm;
