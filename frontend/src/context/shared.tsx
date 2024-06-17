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

// Shared states that will be used on multiple components
export function SharedProvider(props: { children?: JSX.Element }) {
  const [showSidebar, setShowSidebar] = createSignal(false);
  const [editMessage, setEditMessage] = createSignal<ChatMessage>();
  const [isEditingMessage, setIsEditingMessage] = createSignal(false);

  // Functions
  const toggleShowSidebar = () => setShowSidebar((prev) => !prev);

  // change to edit mode if editMessage has value
  createEffect(() => {
    setIsEditingMessage(editMessage() !== undefined);
  }, [isEditingMessage]);

  const context_value: SharedContextReturnType = {
    showSidebar,
    toggleShowSidebar,
    editMessage,
    isEditingMessage,

    setEditMessage
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
