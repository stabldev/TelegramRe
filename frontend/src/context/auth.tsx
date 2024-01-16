import { Accessor, JSX, createContext, createSignal, useContext, createEffect, Setter } from "solid-js";
import { customToast } from "~/components/shared/custom-toast";
import { API_URL } from "~/config";

type User = {
	id: number;
	username: string;
	name: string;
	image: string;
};

type authForm = {
	email: string;
	otp: string;
	password: string;
};

type activeForm = "login" | "otp" | "password";

type AuthStore = {
	loading: Accessor<boolean>;
	user: Accessor<User | undefined>;
	isAuthenticated: Accessor<boolean>;
	authForm: Accessor<authForm>;
	activeForm: Accessor<activeForm>;
	setActiveForm: Setter<activeForm>;
	verifyEmail: (email: string) => Promise<void>;
	verifyOtp: (otp: string) => Promise<void>;
};

const AuthContext = createContext<AuthStore>();

export function AuthProvider(props: { children?: JSX.Element }) {
	const [loading, setLoading] = createSignal(false);
	const [csrfToken, setCsrfToken] = createSignal<string>("");
	const [isAuthenticated, setIsAuthenticated] = createSignal(false);
	const [user, setUser] = createSignal<User | undefined>();
	const [activeForm, setActiveForm] = createSignal<activeForm>("login");
	const [authForm, setAuthForm] = createSignal<authForm>({
		email: "",
		otp: "",
		password: ""
	});

	const initializeSession = async () => {
		const res = await fetch(`${API_URL}/auth/session/`, {
			credentials: "include"
		});
		const data = await res.json();
		if (data.isAuthenticated) {
			setIsAuthenticated(true);
		} else {
			await initializeCSRF();
		}
	};

	const initializeCSRF = async () => {
		const res = await fetch(`${API_URL}/auth/csrf/`, {
			credentials: "include"
		});
		const token = res.headers.get("X-CSRFToken");
		if (!token) return;
		setCsrfToken(token);
	};

	const verifyEmail = async (email: string) => {
		setLoading(true);
		setAuthForm((form) => ({
			...form,
			email: email
		}));

		try {
			const res = await fetch(`${API_URL}/auth/verify-email/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken()
				},
				credentials: "include",
				body: JSON.stringify({ email: email })
			});

			if (!res.ok) {
				throw new Error(`Something went wrong! ${res.statusText}`);
			}
		} catch (err) {
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const verifyOtp = async (otp: string) => {
		setLoading(true);
		setAuthForm((form) => ({
			...form,
			otp: otp
		}));

		try {
			const res = await fetch(`${API_URL}/auth/verify-otp/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken()
				},
				credentials: "include",
				body: JSON.stringify({
					email: authForm().email,
					otp: otp,
				})
			});

			if (!res.ok) {
				throw new Error("Invalid OTP! please re-check your mail");
			}
			console.log(res);
		} catch (err) {
			if (err instanceof Error) customToast(err.message);
			throw err;
		} finally {
			setLoading(false);
		};
	};

	createEffect(async () => {
		// check session
		await initializeSession();

		// fetch from backend
		setUser({
			id: 1,
			username: "tokitouq",
			name: "Tokito",
			image: "https://avatars.githubusercontent.com/u/114811070?v=4"
		});
	});

	const context_value: AuthStore = {
		user: user,
		isAuthenticated: isAuthenticated,
		loading: loading,
		authForm: authForm,
		activeForm: activeForm,
		setActiveForm: setActiveForm,
		verifyEmail: verifyEmail,
		verifyOtp: verifyOtp,
	};

	return <AuthContext.Provider value={context_value}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext)!;
}
