import {v4 as uuidv4} from "uuid";

export default function TextInput(props: any) {
	const uuid_id = uuidv4();

	return <>
		<label
			for={"input" + uuid_id}
			class="relative flex items-center border-2 border-neutral-300 focus-within:border-primary md:rounded-xl md:p-2.5 md:text-base"
		>
			<input
				autofocus
				required
				id={"input" + uuid_id}
				type="email"
				name="email"
				placeholder=""
				class="peer w-full outline-none bg-transparent text-accent pl-1.5"
			/>
			<span  class="pointer-events-none absolute start-3 top-0 -translate-y-1/2 bg-base-200 p-1 text-neutral-100 duration-200 ease-out text-xs peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs">
				Email address
			</span>
		</label>
	</>
};