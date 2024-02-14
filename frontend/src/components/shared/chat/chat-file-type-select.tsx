import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { onCleanup, onMount } from "solid-js";
import Gif from "~/icons/gif";
import Photo from "~/icons/photo";

type Props = {
	onClose: (e: CustomEvent) => void;
};

export const ChatFileTypeSelect = (props: Props) => {
	const dispatch = createEventDispatcher(props);
	let ref: HTMLDivElement;

	const handleOutsideClick = (event: MouseEvent) => {
		if (!ref.contains(event.target as HTMLElement)) {
			dispatch("close", {});
		}
	};

	onMount(() => {
		document.addEventListener("click", handleOutsideClick);
	});

	onCleanup(() => {
		document.removeEventListener("click", handleOutsideClick);
	});

	return (
		<div
			ref={ref!}
			class="absolute bottom-11 z-50 w-max select-none overflow-hidden rounded-lg bg-stone-900"
		>
			<label
				for="image-file-input"
				class="grid cursor-pointer grid-cols-12 gap-2 px-3 py-2 text-start text-stone-300 transition-colors hover:bg-stone-800 hover:text-stone-100"
			>
				<Photo class="col-span-2 size-full" />
				<span class="col-span-10 text-sm font-medium">Send Photo</span>
			</label>
			<label
				for="gif-file-input"
				class="grid cursor-pointer grid-cols-12 gap-2 px-3 py-2 text-start text-stone-300 transition-colors hover:bg-stone-800 hover:text-stone-100"
			>
				<Gif class="col-span-2 size-full" />
				<span class="col-span-10 text-sm font-medium">Send GIF</span>
			</label>
		</div>
	);
};
