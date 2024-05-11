import { JSX } from "solid-js";
import { v4 as uuidv4 } from "uuid";

interface Props {
	children?: JSX.Element;
	inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
	value?: string;
	errorMsg?: string;
};

const TextInput = (props: Props) => {
	const { inputProps, children, errorMsg, value } = props;
	const uuid = uuidv4()

	return <>
		<label
			for={`${inputProps.type ?? "text"}-input-${uuid}`}
			class="relative flex items-center border-2 border-neutral-300 focus-within:border-primary md:rounded-xl md:p-2.5 md:text-base"
			classList={{
				"border-error focus-within:border-error": errorMsg !== undefined,
			}}
		>
			<input
				{...inputProps}
				id={`${inputProps.type ?? "text"}-input-${uuid}`}
				placeholder="" // input field needs empty placeholder to work
				value={value}
				class="peer w-full outline-none bg-transparent text-accent pl-1.5"
			/>
			<span class="pointer-events-none absolute start-3 top-0 -translate-y-1/2 bg-base-200 p-1 text-neutral-100 duration-200 ease-out text-xs peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs">
				{errorMsg ? errorMsg : inputProps.placeholder}
			</span>
			{children}
		</label>
	</>
};

export default TextInput;
