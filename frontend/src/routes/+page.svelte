<script lang="ts">
	import Menu from "$lib/icons/menu.svelte";
	import Search from "$lib/icons/search.svelte";

	// testing variable
	let active_chat_index: number = 0;
	const change_chat_index = (index: number) => {
		active_chat_index = index;
	};

	// mock chat data
	const chat_mapping = [
		{
			sender_name: "Anya Forger",
			username: "anya-forger",
			profile: "https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg",
			message: "Hi wassup! I've something to tell you, so please reply when you're free",
			time: "2023-09-25T15:38:51.162Z"
		},
		{
			sender_name: "Toshinou Kyouko",
			username: "kyouko",
			profile: "https://pbs.twimg.com/media/D2v3DBuXQAAMFIb.jpg",
			message: "Here is my gift for your birthday <3",
			time: "2023-09-25T12:38:51.162Z"
		}
	];

	const format_time = (time: string) => {
		const date = new Date(time);

		const options: Intl.DateTimeFormatOptions = {
			hour: "numeric",
			minute: "numeric",
			hour12: true
		};

		return date.toLocaleTimeString([], options);
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
			{#each chat_mapping as chat, index}
				{@const is_active = active_chat_index == index}

				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:mousedown={() => change_chat_index(index)}
					class="chat"
					class:active={is_active}
				>
					<div class="chat-image">
						<img
							src={chat.profile}
							alt=""
						/>
					</div>
					<div class="chat-info">
						<div class="chat-name-date">
							<div class="chat-name-badge">
								<span class="chat-name">{chat.sender_name}</span>
								<!-- Verified badge -->
							</div>
							<span
								class="chat-date"
								class:active={is_active}
							>
								{format_time(chat.time)}
							</span>
						</div>
						<span
							class="chat-msg"
							class:active={is_active}
						>
							{chat.message}
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
				color: var(--secondary-color);
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				padding: 0.5rem;

				&:hover {
					background: var(--surface-light-color);
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
					color: var(--secondary-color);
					opacity: 0.6;
					padding-left: 1rem;
					transition: 0.1s ease-in-out;
				}

				input {
					width: 100%;
					outline: none;
					background: #181818;
					border: 0.2rem solid var(--surface-light-color);
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
					background: var(--surface-light-color);
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
							color: var(--secondary-color);
							text-transform: uppercase;

							&.active {
								color: white;
							}
						}
					}

					.chat-msg {
						color: var(--secondary-color);
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