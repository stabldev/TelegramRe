import { Match, Switch } from "solid-js";
import { VariantIcon } from "~/types/icon.types";

export default function Arrow(props: VariantIcon) {
	return (
		<Switch>
			<Match when={props.variant === "down"}>
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
						d="m12 13.171 4.95-4.95 1.414 1.415L12 16 5.636 9.636 7.05 8.222l4.95 4.95Z"
					/>
				</svg>
			</Match>
		</Switch>
	);
}
