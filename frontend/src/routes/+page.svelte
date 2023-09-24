<script lang="ts">
	import Menu from "$lib/icons/menu.svelte";
</script>

<main>
	<div class="sidebar">
		<div class="sidebar-head">
			<div class="menu">
				<button>
					<Menu style="width: 2rem;" />
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

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: 30rem auto;
	}

	.sidebar {
		width: 100%;
		height: 100vh;
		background: #212121;

		.sidebar-head {
			display: flex;
			align-items: center;
			padding: 0.75rem 1rem;

			.menu button {
				cursor: pointer;
				background: none;
				border: none;
				outline: none;
				color: #aaaaaa;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				padding: 0.5rem;

				&:hover {
					background: #2B2B2B;
				}
			}
		}
	}
</style>