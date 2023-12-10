import { component$ } from "@builder.io/qwik";
import { FormatDate } from "~/functions/format_date";
import Clock from "~/icons/clock";
import Tick from "~/icons/tick";
import { Chat } from "~/types/components/chat";

interface Props {
  message: Chat;
  self: boolean;
  lastMessage: boolean;
  middleMessage: boolean;
}

export default component$<Props>((props) => {
  const formatedDate = new FormatDate(props.message.time).format_to_relative_time;

  return (
    <div
      class={[
        "flex w-max gap-[0.5vw] py-[0.4vw] pl-[0.9vw] pr-[0.5vw] text-white",
        {
          "bg-stone-800": !props.self,
          "bg-blue-500": props.self,
        }
      ]}
      style={{
        "border-radius": `${props.lastMessage || props.middleMessage ? "0.35vw" : "1vw"} 1vw 1vw 0.35vw`
      }}
    >
      <span class="self-center whitespace-pre-line text-[0.95vw]">{props.message.content}</span>
      <span class="select-none self-end text-[0.75vw] uppercase leading-none text-white/80">{formatedDate}</span>

      {
        props.self &&
          props.message.status === "seen" ?
          <Tick
            variant="double"
            class="self-end text-[1.15vw] text-white"
          />
          : props.message.status === "send" ?
            <Tick
              variant="single"
              class="self-end text-[1.15vw] text-white"
            />
            : <Clock class="self-end text-[1vw] text-white" />
      }
    </div>
  )
})
