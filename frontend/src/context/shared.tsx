import { Accessor, JSX, Setter, createContext, createSignal, useContext } from "solid-js";
import { ChatMessage } from "~/types/chat.types";

type SharedStore = {
	showSidebar: Accessor<boolean>;
	toggleShowSidebar: () => void;
	editMessage: Accessor<ChatMessage | undefined>;
	setEditMessage: Setter<ChatMessage | undefined>;
};

const SharedContext = createContext<SharedStore>();

export function SharedProvider(props: { children?: JSX.Element }) {
	const [showSidebar, setShowSidebar] = createSignal(true);
	const [editMessage, setEditMessage] = createSignal<ChatMessage>();

	// Functions
	const toggleShowSidebar = () => setShowSidebar((prev) => !prev);

	const context_value: SharedStore = {
		showSidebar: showSidebar,
		toggleShowSidebar: toggleShowSidebar,
		editMessage: editMessage,
		setEditMessage: setEditMessage,
	};

	return <SharedContext.Provider value={context_value}>{props.children}</SharedContext.Provider>;
}

export function useShared() {
	return useContext(SharedContext)!;
}
