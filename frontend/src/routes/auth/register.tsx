import { Match, Switch, createSignal } from "solid-js";
import toast from "solid-toast";
import EmailForm from "~/components/pages/auth/email-form";
import OtpForm from "~/components/pages/auth/otp-form";
import { useAuth } from "~/context/auth";
import { AuthLayout } from "~/layouts/auth-layout";

type ActiveForm = "email" | "otp";

type AuthForm = {
    email: string;
    otp: string;
};

export default function Register() {
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
                handleEmailVerification(authForm().email, "register"),
                {
                    loading: "Verifying email...",
                    success: () => <span>Email verification complete!</span>,
                    error: <span>User with same email already exists!</span>,
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
        <AuthLayout class="md:w-80 md:gap-5">
			<img
				src="/favicon.ico"
				class="md:size-20"
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