import { Icon } from "~/types/icon.types";

export default function Mic(props: Icon) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
		>
			<g fill="none">
				<rect
					width="8"
					height="13"
					x="8"
					y="2"
					fill="currentColor"
					rx="4"
				/>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 11a7 7 0 1 0 14 0m-7 10v-2"
				/>
			</g>
		</svg>
	);
}
