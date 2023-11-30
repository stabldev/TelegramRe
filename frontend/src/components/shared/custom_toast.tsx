import toast from "solid-toast";

export function customToast(message: string, duration?: number) {
  	return toast.custom((t) => (
    	<div class="px-6 py-3 pr-12 bg-white rounded-full shadow-md font-medium relative">
      	{message}
      	<button
        	class="bg-gray-200/80 hover:bg-gray-300 flex justify-center top-1/2 -translate-y-1/2 items-center w-6 h-6 right-2.5 absolute rounded-full"
        	onClick={() => toast.dismiss(t.id)}
      	>
        	&times;
      	</button>
    	</div>
  	), {
    	duration: duration ?? 5000,
    	unmountDelay: 0,
  	});
}
