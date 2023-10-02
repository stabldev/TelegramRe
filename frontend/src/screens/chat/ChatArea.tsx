import { Component, For } from "solid-js";
import { ChatBlock } from "./ChatBlock";

export const ChatArea: Component = () => {
	return (
		<div
			class="relative overflow-y-scroll [scrollbar-width:_thin] bg-cover p-[1vw] flex flex-col justify-end"
			style={{ "background-image": "url(https://img.freepik.com/free-photo/3d-mountain-landscape-with-purple-sunset-sky_1048-8133.jpg)" }}
		>
			<For each={Array(1)}>
				{(_) => <ChatBlock />}
			</For>
		</div>
	);
};