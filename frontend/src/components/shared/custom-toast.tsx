import toast, { ToastOptions } from "solid-toast";
import { cn } from "~/functions/cn";

export function customToast(message: string, props?: ToastOptions) {
	return toast.custom(
		(t) => (
			<div class={cn(t.visible ? "animate-enter" : "animate-leave", "relative flex items-center md:rounded-[0.75vw] bg-stone-700 font-medium drop-shadow-md md:gap-[0.75vw] md:py-[0.5vw] md:p-[0.75vw]")}>
				<span class="text-stone-100">{message}</span>
				<button
					class="flex items-center justify-center md:rounded-[0.5vw] bg-stone-600 transition-colors hover:bg-stone-500 md:h-[1.5vw] md:w-[1.5vw] text-stone-200"
					onClick={() => toast.dismiss(t.id)}
				>
					&times;
				</button>
			</div>
		),
		{ ...props }
	);
}
