import { createSignal } from "solid-js";
import { JSX, createEffect } from "solid-js";
import { v4 as uuidv4 } from "uuid";

interface Props {
  children?: JSX.Element;
  inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
  value?: string;
  errorMsg?: string;
}

const TextInput = (props: Props) => {
  const { inputProps, children } = props;
  const [inputRef, setInputRef] = createSignal<HTMLInputElement | null>(null);

  const uuid = uuidv4();

  createEffect(() => {
    if (props.errorMsg && props.errorMsg.length > 0) {
      inputRef()?.focus();
    }
  });

  return (
    <>
      <label
        for={`${inputProps.type ?? "text"}-input-${uuid}`}
        class="relative flex items-center border-2 border-neutral-300 duration-200 ease-out focus-within:border-primary md:rounded-xl md:p-2.5 md:text-base"
        classList={{
          "focus-within:!border-error":
            props.errorMsg !== undefined && props.errorMsg.length !== 0
        }}
      >
        <input
          ref={setInputRef}
          {...inputProps}
          id={`${inputProps.type ?? "text"}-input-${uuid}`}
          placeholder="" // input field needs empty placeholder to work
          value={props.value}
          class="peer w-full bg-transparent pl-1.5 text-accent outline-none"
        />
        <span class="pointer-events-none absolute start-3 top-0 -translate-y-1/2 bg-base-200 p-1 text-xs text-neutral-100 duration-200 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs">
          {props.errorMsg ? props.errorMsg : inputProps.placeholder}
        </span>
        {children}
      </label>
    </>
  );
};

export default TextInput;
