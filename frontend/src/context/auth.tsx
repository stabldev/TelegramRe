import { Accessor, JSX, createContext, createSignal, useContext, createEffect } from "solid-js";
import { customToast } from "~/components/shared/custom-toast";
import { API_URL } from "~/config";

type User = {
	id: number;
	username: string;
	name: string;
	image: string;
};

type AuthStore = {
	user: Accessor<User | undefined>;
	isAuthenticated: Accessor<boolean>;
	verifyEmail: (email: string) => void;
};

const AuthContext = createContext<AuthStore>();

export function AuthProvider(props: { children?: JSX.Element }) {
	const [csrfToken, setCsrfToken] = createSignal<string>("");
	const [isAuthenticated, setIsAuthenticated] = createSignal(false);
	const [user, setUser] = createSignal<User | undefined>();

	const initializeSession = async () => {
		const res = await fetch(`${API_URL}/auth/session/`, {
			credentials: "include"
		});
		const data = await res.json();
		console.log(data);
		if (data.isAuthenticated) {
			setIsAuthenticated(true);
		} else {
			initializeCSRF();
		}
	};

	const initializeCSRF = async () => {
		const res = await fetch(`${API_URL}/auth/csrf/`, {
			credentials: "include",
		});
		const token = res.headers.get("X-CSRFToken");
		if (!token) return;
		console.log(token);
		setCsrfToken(token);
	};

	const verifyEmail = async (email: string) => {
		const res = await fetch(`${API_URL}/auth/verify-email/`, {
			method: "POST",
			body: JSON.stringify({ email: email }),
		});
		const data = await res.json();
		console.log(data);
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
	};

	return <AuthContext.Provider value={context_value}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext)!;
}
