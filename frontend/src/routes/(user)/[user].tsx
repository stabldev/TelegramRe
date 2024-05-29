import { Title } from "@solidjs/meta";
import { RouteDefinition, RouteSectionProps } from "@solidjs/router";
import { Show } from "solid-js";
import ChatScreen from "~/components/pages/chat";
import ChatSidebar from "~/components/shared/chat/chat-sidebar";
import { useChat } from "~/context/chat";
import { useShared } from "~/context/shared";
import DefaultLayout from "~/layouts/default-layout";

export const route = {
  	matchFilters: {
  		user: (v: string) => v.length > 1 && v.includes("@")
  	}
} satisfies RouteDefinition;

const UserChat = (props: RouteSectionProps) => {
	const { showSidebar } = useShared();
	const { activeRoom } = useChat();

	const title = activeRoom()?.member[0].full_name ?? props.params.user;

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
};

export default UserChat;