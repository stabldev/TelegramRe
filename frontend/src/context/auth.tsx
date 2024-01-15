import { Accessor, JSX, createContext, createSignal, useContext, createEffect, Setter } from "solid-js";
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
	verifyEmail: (email: string) => Promise<void>;
	authForm: Accessor<authForm>;
	activeForm: Accessor<activeForm>;
	setActiveForm: Setter<activeForm>;
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
		verifyEmail: verifyEmail,
		loading: loading,
		authForm: authForm,
		activeForm: activeForm,
		setActiveForm: setActiveForm
	};

	return <AuthContext.Provider value={context_value}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext)!;
}
