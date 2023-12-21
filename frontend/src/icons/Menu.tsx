import { Show } from "solid-js";
import { VariantIcon } from "~/types/Icon";

export default function Menu(props: VariantIcon) {
	return (
		<Show
			when={props.variant === "bars"}
			fallback={
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
					<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
				</svg>
			}
		>
			<svg
				{...props}
				fill="currentColor"
				stroke-width="0"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 448 512"
				style={{ overflow: "visible" }}
				height="1em"
				width="1em"
			>
				<path d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z" />
			</svg>
		</Show>
	);
}
