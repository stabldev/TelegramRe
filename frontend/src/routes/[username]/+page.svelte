<script>
	import Menu from "$icons/menu.svelte";
import Search from "$icons/search.svelte";

</script>
<div class="chat-header">
	<div class="chat-user">
		<img
			src="https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg"
			alt=""
		/>
		<div class="user">
			<span class="user-name">
				Anya Forger
			</span>
			<span class="user-last-seen">
				last seen recently
			</span>
		</div>
	</div>
	<div class="chat-options">
		<div class="search-icon">
			<Search />
		</div>
		<div class="dot-menu-icon">
			<Menu variant="dots" />
		</div>
	</div>
</div>

<style lang="scss">
	.chat-header {
		padding-inline: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 4.5rem;
		background: var(--surface-color);

		.chat-user {
			display: flex;
			align-items: center;
			gap: 1rem;

			img {
				width: 3.25rem;
				border-radius: 50%;
			}

			.user {
				display: flex;
				flex-direction: column;
				gap: 0.15rem;

				&-name {
					color: white;
					font-size: 1.2rem;
					font-weight: 500;
				}

				&-last-seen {
					color: var(--secondary-color);
					font-size: 1rem;
					font-weight: 400;
				}
			}
		}

		.chat-options {
			display: flex;
			align-items: center;
			gap: 0.5rem;

			.search-icon {
				width: 1.75rem;
				cursor: pointer;
				background: none;
				border: none;
				outline: none;
				color: var(--secondary-color);
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				padding: 0.65rem;

				&:hover {
					background: var(--surface-light-color);
				}
			}

			.dot-menu-icon {
				rotate: 90deg;
				width: 1.75rem;
				cursor: pointer;
				background: none;
				border: none;
				outline: none;
				color: var(--secondary-color);
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				padding: 0.65rem;

				&:hover {
					background: var(--surface-light-color);
				}
			}
		}
	}
</style>