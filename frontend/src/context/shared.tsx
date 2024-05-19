import {
	Accessor,
	JSX,
	Setter,
	createContext,
	createEffect,
	createSignal,
	useContext
} from "solid-js";
import type { ChatMessage } from "~/types/chat";

type SharedContextReturnType = {
	showSidebar: Accessor<boolean>;
	toggleShowSidebar: () => void;
	editMessage: Accessor<ChatMessage | undefined>;
	setEditMessage: Setter<ChatMessage | undefined>;
	isEditingMessage: Accessor<boolean>;
};

const SharedContext = createContext<SharedContextReturnType>();

export function SharedProvider(props: { children?: JSX.Element }) {
	const [showSidebar, setShowSidebar] = createSignal(false);
	const [editMessage, setEditMessage] = createSignal<ChatMessage>();
	const [isEditingMessage, setIsEditingMessage] = createSignal(false);

	// Functions
	const toggleShowSidebar = () => setShowSidebar((prev) => !prev);

	createEffect(() => {
		setIsEditingMessage(editMessage() !== undefined);
	});

	const context_value: SharedContextReturnType = {
		showSidebar,
		toggleShowSidebar,
		editMessage,
		setEditMessage,
		isEditingMessage,
	};

	return (
		<SharedContext.Provider value={context_value}>
			{props.children}
		</SharedContext.Provider>
	);
}

export function useShared() {
	return useContext(SharedContext)!;
}
