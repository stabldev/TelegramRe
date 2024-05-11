import { JSX } from "solid-js";
import { v4 as uuidv4 } from "uuid";

interface Props {
	inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
}

const CheckBox = (props: Props) => {
	const { inputProps } = props;
	const uuid = uuidv4();

	return (
		<>
			<label
				for={`checkbox-input-${uuid}`}
				class="relative flex items-center md:gap-3"
			>
				<input
					{...inputProps}
					type="checkbox"
					id={`checkbox-input-${uuid}`}
					class="peer relative cursor-pointer appearance-none rounded border-2 border-neutral-300 bg-transparent checked:border-0 checked:bg-primary md:size-4"
				/>
				<svg
					class="absolute start-0.5 hidden self-center text-accent peer-checked:block md:size-3"
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
	);
};

export default CheckBox;
