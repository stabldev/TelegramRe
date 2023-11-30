import toast, { Message, ToastOptions } from "solid-toast";
import { cn } from "~/functions/cn";

export function customToast(message: string, props?: ToastOptions) {
  	return toast.custom((t) => (
    	<div class={cn(t.visible ? "animate-enter" : "animate-leave", "bg-white rounded-full shadow-sm font-medium relative flex md:gap-[0.75vw] items-center md:py-[0.5vw] md:pl-[1vw] md:pr-[0.75vw]")}>
	      	<span>{message}</span>
	      	<button
	        	class="bg-stone-100 hover:bg-stone-200 transition-colors flex justify-center items-center rounded-full md:w-[1.5vw] md:h-[1.5vw]"
	        	onClick={() => toast.dismiss(t.id)}
	      	>
	        	&times;
	      	</button>
    	</div>
  	), {...props});
}
