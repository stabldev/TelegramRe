<script lang="ts">
	import { toasts } from "$store/toasts";
	import { fade } from "svelte/transition";
</script>

{#if $toasts}
	<div class="toasts-container">
		{#each $toasts as toast (toast.id)}
			<div
				transition:fade={{ duration: 100 }}
				class="toast"
			>
				{toast.message}
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.toasts-container {
		position: fixed;
		inset: 0;
		display: flex;
		gap: 0.25rem;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		pointer-events: none;

		.toast {
			background: rgba(#212121, 0.5);
			color: white;
			padding: 0.65rem 1rem;
			border-radius: 0.75rem;
			font-size: 1.1rem;
			backdrop-filter: blur(1rem);
		}
	}
</style>