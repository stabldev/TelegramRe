<script lang="ts">
	import Menu from "$lib/icons/menu.svelte";
	import Search from "$lib/icons/search.svelte";

	// testing variable
	let active_chat_index: number = 0;
	const change_chat_index = (index: number) => {
		active_chat_index = index;
	};
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
		<div class="sidebar-body">
			{#each Array(10) as _, index}
				{@const is_active = active_chat_index == index}

				<div
					on:mousedown={() => change_chat_index(index)}
					class="chat"
					class:active={is_active}
				>
					<div class="chat-image">
						<img src="https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg" />
					</div>
					<div class="chat-info">
						<div class="chat-name-date">
							<div class="chat-name-badge">
								<span class="chat-name">Anya Forger</span>
								<!-- Verified badge -->
							</div>
							<span
								class="chat-date"
								class:active={is_active}
							>1:37 PM</span>
						</div>
						<span
							class="chat-msg"
							class:active={is_active}
						>
							Hi wassup! I've something to tell you, so please reply when you're free
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<chat></chat>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: 30rem auto;
	}

	.sidebar {
		width: 100%;
		height: 100vh;
		background: var(--surface-color);
		display: flex;
		flex-direction: column;

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
					caret-color: var(--primary-color);
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
						border-color: var(--primary-color);
					}
				}
				// Change search icon color on focus
				&:focus-within {
					.search-icon {
						color: var(--primary-color);
						opacity: 1;
					}
				}
			}
		}

		.sidebar-body {
			padding: 0.75rem;
			overflow-y: scroll;

			scrollbar-width: thin;

			.chat {
				user-select: none;
				cursor: pointer;
				display: flex;
				align-items: center;
				gap: 0.75rem;
				color: white;
				padding: 0.75rem;
				border-radius: 0.75rem;

				&.active {
					background: var(--primary-color);
				}

				&:hover:not(.active) {
					background: rgba(170, 170, 170, 0.08);
				}

				&-image {
					width: 5rem;
					aspect-ratio: 1/1;
					border-radius: 50%;
					overflow: hidden;

					img {
						width: 100%;
						height: 100%;
					}
				}

				&-info {
					width: 100%;
					display: flex;
					flex-direction: column;
					gap: 0.25rem;

					.chat-name-date {
						display: flex;
						align-items: start;
						justify-content: space-between;

						.chat-name {
							font-size: 1.15rem;
							font-weight: 500;
						}

						.chat-date {
							font-size: 0.9rem;
							color: #aaaaaa;

							&.active {
								color: white;
							}
						}
					}

					.chat-msg {
						color: #aaaaaa;
						font-size: 1.1rem;
						font-weight: 400;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;

						&.active {
							color: white;
						}
					}
				}
			}
		}
	}
</style>