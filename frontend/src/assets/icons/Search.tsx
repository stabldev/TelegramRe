import { Icon } from "../../types/Icon";

export default function Search(props: Icon) {
  return (
    <svg
      {...props}
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{"overflow":"visible"}}
      height="1em"
      width="1em"
    >
      <path d="M10.25 2a8.25 8.25 0 0 1 6.34 13.53l5.69 5.69a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-5.69-5.69A8.25 8.25 0 1 1 10.25 2ZM3.5 10.25a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 0 0-13.5 0Z" />
    </svg>
  );
}
