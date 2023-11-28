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
	const [user, setUser] = createSignal<User | undefined>();
	const [csrfToken, setCsrfToken] = createSignal<string>();

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

	        if (!response.ok) {
	            console.log("Response not okay:", response.status, response.statusText);
	            console.log("Response body:", await response.json());
	            return;
	        }

	        const data = await response.json();
	        console.log("Sign-up successful:", data);
	    } catch (error) {
	        console.error("Error during sign-up:", error);
	    }
	}

	const initializeCSRFToken = async () => {
		const res = await fetch(`${API_URL}/auth/set-csrf/`, {
			credentials: "include",
		});
		setCsrfToken(await res.headers.get("X-CSRFToken"));
	}

	createEffect(async () => {
		// set csrf
		initializeCSRFToken();

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
