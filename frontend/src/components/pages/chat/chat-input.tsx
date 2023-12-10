import { $, component$, useSignal } from "@builder.io/qwik";
import Clip from "~/icons/clip";
import Emoji from "~/icons/emoji";
import Mic from "~/icons/mic";
import Send from "~/icons/send";

interface Props {
  onMessage: (message: string) => void;
}

// TODO: TextAreaAutoSize component
export default component$<Props>((props) => {
  const message = useSignal("");

  const handleFormSubmit = $(
    (e?: SubmitEvent) => {
      console.log(message.value);
      props.onMessage(message.value);
    }
  )

  const handleKeyDown = $(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleFormSubmit();
      }
    }
  )

  return (
    <form
      preventdefault:submit
      onSubmit$={handleFormSubmit}
      class="absolute bottom-0 flex w-full items-center gap-[1vw] bg-stone-900 p-[1vw]"
    >
      <button
        type="button"
        class="text-[1.75vw] text-white/50 transition-colors hover:text-white/75"
      >
        <Clip />
      </button>
      <textarea
        bind:value={message}
        onKeyDown$={handleKeyDown}
        class="md:max-h-[1.5vw] flex-1 resize-none border-none bg-transparent text-[1vw] text-white outline-none [scrollbar-width:none]"
        placeholder="Write a message..."
      >
      </textarea>
      <button
        type="button"
        class="text-[1.5vw] text-white/50 transition-colors hover:text-white/75"
      >
        <Emoji />
      </button>
      <button
        type="submit"
        class="text-[1.65vw] text-white/50 transition-colors hover:text-white/75"
      >
        {message.value ? <Send /> : <Mic />}
      </button>
    </form>
  )
})
