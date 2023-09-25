<script lang="ts">
	import Clip from "$icons/clip.svelte";
	import Emoji from "$icons/emoji.svelte";
	import Menu from "$icons/menu.svelte";
	import Search from "$icons/search.svelte";
	import Send from "$icons/send.svelte";

	// mock chat data
	const chat_mapping: Array<{
		sender: string,
		message: string,
		time: string
	}> = [
		{
			sender: "tokito",
			message: "Hi wassup!",
			time: "2023-09-25T15:38:51.162Z"
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
			width: 60%;

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
						font-size: 1rem;
						color: white;
						caret-color: var(--primary-color);

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
</style>