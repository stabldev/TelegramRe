import { component$ } from "@builder.io/qwik";
import SearchHeader from "./search-header";
import Pencil from "~/icons/pencil";
import ProfileItem from "./profile-item";
import type { SidebarProfile } from "~/types/components/sidebar-profile";

const profile_mapping: SidebarProfile[] = [
  {
    name: "Anya Forger",
    username: "anya-forger",
    avatar: "https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg",
    message: "Hi wassup! I've something to tell you, so please reply when you're free",
    timestamp: "2023-10-02T05:21:26Z",
  },
  {
    name: "Toshinou Kyouko",
    username: "kyouko",
    avatar: "https://pbs.twimg.com/media/D2v3DBuXQAAMFIb.jpg",
    message: "Goodbye, Tokito! Have a great day!",
    timestamp: "2023-10-01T05:21:26Z",
  }
];

export default component$(() => {
  return (
    <div class="relative grid h-screen w-full grid-rows-[min-content_1fr_min-content] border-r-[0.1vw] border-black/50 bg-stone-900">
      <SearchHeader />
      <div class="overflow-y-scroll px-[1vw] [scrollbar-width:_thin]">
        {profile_mapping.map((item) => <ProfileItem {...item} />)}
      </div>
      <button class="absolute bottom-[1vw] right-[1vw] rounded-full bg-blue-500 p-[1.25vw]">
        <Pencil class="text-[1.5vw] text-white" />
      </button>
    </div>
  )
})
