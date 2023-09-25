<script lang="ts">
	import type { SVGAttributes } from "svelte/elements";
	
	interface $$Props extends SVGAttributes<SVGElement> {
		variant: "bars" | "dots";
	};
	const { variant, ...props } = $$props as $$Props;
</script>

{#if variant === "bars"}
	<svg {...$$props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path fill="currentColor" d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z"/>
	</svg>
{:else}
	<svg {...$$props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path fill="currentColor" d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"/>
	</svg>
{/if}