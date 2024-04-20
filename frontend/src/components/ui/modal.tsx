import { destructure } from "@solid-primitives/destructure";
import { JSX, Setter } from "solid-js";
import { Portal } from "solid-js/web";
import { cn } from "~/functions/cn";

interface Props {
	children: JSX.Element;
	setOpen: Setter<boolean>;
	class?: string;
};

export default function Modal(props: Props) {
	const { children, setOpen } = destructure(props);

	let modalRef: HTMLElement | undefined = undefined;

	const handleOverlayClick = (e: UIEvent) => {
		if (modalRef?.contains(e.target as Node)) return;
		else {
			setOpen()(false);
		};
	};

	return <>
		<Portal>
			<div
				onClick={handleOverlayClick}
				class={cn(props.class, "absolute inset-0 bg-base-100/25 grid place-items-center")}
			>
				<div ref={modalRef}>
					{children()}
				</div>
			</div>
		</Portal>
	</>
};