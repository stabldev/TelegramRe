import { Icon } from "~/types/icon.types";

export default function Pencil(props: Icon) {
	return (
		<svg
			{...props}
			fill="currentColor"
			stroke-width="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			style={{ overflow: "visible" }}
			height="1em"
			width="1em"
		>
			<path
				fill="currentColor"
				d="m12.9 6.854 4.242 4.243-9.9 9.9H3v-4.243l9.9-9.9Zm1.414-1.414 2.121-2.121a1 1 0 0 1 1.414 0l2.829 2.828a1 1 0 0 1 0 1.414l-2.122 2.122-4.242-4.243Z"
			/>
		</svg>
	);
}
