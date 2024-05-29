import {
	JSX,
	createContext,
	createSignal,
	useContext,
	Accessor,
	onMount
} from "solid-js";
import ApiEndpoints from "~/connections/api/api-endpoints";
import { fetchAPI } from "~/functions/api/fetch-api";
import type { User } from "~/types/user";

type AuthState = {
	country?: string;
	email?: string;
	otp?: string;
};

type AuthContextReturnType = {
	csrfToken: Accessor<string>;
	loading: Accessor<boolean>;
	user: Accessor<User | undefined>;
	authState: Accessor<AuthState | undefined>;
	isAuthenticated: Accessor<boolean>;

	verifyEmail: (email: string) => Promise<void>;
	verifyOTP: (email: string, otp: string) => Promise<void>;
	logoutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextReturnType>();

export function AuthProvider(props: { children?: JSX.Element }) {
	const [loading, setLoading] = createSignal(false);
	const [csrfToken, setCsrfToken] = createSignal("");
	const [isAuthenticated, setIsAuthenticated] = createSignal(false);
	const [user, setUser] = createSignal<User | undefined>();
	const [authState, setAuthState] = createSignal<AuthState>();

	// get user location (country) details of new users
	const initializeUserLocation = async () => {
		try {
			const res = await fetch("http://ip-api.com/json/");
			const data: { country: string } = await res.json();

			setAuthState((prev) => ({ ...prev, country: data.country }));
		} catch (err) {
			console.error("Coundn't fetch user location details");
		}
	};

	/**
	 * check if session exists and initialize csrf token
	 * if exists:
	 * get user details
	 * else:
	 * get user location details and show login page
	 */
	const initializeSession = async () => {
		const res = await fetch(ApiEndpoints.user.auth.SESSION, {
			credentials: "include"
		});
		const data = await res.json();
		initializeCSRF();
		if (data.isAuthenticated) {
			setIsAuthenticated(true);
			getMyInfo();
		} else {
			initializeUserLocation();
		}
	};

	// initialize a csrf token and save state
	const initializeCSRF = async () => {
		const res = await fetch(ApiEndpoints.user.auth.CSRF, {
			credentials: "include"
		});
		const token = res.headers.get("X-CSRFToken");
		if (!token) return;
		setCsrfToken(token);
	};

	// verify email address and update authState
	const verifyEmail = async (email: string) => {
		setLoading(true);
		try {
			const data = await fetchAPI(
				ApiEndpoints.user.auth.EMAIL_VERIFICATION,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-CSRFToken": csrfToken()
					},
					credentials: "include",
					body: JSON.stringify({ email })
				}
			);
			setAuthState((prev) => ({ ...prev, email: email }));
			return data;
		} finally {
			setLoading(false);
		}
	};

	// verify otp and update authState
	// on success: get user infos
	const verifyOTP = async (email: string, otp: string) => {
		setLoading(true);
		try {
			const data = await fetchAPI(
				ApiEndpoints.user.auth.OTP_VERIFICATION,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-CSRFToken": csrfToken()
					},
					credentials: "include",
					body: JSON.stringify({ email, otp })
				}
			);
			await getMyInfo();
			setIsAuthenticated(true);
			return data;
		} finally {
			setLoading(false);
		}
	};

	// get request user details
	const getMyInfo = async () => {
		const data = await fetchAPI(ApiEndpoints.user.auth.WHO_AM_I, {
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrfToken()
			},
			credentials: "include"
		});
		setUser(data.detail);
	};

	// delete session and logout user
	// and update states
	const logoutUser = async () => {
		const data = await fetchAPI(ApiEndpoints.user.auth.LOGOUT, {
			credentials: "include"
		});
		setIsAuthenticated(false);
		setUser(undefined);
		setCsrfToken("");
	};

	onMount(async () => {
		// check if user is already loggedIn
		await initializeSession();
	});

	const context_value: AuthContextReturnType = {
		csrfToken,
		user,
		isAuthenticated,
		loading,
		authState,

		verifyEmail,
		verifyOTP,
		logoutUser
	};

	return (
		<AuthContext.Provider value={context_value}>
			{props.children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext)!;
}
