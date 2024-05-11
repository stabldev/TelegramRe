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
		<main class="relative grid place-items-center h-screen w-screen bg-base-100 bg-[url(/wallpaper.svg)]">
			<div class={"flex flex-col items-center text-center relative md:w-96 md:p-5 md:rounded-2xl border border-neutral-300 md:gap-5 bg-base-200"}>
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
				<span class="absolute mx-auto -bottom-8 text-neutral-100 text-sm">Telegram Web RE {VERSION}</span>
			</div>
		</main>
	);
}

export default AuthLayout;
