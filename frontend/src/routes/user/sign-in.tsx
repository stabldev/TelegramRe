import { createSignal } from "solid-js";
import OtpForm from "~/components/pages/user/sign-in/otp-form";
import SignInForm from "~/components/pages/user/sign-in/sign-in-form";
import { AuthLayout } from "~/layouts/auth-layout";

export default function SignIn() {
	const [otpSended, setOtpSended] = createSignal(false);

	const handleOtpSubmit = (e: CustomEvent) => {
		console.log(e.detail);
	};

	return (
		<AuthLayout class="md:w-[25vw] md:gap-[2vw]">
			<OtpForm onOtpSubmit={handleOtpSubmit} />
		</AuthLayout>
	);
}
