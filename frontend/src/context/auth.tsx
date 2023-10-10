import { Accessor, JSX, createContext, createSignal, useContext } from "solid-js";

const AuthContext = createContext<AuthStore>();

type AuthStore = [
	user: Accessor<{
		id: number;
		username: string;
		name: string;
		image: string;
	}>
];

export function AuthProvider(props: { children?: JSX.Element }) {
	const [user, setUser] = createSignal({
		id: 1,
		username: "tokitouq",
		name: "Tokito",
		image: "https://avatars.githubusercontent.com/u/114811070?v=4"
	});

	const context_value: AuthStore = [user];

	return <AuthContext.Provider value={context_value}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext)!;
}
