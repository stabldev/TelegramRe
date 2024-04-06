import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { Show } from "solid-js";
import ChatScreen from "~/components/pages/chat";
import { ChatSidebar } from "~/components/shared/chat/chat-sidebar";
import { useChat } from "~/context/chat";
import { useShared } from "~/context/shared";
import { DefaultLayout } from "~/layouts/default-layout";

export default function Username() {
	const { showSidebar } = useShared();
	const { activeRoom } = useChat();

	const params = useParams<{ username: string }>();
	const title = activeRoom()?.member[0].full_name ?? params.username;

	return (
		<>
			<Title>{title}</Title>
			<DefaultLayout>
				<ChatScreen />
				<Show when={showSidebar()}>
					<ChatSidebar />
				</Show>
			</DefaultLayout>
		</>
	);
}
