import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { Show } from "solid-js";
import { A } from "solid-start";
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
					class="flex items-center flex-nowrap overflow-hidden btn btn-neutral p-0 w-full"
				>
					<div class="bg-base-300 w-16 h-full grid place-items-center">
						<Google class="text-stone-100 md:size-7" />
					</div>
					<span class="w-full md:p-3">Continue with Google</span>
				</button>
				<div class="border-2 border-neutral focus-within:border-primary md:rounded-lg md:p-2.5 md:text-base relative flex items-center">
					<At class="absolute pointer-events-none md:size-6 md:ml-1 text-secondary" />
					<input
						required
						type="email"
						name="email"
						autofocus
						placeholder="Email address"
						class="w-full bg-transparent text-accent md:pl-10"
					/>
				</div>
				<label class="label justify-start md:gap-2 p-0">
					<input name="keep-me" type="checkbox" checked class="checkbox checkbox-primary checkbox-xs" />
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
							class="text-secondary md:text-sm btn btn-link font-normal p-0 h-max min-h-max"
							href="../login"
						>
							Already have an account? Login!
						</A>
					}
				>
					<A
						class="text-secondary md:text-sm btn btn-link font-normal p-0 h-max min-h-max"
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
