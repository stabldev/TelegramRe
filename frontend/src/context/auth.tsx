import { Accessor, JSX, createContext, createSignal, useContext, createEffect } from "solid-js";
import { API_URL } from "~/config";
import toast from "solid-toast";
import { customToast } from "~/components/shared/custom_toast";

type User = {
	id: number;
	username: string;
	name: string;
	image: string;
};

type AuthStore = {
	user: Accessor<User | undefined>,
	isAuthenticated: Accessor<boolean>,
	signUpUser: (username: string, password: string) => Promise<void>,
};

const AuthContext = createContext<AuthStore>();

export function AuthProvider(props: { children?: JSX.Element }) {
	const [csrfToken, setCsrfToken] = createSignal<string>("");
	const [isAuthenticated, setIsAuthenticated] = createSignal(false);
	const [user, setUser] = createSignal<User | undefined>();

	const initializeSession = async () => {
		const res = await fetch(`${API_URL}/auth/session/`, {
			credentials: "include",
		});
		const data = await res.json();
		if (data.isAuthenticated) {
			setIsAuthenticated(true);
		} else {
			initializeCSRF();
		}
	}

	const initializeCSRF = async () => {
		const res = await fetch(`${API_URL}/auth/csrf/`, {
			credentials: "include",
		});
		const token = res.headers.get("X-CSRFToken");
		if (!token) return;
		setCsrfToken(token);
	}

	const signUpUser = async (username: string, password: string) => {
    	try {
    		const response = await fetch(`${API_URL}/auth/sign-up/`, {
	            method: "POST",
	            credentials: "include",
	            headers: {
	            	"Content-Type": "application/json",
	            	"X-CSRFToken": csrfToken(),
	            },
	            body: JSON.stringify({
	                username,
	                password,
	            }),
	        });
	        const data = await response.json();

	        if (!response.ok) {
	            throw new Error(data.detail || "Sign up failed!");
	        }

	        console.log("sign up successful:", data);
    	} catch (error: any) {
    		customToast(error.message);
    	}
	}

	createEffect(async () => {
		// check session
		initializeSession();

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
		signUpUser: signUpUser,
	}

	return <AuthContext.Provider value={context_value}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext)!;
}
