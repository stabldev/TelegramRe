import { Match, Switch, createSignal, lazy } from "solid-js";
import { useAuth } from "~/context/auth";
import { AuthLayout } from "~/layouts/auth-layout";
import toast from "solid-toast";
import EmailForm from "~/components/pages/auth/login/email-form";
import OtpForm from "~/components/pages/auth/login/otp-form";

type ActiveForm = "email" | "otp";

type AuthForm = {
    email: string;
    otp: string;
};

export default function Login() {
    const [activeForm, setActiveForm] = createSignal<ActiveForm>("email");
    const [authForm, setAuthForm] = createSignal<AuthForm>({ email: "", otp: "" });
    const { handleEmailVerification, handleOTPVerification } = useAuth();

	const handleFormSubmit = async (e: CustomEvent) => {
        setAuthForm((Form) => ({
            ...Form,
            email: e.detail
        }));

        try {
            await toast.promise(
                handleEmailVerification(authForm().email),
                {
                    loading: "Verifying email...",
                    success: () => <span>Email verification complete!</span>,
                    error: <span>User not found!</span>,
                },
            )

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
                    error: <span>Wrong OTP! please check again</span>,
                },
            )
        } catch (err) {
            console.error(err);
        }
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
