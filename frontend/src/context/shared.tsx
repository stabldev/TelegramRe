import { Accessor, JSX, Setter, createContext, createEffect, createSignal, useContext } from "solid-js";
import { ChatMessage } from "~/types/chat.types";

type SharedStore = {
	showSidebar: Accessor<boolean>;
	toggleShowSidebar: () => void;
	editMessage: Accessor<ChatMessage | undefined>;
	setEditMessage: Setter<ChatMessage | undefined>;
	isEditingMessage: Accessor<boolean>;
};

const SharedContext = createContext<SharedStore>();

export function SharedProvider(props: { children?: JSX.Element }) {
	const [showSidebar, setShowSidebar] = createSignal(false);
	const [editMessage, setEditMessage] = createSignal<ChatMessage>();
	const [isEditingMessage, setIsEditingMessage] = createSignal(false);

	// Functions
	const toggleShowSidebar = () => setShowSidebar((prev) => !prev);

	createEffect(() => {
		setIsEditingMessage(editMessage() !== undefined);
	});

	const context_value: SharedStore = {
		showSidebar: showSidebar,
		toggleShowSidebar: toggleShowSidebar,
		editMessage: editMessage,
		setEditMessage: setEditMessage,
		isEditingMessage: isEditingMessage,
	};

	return <SharedContext.Provider value={context_value}>{props.children}</SharedContext.Provider>;
}

export function useShared() {
	return useContext(SharedContext)!;
}
