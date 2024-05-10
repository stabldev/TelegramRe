import { JSX } from "solid-js";
import { v4 as uuidv4 } from "uuid";

interface Props {
	inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
};

export default function CheckBox(props: Props) {
	const { inputProps } = props;
	const uuid = uuidv4()

	return <>
		<label
			for={`checkbox-input-${uuid}`}
			class="relative flex items-center md:gap-3"
		>
			<input
				{...inputProps}
				type="checkbox"
				id={`checkbox-input-${uuid}`}
				class="relative peer appearance-none md:size-4 border-2 border-neutral-300 cursor-pointer rounded bg-transparent checked:bg-primary checked:border-0"
			/>
			<svg
			    class="absolute md:size-3 text-accent self-center start-0.5 hidden peer-checked:block"
			    xmlns="http://www.w3.org/2000/svg"
			    viewBox="0 0 24 24"
			    fill="none"
			    stroke="currentColor"
			    stroke-width="4"
			    stroke-linecap="round"
			    stroke-linejoin="round"
			 >
			    <polyline points="20 6 9 17 4 12"></polyline>
			</svg>
			<span class="text-neutral-100">{inputProps.placeholder}</span>
		</label>
	</>
};