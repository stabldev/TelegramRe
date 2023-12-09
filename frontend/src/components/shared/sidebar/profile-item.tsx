import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { FormatDate } from "~/functions/format_date";
import type { SidebarProfile } from "~/types/components/sidebar-profile";

export default component$<SidebarProfile>((props) => {
  const formated_timestamp = new FormatDate(props.timestamp).format_to_relative_time;

  return (
    <>
      <Link
        href={`/@${props.username}`}
        class="flex w-full select-none items-center gap-[1vw] rounded-[0.75vw] px-[1vw] py-[0.75vw]"
      >
        <img
          class="w-[3.5vw] rounded-full"
          src={props.avatar}
          alt={props.name}
        />
        <div class="flex w-full flex-col">
          <div class="flex items-center justify-between">
            <span class="text-[1.1vw] font-medium text-white">{props.name}</span>
            <span class="text-[0.8vw] uppercase text-white/75">{formated_timestamp}</span>
          </div>
          <div>
            <span class="line-clamp-1 text-[1vw] text-white/75">{props.message}</span>
          </div>
        </div>
      </Link>
    </>
  )
})
