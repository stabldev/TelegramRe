import { Title } from "@solidjs/meta";
import { RouteDefinition, RouteSectionProps, cache, redirect } from "@solidjs/router";
import { Intent } from "@solidjs/router/dist/types";
import { Show } from "solid-js";
import ChatScreen from "~/components/pages/chat";
import ChatSidebar from "~/components/shared/chat/chat-sidebar";
import { useChat } from "~/context/chat";
import { useShared } from "~/context/shared";
import { fetchAPI } from "~/functions/api/fetch";
import DefaultLayout from "~/layouts/default";

const getUser = cache(async (username: string, intent: Intent) => {
	try {
		let url: string;
		// check if solid-start fetch from server or browser
		if (intent === "initial") {
			// when on server
			url = "http://backend:8000/api/v1/user/v2/" + username;
		} else {
			url = "http://0.0.0.0:8000/api/v1/user/v2/" + username;
		};

		const data = await fetchAPI(url);
		console.log("Data: ", data);
		return data;
	} catch (err) {
		console.log("Err: ", err);
		throw redirect("/");
	};
}, "user");

export const route = {
	load: (args) => {
		const username = args.params.user.slice(1);
		console.log(args);
		console.debug(username);
		getUser(username, args.intent);
	},
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