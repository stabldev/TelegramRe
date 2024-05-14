import {
	JSX,
	createContext,
	createSignal,
	useContext,
	createEffect,
    Accessor
} from "solid-js";
import ApiEndpoints from "~/connections/api/api-endpoints";
import type { User } from "~/types/user";

type AuthState = {
	country?: string;
	email?: string;
	otp?: string;
};

type ReturnType = {
	csrfToken: Accessor<string>;
	loading: Accessor<boolean>;
	user: Accessor<User | undefined>;
	authState: Accessor<AuthState | undefined>;
	isAuthenticated: Accessor<boolean>;

	verifyEmail: (email: string) => Promise<void>;
	verifyOTP: (email: string, otp: string) => Promise<void>;
	logoutUser: () => Promise<void>;
};

const AuthContext = createContext<ReturnType>();

export function AuthProvider(props: { children?: JSX.Element }) {
	const [loading, setLoading] = createSignal(false);
	const [csrfToken, setCsrfToken] = createSignal("");
	const [isAuthenticated, setIsAuthenticated] = createSignal(false);
	const [user, setUser] = createSignal<User | undefined>();
	const [authState, setAuthState] = createSignal<AuthState>();

	const initializeUserLocation = async () => {
		try {
			const res = await fetch("http://ip-api.com/json/");
			const data: {country: string} = await res.json();

			setAuthState((prev) => ({...prev, country: data.country}));
		} catch (err) {
			console.error("Coundn't fetch user location details");
		}
	};

	const initializeSession = async () => {
		const res = await fetch(ApiEndpoints.user.auth.SESSION, {
			credentials: "include"
		});
		const data = await res.json();
		initializeCSRF();
		if (data.isAuthenticated) {
			setIsAuthenticated(true);
			await getMyInfo();
		}
	};

	const initializeCSRF = async () => {
		const res = await fetch(ApiEndpoints.user.auth.CSRF, {
			credentials: "include"
		});
		const token = res.headers.get("X-CSRFToken");
		if (!token) return;
		setCsrfToken(token);
	};

	const verifyEmail = async (email: string) => {
		setLoading(true);
		try {
			const res = await fetch(ApiEndpoints.user.auth.EMAIL_VERIFICATION, {
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
			// if res is 200
			setAuthState((prev) => ({...prev, email: email}));
			return data;
		} finally {
			setLoading(false);
		}
	};

	const verifyOTP = async (email: string, otp: string) => {
		setLoading(true);
		try {
			const res = await fetch(ApiEndpoints.user.auth.OTP_VERIFICATION, {
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
			// nagivate("/", { replace: true });
		} finally {
			setLoading(false);
		}
	};

	const getMyInfo = async () => {
		const res = await fetch(ApiEndpoints.user.auth.WHO_AM_I, {
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrfToken()
			},
			credentials: "include"
		});

		const data = await res.json();
		if (!res.ok) throw new Error("Something is wrong!");

		setUser(data.detail);
	};

	const logoutUser = async () => {
		const res = await fetch(ApiEndpoints.user.auth.LOGOUT, {
			credentials: "include"
		});

		if (!res.ok) throw new Error("Something is wrong");

		setIsAuthenticated(false);
		setUser(undefined);
		setCsrfToken("");
		// nagivate("/auth/login/");
	};

	createEffect(async () => {
		initializeUserLocation();
		// check if alraedy loggedIn
		await initializeSession();
	});

	const context_value: ReturnType = {
		csrfToken,
		user,
		isAuthenticated,
		loading,
		authState,

		verifyEmail,
		verifyOTP,
		logoutUser,
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
