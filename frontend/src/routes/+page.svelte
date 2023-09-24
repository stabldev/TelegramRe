<script lang="ts">
	import Menu from "$lib/icons/menu.svelte";
	import Search from "$lib/icons/search.svelte";
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
				<div class="search-icon">
					<Search />
				</div>
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
			gap: 0.5rem;
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

			.search {
				width: 100%;
				margin-right: 0.75rem;
				position: relative;
				display: flex;
				align-items: center;

				.search-icon {
					display: flex;
					width: 1.5rem;
					position:
					absolute;
					color: #aaaaaa;
					opacity: 0.6;
					padding-left: 1rem;
					transition: 0.1s ease-in-out;
				}

				input {
					width: 100%;
					outline: none;
					background: #181818;
					border: 0.2rem solid #2B2B2B;
					padding: 0.8rem 3rem;
					border-radius: 10rem;
					color: white;
					font-size: 1.1rem;
					font-weight: 500;
					caret-color: #8774e1;
					transition: 0.1s ease-in-out;

					&::placeholder {
						color: #909192;
						opacity: 1;
						font-weight: 500;
					}

					&:hover {
						border-color: #707579;
					}

					&:focus {
						border-color: #8774e1;
					}
				}
				// Change search icon color on focus
				&:focus-within {
					.search-icon {
						color: #8774e1;
						opacity: 1;
					}
				}
			}
		}
	}
</style>