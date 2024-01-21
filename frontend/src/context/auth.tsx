import { Accessor, JSX, createContext, createSignal, useContext, createEffect } from "solid-js";
import { useNavigate } from "solid-start";
import { API_URL } from "~/config";
import { User } from "~/types/user.types";

type AuthType = "login" | "register";

type AuthStore = {
	loading: Accessor<boolean>;
	user: Accessor<User | undefined>;
	isAuthenticated: Accessor<boolean>;
	handleEmailVerification: (email: string, authType: AuthType) => Promise<void>;
	handleOTPVerification: (email: string, otp: string) => Promise<void>;
};

const AuthContext = createContext<AuthStore>();

export function AuthProvider(props: { children?: JSX.Element }) {
	const [loading, setLoading] = createSignal(false);
	const [csrfToken, setCsrfToken] = createSignal("");
	const [isAuthenticated, setIsAuthenticated] = createSignal(false);
	const [user, setUser] = createSignal<User | undefined>();

	const nagivate = useNavigate();

	const initializeSession = async () => {
		const res = await fetch(`${API_URL}/auth/session/`, {
			credentials: "include"
		});
		const data = await res.json();
		if (data.isAuthenticated) {
			setIsAuthenticated(true);
		} else {
			initializeCSRF();
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

	const handleEmailVerification = async (email: string, authType: AuthType = "login") => {
		setLoading(true);
		try {
			const endpoint = authType === "login" ? "email-verification" : "register-email-verification";
			const res = await fetch(`${API_URL}/auth/${endpoint}/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken()
				},
				credentials: "include",
				body: JSON.stringify({ email })
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.detail);
		} catch (err) {
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const handleOTPVerification = async (email: string, otp: string) => {
		setLoading(true);
		try {
			const res = await fetch(`${API_URL}/auth/otp-verification/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken()
				},
				credentials: "include",
				body: JSON.stringify({ email, otp })
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.detail);

			await getMyInfo();
			setIsAuthenticated(true);
			nagivate("/", { replace: true });
		} catch (err) {
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const getMyInfo = async () => {
		try {
			const res = await fetch(`${API_URL}/auth/who_am_i/`, {
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken()
				},
				credentials: "include"
			});

			const data = await res.json();
			if (!res.ok) throw new Error("Something is wrong!");

			setUser(data.detail);
		} catch (err) {
			console.error(err);
		}
	};

	createEffect(async () => {
		// check if alraedy loggedIn
		await initializeSession();
		// get logged in user info
		await getMyInfo();
	});

	const context_value: AuthStore = {
		user: user,
		isAuthenticated: isAuthenticated,
		loading: loading,
		handleEmailVerification: handleEmailVerification,
		handleOTPVerification: handleOTPVerification
	};

	return <AuthContext.Provider value={context_value}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext)!;
}
