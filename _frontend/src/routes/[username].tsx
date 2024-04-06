import { Show } from "solid-js";
import ChatScreen from "~/components/pages/chat";
import { ChatSidebar } from "~/components/shared/chat/chat-sidebar";
import { useShared } from "~/context/shared";
import { DefaultLayout } from "~/layouts/default-layout";

export default function Username() {
	const { showSidebar } = useShared();

	return (
		<DefaultLayout>
			<ChatScreen />
			<Show when={showSidebar()}>
				<ChatSidebar />
			</Show>
		</DefaultLayout>
	);
}
