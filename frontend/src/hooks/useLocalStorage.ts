import { Signal, createSignal } from "solid-js";

/**
 * Hook to manage localStorages
 * example:
 * => const [value, setValue] = useLocalStorageSignal("theme", "dark");
 * pass key and defaultValue to set new localStorage item
 */
export const useLocalStorage = <T>(key: string, defaultValue: T): Signal<T> => {
  const storage = typeof window !== "undefined" ? window.localStorage : null;
  // get item from localStorage or use defaultValue
  const initialValue =
    storage && storage.getItem(key)
      ? JSON.parse(storage.getItem(key)!)
      : defaultValue;

  const [value, setValue] = createSignal<T>(initialValue);
  // handle Setter as value and function
  const setValueAndStore = ((valOrFn: T) => {
    let _val;
    if (typeof valOrFn === "function") {
      const fn = valOrFn;
      _val = fn(value);
    } else {
      _val = valOrFn;
    }
    // update localStorage with new value
    storage?.setItem(key, JSON.stringify(_val));
    setValue(_val);
  }) as typeof setValue;

  return [value, setValueAndStore];
};
