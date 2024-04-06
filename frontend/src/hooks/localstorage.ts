import { Signal, createSignal } from "solid-js";

export const createLocalStorageSignal = <T>(key: string, defaultValue: T): Signal<T> => {
	const storage = typeof window !== "undefined" ? window.localStorage : null;

	const initialValue = storage?.getItem(key)
		? JSON.parse(storage?.getItem(key)!)
		: defaultValue;

	const [value, setValue] = createSignal<T>(initialValue);

	const setValueAndStore = ((valOrFn: T) => {
		let _val;
		if (typeof valOrFn === "function") {
			const fn = valOrFn;
			_val = fn(value);
		} else {
			_val = valOrFn;
		}

		storage?.setItem(key, JSON.stringify(_val));
		setValue(_val);
	}) as typeof setValue;

	return [value, setValueAndStore];
};
