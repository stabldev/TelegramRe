import Gif from "~/icons/Gif";
import Photo from "~/icons/Photo";

const ChatMediaMenu = () => {
  return (
    <>
      <label
        for="image-file-input"
        class="flex w-full cursor-pointer items-center gap-4 rounded-lg px-3 py-1.5 text-start text-neutral-100 hover:bg-base-200/75"
      >
        <Photo class="size-4" />
        <span class="text-sm font-medium text-accent">Send Photo</span>
      </label>
      <label
        for="gif-file-input"
        class="flex w-full cursor-pointer items-center gap-4 rounded-lg px-3 py-1.5 text-start text-neutral-100 hover:bg-base-200/75"
      >
        <Gif class="size-4" />
        <span class="text-sm font-medium text-accent">Send Gif</span>
      </label>
    </>
  );
};

export default ChatMediaMenu;
