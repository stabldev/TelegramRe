import toast, { ToastOptions } from "solid-toast";
import { cn } from "~/functions/cn";

export function customToast(message: string, props?: ToastOptions) {
	return toast.custom(
		(t) => (
			<div class={cn(t.visible ? "animate-enter" : "animate-leave", "relative flex items-center rounded-full bg-white font-medium shadow-sm md:gap-[0.75vw] md:py-[0.5vw] md:pl-[1vw] md:pr-[0.75vw]")}>
				<span>{message}</span>
				<button
					class="flex items-center justify-center rounded-full bg-stone-100 transition-colors hover:bg-stone-200 md:h-[1.5vw] md:w-[1.5vw]"
					onClick={() => toast.dismiss(t.id)}
				>
					&times;
				</button>
			</div>
		),
		{ ...props }
	);
}
