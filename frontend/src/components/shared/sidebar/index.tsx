import { component$ } from "@builder.io/qwik";
import SearchHeader from "./search-header";
import Pencil from "~/icons/pencil";

export default component$(() => {
  return (
    <div class="relative grid h-screen w-full grid-rows-[min-content_1fr_min-content] border-r-[0.1vw] border-black/50 bg-stone-900">
      <SearchHeader />
      <div class="overflow-y-scroll px-[1vw] [scrollbar-width:_thin]">
      </div>
      <button class="absolute bottom-[1vw] right-[1vw] rounded-full bg-blue-500 p-[1.25vw]">
        <Pencil class="text-[1.5vw] text-white" />
      </button>
    </div>
  )
})
