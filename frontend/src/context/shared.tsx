import { Accessor, JSX, Setter, createContext, createSignal, useContext } from "solid-js";
import { ChatRoom } from "~/types/chat.types";

type SharedStore = {
	showSidebar: Accessor<boolean>;
	toggleShowSidebar: () => void;
	activeRoom: Accessor<ChatRoom | undefined>;
	setActiveRoom: Setter<ChatRoom | undefined>;
};

const SharedContext = createContext<SharedStore>();

export function SharedProvider(props: { children?: JSX.Element }) {
	const [showSidebar, setShowSidebar] = createSignal(true);
	const [activeRoom, setActiveRoom] = createSignal<ChatRoom>();

	// Functions
	const toggleShowSidebar = () => setShowSidebar((prev) => !prev);

	const context_value: SharedStore = {
		showSidebar: showSidebar,
		toggleShowSidebar: toggleShowSidebar,
		activeRoom: activeRoom,
		setActiveRoom: setActiveRoom
	};

	return <SharedContext.Provider value={context_value}>{props.children}</SharedContext.Provider>;
}

export function useShared() {
	return useContext(SharedContext)!;
}
