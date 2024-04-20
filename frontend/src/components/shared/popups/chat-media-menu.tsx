import Gif from "~/icons/gif";
import Photo from "~/icons/photo";

export default function ChatMediaMenu() {
	return <>
        <label
            for="image-file-input"
            class="cursor-pointer flex w-full items-center gap-4 rounded-lg px-3 py-1.5 text-start text-neutral-100 hover:bg-base-200/75"
        >
            <Photo class="size-4" />
            <span class="text-sm font-medium text-accent">
                Send Photo
            </span>
        </label>
        <label
            for="gif-file-input"
            class="cursor-pointer flex w-full items-center gap-4 rounded-lg px-3 py-1.5 text-start text-neutral-100 hover:bg-base-200/75"
        >
            <Gif class="size-4" />
            <span class="text-sm font-medium text-accent">
                Send Gif
            </span>
        </label>
	</>
};