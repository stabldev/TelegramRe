import { Match, Switch, createSignal } from "solid-js";
import OtpForm from "~/components/pages/user/sign-in/otp-form";
import PasswordForm from "~/components/pages/user/sign-in/password-form";
import SignInForm from "~/components/pages/user/sign-in/sign-in-form";
import { AuthLayout } from "~/layouts/auth-layout";

type T = "sign-in" | "otp" | "password";

export default function SignIn() {
	const [activeForm, setActiveForm] = createSignal<T>("password");

	const handleOtpSubmit = (e: CustomEvent) => {
		console.log(e.detail);
		setActiveForm("password");
	};

	const handleFormSubmit = (e: CustomEvent) => {
		console.log(e.detail);
		setActiveForm("otp");
	};

	return (
		<AuthLayout class="md:w-[25vw] md:gap-[2vw]">
			<img
				src="/favicon.ico"
				class="md:size-[10vw]"
			/>
			<Switch fallback={
				<PasswordForm />
			}>
				<Match when={activeForm() === "sign-in"}>
					<SignInForm onFormSubmit={handleFormSubmit} />
				</Match>
				<Match when={activeForm() === "otp"}>
					<OtpForm onOtpSubmit={handleOtpSubmit} />
				</Match>
			</Switch>
		</AuthLayout>
	);
}
