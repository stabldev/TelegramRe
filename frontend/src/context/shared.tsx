import { Accessor, JSX, Setter, createContext, createSignal, useContext } from "solid-js";
import { User } from "~/types/user.types";

type SharedStore = {
	showSidebar: Accessor<boolean>;
	toggleShowSidebar: () => void;
	activeChatUser: Accessor<User | undefined>;
	setActiveChatUser: Setter<User | undefined>;
};

const SharedContext = createContext<SharedStore>();

export function SharedProvider(props: { children?: JSX.Element }) {
	const [showSidebar, setShowSidebar] = createSignal(true);
	const [activeChatUser, setActiveChatUser] = createSignal<User>();

	// Functions
	const toggleShowSidebar = () => setShowSidebar((prev) => !prev);

	const context_value: SharedStore = {
		showSidebar: showSidebar,
		toggleShowSidebar: toggleShowSidebar,
		activeChatUser: activeChatUser,
		setActiveChatUser: setActiveChatUser,
	};

	return <SharedContext.Provider value={context_value}>{props.children}</SharedContext.Provider>;
}

export function useShared() {
	return useContext(SharedContext)!;
}
