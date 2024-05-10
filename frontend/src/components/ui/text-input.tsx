import { destructure } from "@solid-primitives/destructure";
import { JSX } from "solid-js";
import {v4 as uuidv4} from "uuid";

interface Props {
	inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
};

export default function TextInput(props: Props) {
	const { inputProps } = destructure(props);

	const uuid_id = uuidv4();

	return <>
		<label
			for={`${inputProps().type ?? "text"}-input-${uuid_id}`}
			class="relative flex items-center border-2 border-neutral-300 focus-within:border-primary md:rounded-xl md:p-2.5 md:text-base"
		>
			<input
				autofocus={inputProps().autofocus}
				required={inputProps().required}
				id={`${inputProps().type ?? "text"}-input-${uuid_id}`}
				type={inputProps().type}
				name="email"
				placeholder=""
				value={inputProps().value}
				class="peer w-full outline-none bg-transparent text-accent pl-1.5"
			/>
			<span  class="pointer-events-none absolute start-3 top-0 -translate-y-1/2 bg-base-200 p-1 text-neutral-100 duration-200 ease-out text-xs peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs">
				{inputProps().placeholder}
			</span>
		</label>
	</>
};