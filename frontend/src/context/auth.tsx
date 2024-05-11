import {
	JSX,
	createContext,
	createSignal,
	useContext,
	createEffect
} from "solid-js";
// import { useNavigate } from "@solidjs/router";
import ApiEndpoints from "~/connections/api/api-endpoints";
import { User } from "~/types/user.types";

type AuthStore = {
	csrfToken: string;
	loading: boolean;
	user: User | undefined;
	isAuthenticated: boolean;
	handleEmailVerification: (email: string) => Promise<void>;
	handleOTPVerification: (email: string, otp: string) => Promise<void>;
	logoutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthStore>();

export function AuthProvider(props: { children?: JSX.Element }) {
	const [loading, setLoading] = createSignal(false);
	const [csrfToken, setCsrfToken] = createSignal("");
	const [isAuthenticated, setIsAuthenticated] = createSignal(false);
	const [user, setUser] = createSignal<User | undefined>();

	// const nagivate = useNavigate();

	const initializeSession = async () => {
		const res = await fetch(ApiEndpoints.user.auth.SESSION, {
			credentials: "include"
		});
		const data = await res.json();
		initializeCSRF();
		if (data.isAuthenticated) {
			setIsAuthenticated(true);
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

	const handleEmailVerification = async (email: string) => {
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
		} finally {
			setLoading(false);
		}
	};

	const handleOTPVerification = async (email: string, otp: string) => {
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
		// check if alraedy loggedIn
		await initializeSession();
		// get logged in user info
		await getMyInfo();
	});

	const context_value: AuthStore = {
		csrfToken: csrfToken(),
		user: user(),
		isAuthenticated: isAuthenticated(),
		loading: loading(),
		handleEmailVerification: handleEmailVerification,
		handleOTPVerification: handleOTPVerification,
		logoutUser: logoutUser
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
