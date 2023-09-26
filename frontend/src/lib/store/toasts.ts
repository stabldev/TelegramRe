import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

type Toast = {
	id?: number;
	message: string;
	timeout?: number;
};

export const toasts: Writable<Toast[]> = writable([]);

export const addToast = (toast: Toast) => {
	// generate random id to make "dismissToast" function more efficient
	const id = Math.floor(Math.random() * 10000);
	// toast defaults
	const defaults = {
		id,
		timeout: 3000 // default timeout
	};

	const merged_toast = {...defaults, ...toast};

	toasts.update((all) => [merged_toast, ...all]);
	// dismiss toast after timeout
	setTimeout(() => dismissToast(merged_toast.id), merged_toast.timeout);
};

export const dismissToast = (id: number) => {
	toasts.update(toasts => toasts.filter(toast => toast.id !== id));
};