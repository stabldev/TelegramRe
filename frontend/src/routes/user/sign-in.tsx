import OtpForm from "~/components/pages/user/sign-in/otp-form";
import SignInForm from "~/components/pages/user/sign-in/sign-in-form";
import { AuthLayout } from "~/layouts/auth-layout";

export default function SignIn() {
	return (
		<AuthLayout class="md:w-[25vw] md:gap-[2vw]">
			<OtpForm />
		</AuthLayout>
	);
}
