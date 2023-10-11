import { Accessor, JSX, createContext, createSignal, useContext, createEffect } from "solid-js";

const AuthContext = createContext<AuthStore>();

type User = {
	id: number;
	username: string;
	name: string;
	image: string;
};

type AuthStore = [
	user: Accessor<User | undefined>
];

export function AuthProvider(props: { children?: JSX.Element }) {
	const [user, setUser] = createSignal<User | undefined>();

	createEffect(() => {
		// fetch from backend
		setUser({
			id: 1,
			username: "tokitouq",
			name: "Tokito",
			image: "https://avatars.githubusercontent.com/u/114811070?v=4"
		});
	});

	const context_value: AuthStore = [user];

	return <AuthContext.Provider value={context_value}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext)!;
}
