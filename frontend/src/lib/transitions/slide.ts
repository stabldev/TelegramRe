import { backOut } from 'svelte/easing';
import type { EasingFunction, TransitionConfig } from 'svelte/transition';

export interface SlideParams {
	duration?: number;
	easing?: EasingFunction;
	inertia?: number;
}

export function slide(node: HTMLElement, params: SlideParams = {}) {
	// transition config with default props
	const transition: TransitionConfig = {
		duration: params.duration ?? 400,
		easing: params.easing ?? backOut,
		css: (t: number, u: number) => `transform: translateX(${u * 100 * (params.inertia ?? 0.15)}%);`
	};

	return transition;
}
