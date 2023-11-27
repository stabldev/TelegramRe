import { HttpStatusCode } from "solid-start/server";
 
export default function NotFound() {
  	return (
    	<div class="flex flex-col items-center justify-center w-screen h-screen bg-stone-100 text-stone-900 leading-none">
      		<HttpStatusCode code={404} />
      		<code class="md:text-[5vw] font-bold">404</code>
      		<span class="md:text-[1.2vw]">Page not found</span>
    	</div>
  	);
}