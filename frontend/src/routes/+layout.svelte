<script lang="ts">
	import { FormatDate } from "$functions/format_date";
	import { FormatString } from "$functions/format_string";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	// icons
	import Menu from "$icons/menu.svelte";
	import Pencil from "$icons/pencil.svelte";
	import Search from "$icons/search.svelte";
	// global style
	import "../app.scss";

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
			time: "2023-09-24T12:38:51.162Z"
		}
	];
</script>

<svelte:head>
	<title>Telegram Redition</title>
</svelte:head>

<main>
	<div class="sidebar">
		<div class="sidebar-head">
			<div class="menu">
				<button class="btn">
					<Menu variant="bars" />
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
			{#each chat_mapping as chat}
				{@const username_with_symbol = new FormatString(chat.username).add_at_symbol}
				{@const formated_time = new FormatDate(chat.time).format_to_relative_time}
				<!-- check if chat is active by current url pathname -->
				{@const is_active = $page.url.pathname.slice(1) === username_with_symbol}

				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:mousedown={() => goto(`/${username_with_symbol}`)}
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
								{formated_time}
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

			<div class="floating-btn">
				<Pencil />
			</div>
		</div>
	</div>
	<div class="chat-area">
		<slot />
	</div>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: 30rem auto;
	}

	.chat-area {
		background: url(https://img.freepik.com/free-photo/3d-mountain-landscape-with-purple-sunset-sky_1048-8133.jpg?w=826&t=st=1695646024~exp=1695646624~hmac=08c531f7a5ca1c1cd56167e3ad3175568b1f923e1c507ea154f056e96e0d292b);
		background-position: center;
		background-size: cover;
		display: flex;
		flex-direction: column;
	}

	.sidebar {
		height: 100vh;
		background: var(--surface-color);
		display: flex;
		flex-direction: column;
		border-right: 0.2rem solid var(--surface-dark-color);

		.sidebar-head {
			display: flex;
			gap: 0.5rem;
			align-items: center;
			padding: 0.75rem 1rem;

			.menu button {
				width: 3rem;
			}

			.search {
				width: 100%;
				position: relative;
				display: flex;
				align-items: center;

				.search-icon {
					display: flex;
					width: 1.5rem;
					position: absolute;
					color: var(--secondary-color);
					opacity: 0.6;
					padding-left: 1rem;
					transition: 0.1s ease-in-out;
				}

				input {
					width: 100%;
					outline: none;
					background: var(--surface-dark-color);
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
			position: relative;
			padding: 0.75rem;
			overflow-y: scroll;
			height: 100%;

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

			.floating-btn {
				position: absolute;
				bottom: 1rem;
				right: 1rem;
				width: 2rem;
				display: flex;
				color: white;
				background: var(--primary-color);
				padding: 1rem;
				border-radius: 50%;
				cursor: pointer;
			}
		}
	}
</style>