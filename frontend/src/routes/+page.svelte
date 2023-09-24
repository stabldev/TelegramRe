<script lang="ts">
	import Menu from "$lib/icons/menu.svelte";
</script>

<main>
	<div class="sidebar">
		<div class="sidebar-head">
			<div class="menu">
				<button>
					<Menu />
				</button>
			</div>
			<div class="search">
				<input placeholder="Search" />
			</div>
		</div>
	</div>
	<chat>
		chat
	</chat>
</main>

<style lang="postcss">
	main {
		display: grid;
		grid-template-columns: 400px auto;
	}

	/* Sidebar */
	.sidebar {
		width: 100%;
	}

	.sidebar-head {
		display: flex;
	}
</style>