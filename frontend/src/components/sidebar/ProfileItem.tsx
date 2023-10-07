import { A } from "@solidjs/router";
import { FormatDate } from "../../functions/format_date";
import { ProfileItemProps } from "../../types/ProfileItem";

export const ProfileItem = (props: ProfileItemProps) => {
  const formated_timestamp = new FormatDate(props.timestamp)
    .format_to_relative_time;

  return (
    <A
      href={`/@${props.username}`}
      class="flex w-full select-none items-center gap-[1vw] px-[1vw] py-[0.75vw] hover:bg-stone-800"
      activeClass="bg-stone-700 hover:!bg-stone-700"
    >
      <img
        class="w-[3.5vw] rounded-full"
        src={props.image}
        alt={props.name}
      />
      <div class="flex w-full flex-col">
        <div class="flex items-center justify-between">
          <span class="text-[1.1vw] font-medium text-white">{props.name}</span>
          <span class="text-[0.8vw] uppercase text-white/75">
            {formated_timestamp}
          </span>
        </div>
        <div>
          <span class="line-clamp-1 text-[1vw] text-white/75">
            {props.message}
          </span>
        </div>
      </div>
    </A>
  );
};
