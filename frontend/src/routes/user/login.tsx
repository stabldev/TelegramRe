import { Match, Switch, createSignal } from "solid-js";
import LoginForm from "~/components/pages/user/login/login-form";
import OtpForm from "~/components/pages/user/login/otp-form";
import PasswordForm from "~/components/pages/user/login/password-form";
import { AuthLayout } from "~/layouts/auth-layout";

type T = "sign-in" | "otp" | "password";

export default function SignIn() {
	const [activeForm, setActiveForm] = createSignal<T>("sign-in");

	const handleFormSubmit = (e: CustomEvent) => {
		console.log(e.detail);
		setActiveForm("otp");
	};

	const handleOtpSubmit = (e: CustomEvent) => {
		console.log(e.detail);
		setActiveForm("password");
	};

	const handlePasswordSubmit = (e: CustomEvent) => {
		console.log(e.detail);
	};

	return (
		<AuthLayout class="md:w-[25vw] md:gap-[2vw]">
			<img
				src="/favicon.ico"
				class="md:size-[10vw]"
			/>
			<Switch fallback={
				<PasswordForm onPasswordSubmit={handlePasswordSubmit} />
			}>
				<Match when={activeForm() === "sign-in"}>
					<LoginForm onFormSubmit={handleFormSubmit} />
				</Match>
				<Match when={activeForm() === "otp"}>
					<OtpForm onOtpSubmit={handleOtpSubmit} />
				</Match>
			</Switch>
		</AuthLayout>
	);
}
