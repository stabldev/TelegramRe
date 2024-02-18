import { Accessor, JSX, Setter, createContext, createSignal, useContext } from "solid-js";

type SharedStore = {
	showSidebar: Accessor<boolean>;
	toggleShowSidebar: () => void;
};

const SharedContext = createContext<SharedStore>();

export function SharedProvider(props: { children?: JSX.Element }) {
	const [showSidebar, setShowSidebar] = createSignal(true);

	// Functions
	const toggleShowSidebar = () => setShowSidebar((prev) => !prev);

	const context_value: SharedStore = {
		showSidebar: showSidebar,
		toggleShowSidebar: toggleShowSidebar,
	};

	return <SharedContext.Provider value={context_value}>{props.children}</SharedContext.Provider>;
}

export function useShared() {
	return useContext(SharedContext)!;
}
