import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { onMount, createSignal } from "solid-js";
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
				<label
					for="country"
					class="relative flex items-center border-2 border-neutral-300 focus-within:border-primary md:rounded-xl md:p-2.5 md:text-base"
				>
					<input
						id="country"
						type="text"
						name="country"
						placeholder=""
						value={location()?.country}
						class="peer w-full outline-none bg-transparent text-accent pl-1.5"
					/>
					<span  class="pointer-events-none absolute start-3 top-0 -translate-y-1/2 bg-base-200 p-1 text-neutral-100 duration-200 ease-out text-xs peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs">
						Country
					</span>
					{/* TODO: add select country function */}
					<Arrow
						variant="down"
						class="absolute right-0 md:end-2.5 text-neutral-100 md:size-7"
					/>
				</label>
				<label
					for="email-address"
					class="relative flex items-center border-2 border-neutral-300 focus-within:border-primary md:rounded-xl md:p-2.5 md:text-base"
				>
					<input
						autofocus
						required
						id="email-address"
						type="email"
						name="email"
						placeholder=""
						class="peer w-full outline-none bg-transparent text-accent pl-1.5"
					/>
					<span  class="pointer-events-none absolute start-3 top-0 -translate-y-1/2 bg-base-200 p-1 text-neutral-100 duration-200 ease-out text-xs peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs">
						Email address
					</span>
				</label>
				<label class="relative flex items-center md:gap-3">
					<input
						name="keep-me"
						type="checkbox"
						checked
						class="relative peer appearance-none md:size-4 border-2 border-neutral-300 cursor-pointer rounded bg-transparent checked:bg-primary checked:border-0"
					/>
					<svg
					    class="absolute md:size-3 text-accent self-center start-0.5 hidden peer-checked:block"
					    xmlns="http://www.w3.org/2000/svg"
					    viewBox="0 0 24 24"
					    fill="none"
					    stroke="currentColor"
					    stroke-width="4"
					    stroke-linecap="round"
					    stroke-linejoin="round"
					 >
					    <polyline points="20 6 9 17 4 12"></polyline>
					</svg>
					<span class="text-neutral-100">Keep me signed in</span>
				</label>
				<button class="bg-primary text-accent uppercase w-full h-12 rounded-xl">Next</button>
			</form>
		</>
	);
};

export default EmailForm;
