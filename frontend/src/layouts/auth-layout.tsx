import { Match, Switch, createSignal } from "solid-js";
import EmailForm from "~/components/pages/auth/email-form";
import OtpForm from "~/components/pages/auth/otp-form";
import { VERSION } from "~/config";

const AuthLayout = () => {
	const [state, setState] = createSignal<"email" | "otp">("email");

	const handleEmailSubmit = async (e: CustomEvent) => {
		console.log(e.detail);
	};

	const handleOTPSubmit = async (e: CustomEvent) => {
		console.log(e.detail);
	};

	return (
		<main class="relative grid h-screen w-screen place-items-center bg-base-100 bg-[url(/wallpaper.svg)]">
			<div class="relative flex flex-col items-center border border-neutral-300 bg-base-200 text-center md:w-96 md:gap-5 md:rounded-2xl md:p-5">
				<img
					src="/favicon.svg"
					class="md:size-28"
				/>
				<Switch>
					<Match when={state() === "email"}>
						<EmailForm onFormSubmit={handleEmailSubmit} />
					</Match>
					<Match when={state() === "email"}>
						<OtpForm onOtpSubmit={handleOTPSubmit} />
					</Match>
				</Switch>
				<span class="absolute -bottom-8 mx-auto text-sm text-neutral-100">
					Telegram Web RE {VERSION}
				</span>
			</div>
		</main>
	);
};

export default AuthLayout;
