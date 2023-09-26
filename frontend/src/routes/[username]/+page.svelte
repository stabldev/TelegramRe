<script lang="ts">
	import { page } from "$app/stores";
	import { FormatDate } from "$functions/format_date";
	import { FormatString } from "$functions/format_string";
	import Clip from "$icons/clip.svelte";
	import Close from "$icons/close.svelte";
	import Emoji from "$icons/emoji.svelte";
	import Menu from "$icons/menu.svelte";
	import Pencil from "$icons/pencil.svelte";
	import Search from "$icons/search.svelte";
	import Send from "$icons/send.svelte";
	import { slide } from "svelte/transition";

	// mock chat data
	const chat_mapping: Array<{
		sender: string,
		message: string,
		time: string
	}> = [
		{
			sender: "tokito",
			message: "Hi wassup!",
			time: "2023-09-25T15:35:51.162Z"
		},
		{
			sender: "tokito",
			message: "Its me Tokito",
			time: "2023-09-25T15:35:51.162Z"
		},
		{
			sender: "anya-forger",
			message: "Hey! I'm good",
			time: "2023-09-25T15:38:51.162Z"
		},
		{
			sender: "anya-forger",
			message: "How's life?",
			time: "2023-09-25T15:38:51.162Z"
		}
	];

	// profile sidebar
	let profile_sidebar_open: boolean = false;
	
	function toggle_profile_sidebar() {
		profile_sidebar_open = !profile_sidebar_open;
	};

</script>

<div class="chat-container">
	<div class="chat-header">
		<div class="chat-user">
			<img
				src="https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg"
				alt=""
			/>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				on:mousedown={toggle_profile_sidebar}
				class="user"
			>
				<span class="user-name">
					Anya Forger
				</span>
				<span class="user-last-seen">
					last seen recently
				</span>
			</div>
		</div>
		<div class="chat-options">
			<div class="search-icon btn">
				<Search />
			</div>
			<div class="dot-menu-icon btn">
				<Menu variant="dots" />
			</div>
		</div>
	</div>

	<div class="chat-body">
		<div class="chat-area">
			<div class="chats">
				{#each chat_mapping as chat, index}
					{@const formated_time = new FormatDate(chat.time).format_to_relative_time}
					{@const formated_sender_name = new FormatString(chat.sender).add_at_symbol}
					<!-- boolean checks -->
					{@const sender_is_me = $page.url.pathname.slice(1) !== formated_sender_name}
					{@const is_last_message = (() => {
						if (index === chat_mapping.length - 1) return true;
						else if (chat.sender !== chat_mapping[index + 1].sender) return true;
						else return false;
					})()}

					<div
						class="chat"
						class:chat-me={sender_is_me}
						class:last-message={is_last_message}
					>
						<span class="message">{chat.message}</span>
						<span class="time">{formated_time}</span>
					</div>
				{/each}
			</div>
			<div class="message-area">
				<div class="message-input">
					<div class="emoji-icon btn">
						<Emoji />
					</div>
					<input placeholder="Message" type="text">
					<div class="clip-icon btn">
						<Clip />
					</div>
				</div>
				<button class="message-submit">
					<Send />
				</button>
			</div>
		</div>
	</div>
</div>

{#if profile_sidebar_open}
	<div class="chater-profile" transition:slide={{ axis: "x" }}>
		<div class="profile-head">
			<div class="left-controls">
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:mousedown={toggle_profile_sidebar}
					class="close-btn btn"
				>
					<Close />
				</div>
				<span>Profile</span>
			</div>
			<div class="edit-btn btn">
				<Pencil variant="outline" />
			</div>
		</div>

		<div
			class="profile-body"
			style="
				background: url(https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg);
				background-size: cover;
			"
		>
			<div class="gradient">
				<span class="name">Anya Forger</span>
				<span class="last-seen">last seen recently</span>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.chat-container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.chat-header {
		padding-inline: 1rem;
		display: flex;
		align-items: center;
		flex-shrink: 0;
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
				user-select: none;
				cursor: pointer;

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
				width: 1.65rem;
				padding: 0.65rem;
			}

			.dot-menu-icon {
				rotate: 90deg;
				width: 1.65rem;
				padding: 0.65rem;
			}
		}
	}

	.chat-body {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: end;
		justify-content: center;
		padding-bottom: 1rem;

		.chat-area {
			width: 40rem;

			.chats {
				display: flex;
				flex-direction: column;
				gap: 0.2rem;
				padding-right: 5rem;
				padding-bottom: 0.5rem;

				.chat {
					align-self: self-start;
					display: flex;
					gap: 0.5rem;
					height: 2rem;
					padding: 0.25rem 1rem;
					border-radius: 2rem 2rem 2rem 0.75rem;
					background: var(--surface-color);

					.message {
						align-self: center;
						color: white;
						font-size: 1.1rem;
					}

					.time {
						align-self: self-end;
						font-size: 0.75rem;
						text-transform: uppercase;
						color: white;
						opacity: 0.7;
						user-select: none;
					}

					&.chat-me {
						align-self: self-end;
						border-radius: 2rem 2rem 0.75rem 2rem;
						background: var(--primary-color);

						&.last-message {
							border-radius: 2rem 0.75rem 0.75rem 2rem;
						}
					}

					&.last-message {
						border-radius: 0.75rem 2rem 2rem 0.75rem;
					}
				}
			}

			.message-area {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 1rem;

				.message-input {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 0.5rem;
					background: var(--surface-color);
					padding: 0.5rem;
					border-radius: 1rem;

					.emoji-icon {
						width: 2rem;
					}
					input {
						flex: 1;
						background: none;
						border: none;
						outline: none;
						font-size: 1.1rem;
						color: white;
						caret-color: var(--secondary-color);

						&::placeholder {
							color: var(--secondary-color);
							opacity: 1;
						}
					}
					.clip-icon {
						width: 1.5rem;
						padding: 0.75rem;
					}
				}

				.message-submit {
					width: 4rem;
					display: flex;
					align-items: center;
					justify-content: center;
					color: white;
					background: var(--primary-color);
					padding: 1rem;
					border-radius: 50%;
					cursor: pointer;
				}
			}
		}
	}

	.chater-profile {
		height: 100%;
		width: 25rem;
		flex-shrink: 0;
		background: var(--surface-color);
		border-left: 0.2rem solid var(--surface-dark-color);

		.profile-head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 4.5rem;
			padding-inline: 1rem;

			.left-controls {
				display: flex;
				align-items: center;
				gap: 1rem;

				span {
					color: white;
					font-size: 1.2rem;
					font-weight: 500;
				}
			}

			.close-btn {
				width: 2rem;
			}

			.edit-btn {
				width: 1.75rem;
				padding: 0.65rem;
			}
		}

		.profile-body {
			height: 25rem;
			display: flex;
			flex-direction: column;
			justify-content: end;

			.gradient {
				display: flex;
				flex-direction: column;
				padding: 1rem 2rem;
				padding-top: 5rem;
				background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);

				.name {
					color: white;
					font-size: 1.5rem;
					font-weight: 600;
					white-space: nowrap;
				}
				.last-seen {
					color: white;
					opacity: 0.8;
					font-size: 1rem;
					white-space: nowrap;
				}
			}
		}
	}
</style>