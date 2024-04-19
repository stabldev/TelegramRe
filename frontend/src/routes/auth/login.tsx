import { Match, Switch, createSignal, lazy, onMount } from "solid-js";
import { useAuth } from "~/context/auth";
import { AuthLayout } from "~/layouts/auth-layout";
import toast from "solid-toast";
import EmailForm from "~/components/pages/auth/email-form";
import OtpForm from "~/components/pages/auth/otp-form";

type ActiveForm = "email" | "otp";

type AuthForm = {
	email: string;
	otp: string;
};

export default function Login() {
	const [activeForm, setActiveForm] = createSignal<ActiveForm>("email");
	const [authForm, setAuthForm] = createSignal<AuthForm>({
		email: "",
		otp: ""
	});
	const { handleEmailVerification, handleOTPVerification } = useAuth();

	const handleFormSubmit = async (e: CustomEvent) => {
		setAuthForm((Form) => ({
			...Form,
			email: e.detail
		}));

		try {
			await toast.promise(
				handleEmailVerification(authForm().email, "login"),
				{
					loading: "Verifying email...",
					success: () => <span>Email verification complete!</span>,
					error: <span>User not found!</span>
				}
			);

			setActiveForm("otp");
		} catch (err) {
			console.error(err);
		}
	};

	const handleOtpSubmit = async (e: CustomEvent) => {
		setAuthForm((Form) => ({
			...Form,
			otp: e.detail
		}));

		try {
			await toast.promise(
				handleOTPVerification(authForm().email, authForm().otp),
				{
					loading: "Verifying OTP...",
					success: () => <span>OTP verification complete!</span>,
					error: <span>Wrong OTP! please check again</span>
				}
			);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<AuthLayout class="relative md:w-96 md:p-5 md:rounded-2xl border border-neutral-300 md:gap-5 bg-base-200">
			<img
				src="/favicon.svg"
				class="md:size-28"
			/>
			<Switch>
				<Match when={activeForm() === "email"}>
					<EmailForm
						onFormSubmit={handleFormSubmit}
						authType="login"
					/>
				</Match>
				<Match when={activeForm() === "otp"}>
					<OtpForm
						onOtpSubmit={handleOtpSubmit}
						authType="login"
					/>
				</Match>
			</Switch>
		</AuthLayout>
	);
}
