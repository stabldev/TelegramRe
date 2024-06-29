import { Show } from "solid-js";
import { cn } from "~/functions/cn";

interface Props {
  color: string;
  src: string;
  alt: string;
  class?: string;
}

const Avatar = (props: Props) => {
  const hasAvatar = props.src !== null && props.src.length;

  return (
    <Show
      when={hasAvatar}
      fallback={
        <div
          class={cn(
            props.class,
            "grid size-full select-none place-items-center"
          )}
          style={{ "background-color": props.color }}
        >
          {props.alt.charAt(0).toUpperCase()}
        </div>
      }
    >
      <img {...props} />
    </Show>
  );
};

export default Avatar;
