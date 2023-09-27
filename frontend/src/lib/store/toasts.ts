import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

type Toast = {
	id?: number;
	message?: string;
	timeout?: number;
};

export const toasts: Writable<Toast[]> = writable([]);

export const addToast = (toast: Toast): void => {
	// generate random id to make "dismissToast" function more efficient
	const id = Math.floor(Math.random() * 10000);
	// toast defaults props
	const toast_defaults: Toast = {
		id,
		timeout: 3000 // default timeout "3s"
	};

	const merged_toast: Toast = { ...toast_defaults, ...toast };

	toasts.update((toasts) => [...toasts, merged_toast]);
	// dismiss toast after timeout
	setTimeout(() => dismissToast(id), merged_toast.timeout);
};

export const dismissToast = (id: number): void => {
	toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
};
