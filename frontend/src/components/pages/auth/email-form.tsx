import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { Show } from "solid-js";
import { A } from "solid-start";
import { useAuth } from "~/context/auth";
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
                        <h2 class="font-semibold text-stone-50 md:text-2xl">Join Telegram RE</h2>
                        <span class="flex self-center text-stone-400 md:text-sm">
                            Use OAuth or register via Email <br /> ( Passwordless )
                        </span>
                    </div>
                }
            >
                <div class="flex flex-col md:gap-2">
                    <h2 class="font-semibold text-stone-50 md:text-2xl">Login to Telegram RE</h2>
                    <span class="flex self-center text-stone-400 md:text-sm">
                        Use OAuth or login via Email <br /> ( Passwordless )
                    </span>
                </div>
            </Show>
			<form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-3"
			>
				<button type="button" class="grid grid-cols-[3rem_auto] bg-stone-800 text-stone-100 md:text-sm font-medium md:rounded-lg overflow-hidden">
					<div class="w-full h-full grid place-items-center bg-stone-700">
						<Google class="md:size-5 text-stone-100" />
					</div>
					<span class="w-full md:p-3">Continue with Google</span>
				</button>
				<input
					required
					type="email"
					name="email"
					autofocus
					placeholder="Email address"
					class="w-full border-stone-700 bg-transparent text-stone-50 md:rounded-lg border md:p-2.5 md:text-base"
				/>
				<div class="flex items-center text-stone-50 md:gap-2 md:text-xs">
					<input
						name="keep-me"
						checked
						id="keep-me"
						type="checkbox"
						class="md:size-4"
					/>
					<label for="keep-me">Keep me signed in</label>
				</div>
				<button
					disabled={loading()}
					classList={{ "opacity-75": loading() }}
					class="bg-blue-600 font-medium uppercase text-white transition-opacity md:rounded-lg md:p-2.5 md:text-sm"
				>
					submit
				</button>
				<Show
                    when={props.authType === "login"}
                    fallback={
                        <A
                            class="text-stone-400 md:text-sm"
                            href="../login"
                        >
                            Already have an account? Login!
                        </A>
                    }
                >
                    <A
                        class="text-stone-400 md:text-sm"
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
