import { Component, For, createEffect, createResource } from "solid-js";
import { SearchHeader } from "./search-header";
import Pencil from "~/icons/pencil";
import { ProfileItem } from "./profile-item";
import { API_URL } from "~/config";
import { InboxItem } from "~/types/inbox.types";

async function fetchInbox(): Promise<InboxItem[]> {
	const res = await fetch(`${API_URL}/inbox/`, {
		credentials: "include",
	});
	const data = await res.json();
	return data;
};

const Sidebar: Component = () => {
	const [inbox] = createResource<InboxItem[]>(fetchInbox);
	
	createEffect(() => {
		console.log(inbox());
	})

	return (
		<div class="relative grid h-screen w-full grid-rows-[min-content_1fr] border-r border-black/50 bg-stone-900">
			<SearchHeader />
			<div class="overflow-y-scroll px-3 [scrollbar-width:_thin]">
				<For each={inbox()}>{(item) => <ProfileItem {...item} />}</For>
			</div>
			<button class="absolute bottom-3 right-3 rounded-full bg-blue-500 p-4">
				<Pencil class="text-xl text-white" />
			</button>
		</div>
	);
};

export default Sidebar;
