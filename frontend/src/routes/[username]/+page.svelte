<script lang="ts">
	import { page } from "$app/stores";
	import { FormatDate } from "$functions/format_date";
	import { FormatString } from "$functions/format_string";
	import { chat_mapping } from "$home/src/lib/data/chat_messages";
	import AtSymbol from "$icons/at_symbol.svelte";
	import Clip from "$icons/clip.svelte";
	import Close from "$icons/close.svelte";
	import Emoji from "$icons/emoji.svelte";
	import Info from "$icons/info.svelte";
	import Link from "$icons/link.svelte";
	import Menu from "$icons/menu.svelte";
	import Pencil from "$icons/pencil.svelte";
	import Search from "$icons/search.svelte";
	import Send from "$icons/send.svelte";
	import { addToast } from "$store/toasts";
	import { SvelteComponent, afterUpdate } from "svelte";

	// variables
	let message_el: HTMLInputElement;

	// mock chat data
	let chat_data: [string, {
		id: number;
		sender: string;
		message: string;
		time: string;
	}[]] | undefined;

	afterUpdate(() => {
		chat_data = Object.entries(chat_mapping)
		.find(([username]) => username === $page.url.pathname.slice(2));
	});

	// send message
	function send_message(event: Event) {;
		const message = message_el.value;
		
		// clear message input
		message_el.value = "";
	};

	// profile sidebar
	let profile_sidebar_open: boolean = false;
	
	function toggle_profile_sidebar() {
		profile_sidebar_open = !profile_sidebar_open;
	};

	const user_info_mapping: {
		[key: string]: {
			text: string;
			component: typeof SvelteComponent<{}>;
		}
	} = {
		"Username": {
			text: "anya-forger",
			component: AtSymbol
		},
		"Bio": {
			text: "Love to build cool things in browser",
			component: Info
		},
		"Link": {
			text: "/@anya-forger",
			component: Link
		}
	};

</script>

<div
	class="chat-container"
	style="width: {profile_sidebar_open ? "calc(100% - 25rem)" : "100%"};"
>
	<div class="chat-header">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:mousedown={toggle_profile_sidebar}
			class="chat-user"
		>
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
				{#if chat_data}
					{#each chat_data[1] as chat, index (chat.id)}
						{@const formated_time = new FormatDate(chat.time).format_to_relative_time}
						{@const formated_sender_name = new FormatString(chat.sender).add_at_symbol}
						<!-- boolean checks -->
						{@const sender_is_me = $page.url.pathname.slice(1) !== formated_sender_name}
						<!-- check if sender is self -->
						{@const is_last_message = (() => {
							if (index === chat_data[1].length - 1) return true;
							else if (chat.sender !== chat_data[1][index + 1]?.sender) return true;
							else return false;
						})()}
						<!-- check if message is alone -->
						{@const is_alone_message = (() => {
							if (index === 0 && chat_data[1].length === 1) return true;
							else if (index === 0 && chat.sender !== chat_data[1][index + 1]?.sender) return true;
							else if (index === chat_data[1].length - 1 && chat.sender !== chat_data[1][index - 1]?.sender) return true;
							else if (chat.sender !== chat_data[1][index + 1]?.sender && chat.sender !== chat_data[1][index - 1]?.sender) return true;
							else return false;
						})()}
						<!-- check if message is on middle -->
						{@const is_middle_message = (() => {
							if (chat.sender === chat_data[1][index - 1]?.sender && chat.sender === chat_data[1][index + 1]?.sender) return true;
							else return false;
						})()}

						<div
							class="chat"
							class:chat-me={sender_is_me}
							class:last-message={is_last_message}
							class:alone-message={is_alone_message}
							class:middle-message={is_middle_message}
						>
							<span class="message">{chat.message}</span>
							<span class="time">{formated_time}</span>
						</div>
					{/each}
				{/if}
			</div>
			<form
				on:submit|preventDefault={send_message}
				autocomplete="off"
				class="message-area"
			>
				<div class="message-input">
					<div class="emoji-icon btn">
						<Emoji />
					</div>

					<input
						bind:this={message_el}
						type="text"
						name="message"
						placeholder="Message"
					>
					
					<div class="clip-icon btn">
						<Clip />
					</div>
				</div>
				<button class="message-submit">
					<Send />
				</button>
			</form>
		</div>
	</div>
</div>

<div
	class="chater-profile"
	style="
		transform: translateX({profile_sidebar_open ? 0 : "25rem"});
		border-left-width: {profile_sidebar_open ? "0.2rem" : 0};
	"
>
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

	<div class="profile-wrapper">
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

		<div class="user-info">
			{#each Object.entries(user_info_mapping) as info}
				{@const label = info[0]}
				{@const text = info[1].text}
				{@const component = info[1].component}

				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="info-box"
					on:mousedown={() => {
						navigator.clipboard.writeText(text)
							.then(() => addToast({ message: `${label} copied to clipboard` }))
							.catch(() => addToast({ message: `Couldn't copy ${label} to clipboard` }));
					}}
				>
					<div class="symbol">
						<svelte:component this={component} />
					</div>
					<div class="info">
						<span class="info-data">{text}</span>
						<span class="info-label">{label}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.chat-container {
		display: flex;
		flex-direction: column;
		transition: 0.3s ease-in-out;
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
			user-select: none;
			cursor: pointer;
			flex: 1;

			img {
				width: 3.25rem;
				border-radius: 50%;
			}

			.user {
				display: flex;
				flex-direction: column;

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
							border-radius: 2rem 0.75rem 2rem 2rem;
						}

						&.alone-message {
							border-radius: 2rem 2rem 0.75rem 2rem;
						}

						&.middle-message {
							border-radius: 2rem 0.75rem 0.75rem 2rem;
						}
					}

					&.last-message {
						border-radius: 0.75rem 2rem 2rem 2rem;
						margin-bottom: 0.5rem;
					}

					&.alone-message {
						border-radius: 2rem 2rem 2rem 0.75rem;
					}

					&.middle-message {
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
		position: absolute;
		right: 0;
		height: 100vh;
		width: 25rem;
		flex-shrink: 0;
		background: var(--surface-color);
		border-left: 0.2rem solid var(--surface-dark-color);
		display: flex;
		flex-direction: column;
		transition: 0.3s ease-in-out;

		.profile-head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 4.5rem;
			padding-inline: 1rem;
			flex-shrink: 0;

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

		.profile-wrapper {
			height: 100%;
			overflow-y: scroll;

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
					}
					.last-seen {
						color: white;
						opacity: 0.8;
						font-size: 1rem;
					}
				}
			}

			.user-info {
				padding: 0.75rem;
				display: flex;
				flex-direction: column;

				.info-box {
					display: flex;
					align-items: center;
					gap: 2rem;
					padding: 0.75rem 1rem;
					cursor: pointer;
					border-radius: 0.75rem;
					user-select: none;

					&:hover {
						background: var(--surface-light-color);
					}

					.symbol {
						width: 2rem;
						display: flex;
						align-items: center;
						justify-content: center;
						color: var(--secondary-color);
					}

					.info {
						display: flex;
						flex-direction: column;
						gap: 0.25rem;

						&-data {
							color: white;
							font-size: 1.2rem;
						}

						&-label {
							color: var(--secondary-color);
							font-size: 1rem;
						}
					}
				}
			}
		}
	}
</style>