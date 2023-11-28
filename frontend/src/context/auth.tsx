import { Accessor, JSX, createContext, createSignal, useContext, createEffect } from "solid-js";
import { API_URL } from "~/config";

const AuthContext = createContext<AuthStore>();

type User = {
	id: number;
	username: string;
	name: string;
	image: string;
};

type AuthStore = {
	user: Accessor<User | undefined>,
	signUpUser: (username: string, password: string) => Promise<void>,
};

export function AuthProvider(props: { children?: JSX.Element }) {
	const [csrfToken, setCsrfToken] = createSignal<string>();
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
		const token = await res.headers.get("X-CSRFToken");
		setCsrfToken(token);
	}

	const signUpUser = async (username: string, password: string) => {
        try {
        	const response = await fetch(`${API_URL}/auth/sign-up/`, {
	            method: "POST",
	            credentials: "include",
	            headers: {
	            	"Content-Type": "application/json",
	            	"X-CSRFToken": csrfToken()
	            },
	            body: JSON.stringify({
	                username,
	                password,
	            }),
	        });
	        const data = await response.json();

	        if (!response.ok) {
	            console.log("response not okay:", response.status, response.statusText);
	            console.log("response body:", data);
	            return;
	        }

	        console.log("sign up successful:", data);
        } catch (err) {
        	console.log("error in sign up:", err);
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
		signUpUser: signUpUser,
	}

	return <AuthContext.Provider value={context_value}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext)!;
}
