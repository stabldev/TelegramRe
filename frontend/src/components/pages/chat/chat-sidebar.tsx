import { useParams } from "solid-start";
import { useShared } from "~/context/shared"
import Close from "~/icons/close"

export const ChatSidebar = () => {
    const { toggleShowSidebar } = useShared();
    const params = useParams<{ username: string }>();

    return <>
        <div
            class="h-full md:w-full bg-stone-900 border-l-[0.1vw] border-black/50 whitespace-nowrap"
            style={{ "max-height": "calc(100vh - 3.75vw)" }}
        >
            <div class="md:p-[1vw] flex items-center justify-between">
                <h3 class="md:text-[1.25vw] text-stone-200 font-medium flex items-center md:gap-[0.75vw]">
                    Profile
                    <span class="md:text-[1vw] text-stone-400 font-normal">{params.username}</span>
                </h3>
                <button onClick={toggleShowSidebar}>
                    <Close class="md:w-[1.75vw] text-white/50 transition-colors hover:text-white/75" />
                </button>
            </div>
            <img
                src="https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg"
                class="md:size-[25vw] object-cover"
            />
            <div class="flex flex-col md:p-[1vw] leading-none md:gap-[0.5vw]">
                <h3 class="text-stone-100 md:text-[1.25vw] font-medium">Anya Forger</h3>
                <h5 class="text-stone-400 md:text-[1vw]">Joined Date: Dec 25, 2023</h5>
            </div>
            <div class="md:hidden flex flex-col md:p-[1vw] leading-none md:gap-[0.5vw]">
                <h5 class="text-stone-400 md:text-[1vw]">BIO:</h5>
                <h4>🎬🎶 Let's dive into the colorful world of anime together! 🔥🎭 Embracing the epic battles and strong heroines of anime.</h4>
            </div>
        </div>
    </>
}