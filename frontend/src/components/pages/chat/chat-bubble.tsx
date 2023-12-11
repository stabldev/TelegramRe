import { component$ } from "@builder.io/qwik";
import { FormatDate } from "~/functions/format_date";
import Clock from "~/icons/clock";
import Tick from "~/icons/tick";
import { Chat } from "~/types/components/chat";

interface Props {
  message: Chat;
  self: boolean;
  firstMessage: boolean;
  lastMessage: boolean;
  middleMessage: boolean;
}

export default component$<Props>((props) => {
  const formatedDate = new FormatDate(props.message.time).format_to_relative_time;

  return (
    <div
      class={[
        "flex w-max gap-[0.5vw] py-[0.4vw] pl-[0.9vw] pr-[0.5vw] text-white rounded-[1vw]",
        {
          // if sender is user
          "bg-blue-500 self-end": props.self,
          "rounded-br-[0.35vw]": props.self && props.firstMessage,
          "rounded-r-[0.35vw]": props.self && props.middleMessage,
          "rounded-tr-[0.35vw]": props.self && props.lastMessage,
          // If chat is not send by user
          "bg-stone-800": !props.self,
          "rounded-bl-[0.35vw]": !props.self && props.firstMessage,
          "rounded-l-[0.35vw]": !props.self && props.middleMessage,
          "rounded-bl-[1vw] rounded-tl-[0.35vw]": !props.self && props.lastMessage,
        }
      ]}
    >
      <span class="self-center whitespace-pre-line text-[0.9vw] font-medium">{props.message.content}</span>
      <span class="select-none self-end text-[0.65vw] uppercase leading-none">{formatedDate}</span>
      {
        props.self && (
          props.message.status === "seen" ?
            <Tick
              variant="double"
              class="self-end text-[1.15vw] text-white"
            />
            : props.message.status === "send" ?
              <Tick
                variant="single"
                class="self-end text-[1vw] text-white"
              />
              : <Clock class="self-end text-[1vw] text-white" />
        )
      }
    </div>
  )
})
