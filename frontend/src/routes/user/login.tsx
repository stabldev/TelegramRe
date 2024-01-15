import { Match, Switch } from "solid-js";
import LoginForm from "~/components/pages/user/login/login-form";
import OtpForm from "~/components/pages/user/login/otp-form";
import PasswordForm from "~/components/pages/user/login/password-form";
import { useAuth } from "~/context/auth";
import { AuthLayout } from "~/layouts/auth-layout";

export default function SignIn() {
	const { verifyEmail, activeForm, setActiveForm } = useAuth();

	const handleFormSubmit = async (e: CustomEvent) => {
		try {
			const form_data = e.detail as FormData;
			const email = String(form_data.get("email"));
			await verifyEmail(email);
			setActiveForm("otp");
		} catch (err) {
			console.log(err);
		}
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
				<Match when={activeForm() === "login"}>
					<LoginForm onFormSubmit={handleFormSubmit} />
				</Match>
				<Match when={activeForm() === "otp"}>
					<OtpForm onOtpSubmit={handleOtpSubmit} />
				</Match>
			</Switch>
		</AuthLayout>
	);
}
