<script lang="ts">
	import type { SVGAttributes } from "svelte/elements";
	
	interface $$Props extends SVGAttributes<SVGElement> {
		variant: "filled" | "outline";
	};
	const {variant, ...props} = $$props as $$Props;
</script>

{#if variant === "filled"}
	<svg {...$$props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z"/>
	</svg>
{:else}
	<svg {...$$props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path fill="currentColor" d="m14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/>
	</svg>
{/if}