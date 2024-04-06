import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { Show } from "solid-js";
import { A } from "@solidjs/router";
import { useAuth } from "~/context/auth";
import At from "~/icons/at";
import Google from "~/icons/google";

interface Props {
	onFormSubmit: (e: CustomEvent) => void;
	authType: "login" | "register";
}

const EmailForm = (props: Props) => {
	const { loading } = useAuth();
	const dispatch = createEventDispatcher(props);

	const handleFormSubmit = (evt: SubmitEvent) => {
		evt.preventDefault();
		const formData = new FormData(evt.currentTarget as HTMLFormElement);
		const email = formData.get("email");

		dispatch("formSubmit", email);
	};

	return (
		<>
			<Show
				when={props.authType === "login"}
				fallback={
					<div class="flex flex-col md:gap-2">
						<h2 class="font-semibold text-accent md:text-2xl">Join Telegram RE</h2>
						<span class="flex self-center text-secondary md:text-sm">
							Use OAuth or register via Email <br /> ( Passwordless )
						</span>
					</div>
				}
			>
				<div class="flex flex-col md:gap-2">
					<h2 class="font-semibold text-accent md:text-2xl">Login to Telegram RE</h2>
					<span class="flex self-center text-secondary md:text-sm">
						Use OAuth or login via Email <br /> ( Passwordless )
					</span>
				</div>
			</Show>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-3"
			>
				<button
					type="button"
					class="btn btn-neutral flex w-full flex-nowrap items-center overflow-hidden p-0"
				>
					<div class="grid h-full w-16 place-items-center bg-base-300">
						<Google class="text-stone-100 md:size-7" />
					</div>
					<span class="w-full md:p-3">Continue with Google</span>
				</button>
				<div class="relative flex items-center border-2 border-neutral focus-within:border-primary md:rounded-lg md:p-2.5 md:text-base">
					<At class="pointer-events-none absolute text-secondary md:ml-1 md:size-6" />
					<input
						required
						type="email"
						name="email"
						autofocus
						placeholder="Email address"
						class="w-full bg-transparent text-accent md:pl-10"
					/>
				</div>
				<label class="label justify-start p-0 md:gap-2">
					<input
						name="keep-me"
						type="checkbox"
						checked
						class="checkbox-primary checkbox checkbox-xs"
					/>
					<span class="label-text">Keep me signed in</span>
				</label>
				<button
					disabled={loading()}
					classList={{ "opacity-75": loading() }}
					class="btn btn-primary uppercase"
				>
					submit
				</button>
				<Show
					when={props.authType === "login"}
					fallback={
						<A
							class="btn btn-link h-max min-h-max p-0 font-normal text-secondary md:text-sm"
							href="../login"
						>
							Already have an account? Login!
						</A>
					}
				>
					<A
						class="btn btn-link h-max min-h-max p-0 font-normal text-secondary md:text-sm"
						href="../register"
					>
						Don't have an account? Register!
					</A>
				</Show>
			</form>
		</>
	);
};

export default EmailForm;
