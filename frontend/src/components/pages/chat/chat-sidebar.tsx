export const ChatSidebar = () => {
    return <>
        <div class="h-full w-full bg-stone-900 border-l-[0.1vw] border-black/50">
            <img
                src="https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg"
                class="md:size-[25vw] object-cover"
            />
            <div class="flex flex-col md:p-[1vw] leading-none md:gap-[0.5vw]">
                <h3 class="text-stone-100 md:text-[1.25vw] font-medium whitespace-nowrap">Anya Forger</h3>
                <h5 class="text-stone-400 md:text-[1vw] whitespace-nowrap">Joined Date: Dec 25, 2023</h5>
            </div>
        </div>
    </>
}