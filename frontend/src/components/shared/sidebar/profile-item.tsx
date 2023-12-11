import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { FormatDate } from "~/functions/format_date";
import type { SidebarProfile } from "~/types/components/sidebar-profile";

export default component$<SidebarProfile>((props) => {
  const location = useLocation();

  const formated_timestamp = new FormatDate(props.timestamp).format_to_relative_time;
  const href = `/@${props.username}/`;

  return (
    <>
      <Link
        href={href}
        class={[
          "group flex w-full select-none items-center gap-[1vw] rounded-[0.75vw] px-[1vw] py-[0.75vw] transition",
          {
            "bg-stone-700 hover:!bg-stone-700 before:absolute before:left-[1vw] before:w-[0.35vw] before:h-[3vw] before:bg-blue-500 before:rounded-full": location.url.pathname === href,
          }
        ]}
      >
        <img
          width={50}
          height={50}
          class="w-[3.5vw] md:rounded-full"
          src={props.avatar}
          alt={props.name}
        />
        <div class="flex w-full flex-col">
          <div class="flex items-center justify-between">
            <span class="text-[1vw] font-medium text-white">{props.name}</span>
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
