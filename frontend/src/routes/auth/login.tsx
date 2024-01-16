import { Match, Switch, createSignal, lazy } from "solid-js";
import { AuthLayout } from "~/layouts/auth-layout";
// laxy imports
const EmailForm = lazy(() => import("~/components/pages/auth/login/email-form"));
const OtpForm = lazy(() => import("~/components/pages/auth/login/otp-form"));

type ActiveForm = "email" | "otp";

export default function Login() {
    const [activeForm, setActiveForm] = createSignal<ActiveForm>("email");

	const handleFormSubmit = (e: CustomEvent) => {
        console.log(e);
	};

	const handleOtpSubmit = (e: CustomEvent) => {
        console.log(e);
	};

	return (
		<AuthLayout class="md:w-[25vw] md:gap-[2vw]">
			<img
				src="/favicon.ico"
				class="md:size-[10vw]"
			/>
			<Switch>
				<Match when={activeForm() === "email"}>
					<EmailForm onFormSubmit={handleFormSubmit} />
				</Match>
				<Match when={activeForm() === "otp"}>
					<OtpForm onOtpSubmit={handleOtpSubmit} />
				</Match>
			</Switch>
		</AuthLayout>
	);
}
