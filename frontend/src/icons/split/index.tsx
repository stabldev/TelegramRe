import { component$ } from "@builder.io/qwik";
import { Icon } from "~/types/components/icon";

export default component$<Icon>((props) => {
  return (
    <svg
      {...props}
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      style={{ overflow: "visible" }}
      height="1em"
      width="1em"
    >
      <path d="M14 1H3L2 2v11l1 1h11l1-1V2l-1-1zM8 13H3V2h5v11zm6 0H9V2h5v11z" />
    </svg>
  )
})
