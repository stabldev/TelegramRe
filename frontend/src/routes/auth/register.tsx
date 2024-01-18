import { Match, Switch, createSignal } from "solid-js";
import EmailForm from "~/components/pages/auth/email-form";
import OtpForm from "~/components/pages/auth/otp-form";
import { AuthLayout } from "~/layouts/auth-layout";

type ActiveForm = "email" | "otp";

export default function Register() {
    const [activeForm, setActiveForm] = createSignal<ActiveForm>("email");

    const handleFormSubmit = async (e: CustomEvent) => {
        console.log(e.detail);
    };

    const handleOtpSubmit = async (e: CustomEvent) => {
        console.log(e.detail);
    };

    return (
        <AuthLayout class="md:w-[25vw] md:gap-[2vw]">
			<img
				src="/favicon.ico"
				class="md:size-[10vw]"
			/>
			<Switch>
				<Match when={activeForm() === "email"}>
					<EmailForm
                        onFormSubmit={handleFormSubmit}
                        authType="register"
                    />
				</Match>
				<Match when={activeForm() === "otp"}>
                    <OtpForm
                        onOtpSubmit={handleOtpSubmit}
                        authType="register"
                    />
				</Match>
			</Switch>
		</AuthLayout>
    )
};