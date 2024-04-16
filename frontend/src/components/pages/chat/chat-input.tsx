import { Show, createEffect, createSignal } from "solid-js";
import TextareaAutosize from "solid-textarea-autosize";
import Emoji from "~/icons/emoji";
import Mic from "~/icons/mic";
import Send from "~/icons/send";
import Clip from "~/icons/clip";
import { ChatFileModal } from "~/components/shared/modals/chat-file-modal";
import { useChat } from "~/context/chat";
import ApiEndpoints from "~/connections/api/api-endpoints";
import { useAuth } from "~/context/auth";
import { useShared } from "~/context/shared";
import Close from "~/icons/close";
import Photo from "~/icons/photo";
import Gif from "~/icons/gif";

export const ChatInput = () => {
	const { socket, activeRoom } = useChat();
	const { csrfToken, user } = useAuth();
	const { editMessage, isEditingMessage, setEditMessage } = useShared();

	const [message, setMessage] = createSignal("");
	const [showFileModel, setShowFileModel] = createSignal(false);
	const [file, setFile] = createSignal<File>();

	let inputRef: HTMLTextAreaElement;

	const handleSubmit = (e?: SubmitEvent) => {
		e?.preventDefault();
		// if no value then dont add empty message
		if (!message()) return;
		// else dispatch custom event
		const detail = {
			content: {
				file: null,
				message: message()
			},
			type: "text"
		};

		if (isEditingMessage()) {
			socket()!.send(
				JSON.stringify({
					action: "edit_message",
					message_id: editMessage()?.id,
					new_message: message(),
					room_id: activeRoom()?.room_id
				})
			);
		} else {
			socket()!.send(
				JSON.stringify({
					action: "message",
					type: detail.type,
					content: detail.content,
					room_id: activeRoom()?.room_id
				})
			);
		}

		setMessage(""); // clear input
		setEditMessage(undefined);
		inputRef.focus();
	};

	const handleFileSubmit = async (
		e: CustomEvent<{
			type: string;
			content: {
				file: File;
				message: string;
			};
		}>
	) => {
		try {
			const { type, content } = e.detail;

			const formData = new FormData();
			formData.append("type", type);
			formData.append("room", String(activeRoom()?.id));
			formData.append("sender", String(user()?.id));
			formData.append("content", content.message);
			formData.append("file", content.file);

			const res = await fetch(
				ApiEndpoints.chat.CHAT_ROOMS + activeRoom()?.room_id + "/",
				{
					method: "POST",
					headers: {
						"X-CSRFToken": csrfToken()
					},
					credentials: "include",
					body: formData
				}
			);

			if (!res.ok) {
				throw new Error(res.statusText);
			}
		} finally {
			setShowFileModel(false);
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	const handleFileChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (target.files) setFile(target.files[0]);
		setShowFileModel(true);
	};

	createEffect(() => {
		inputRef.focus();
		isEditingMessage() && inputRef.focus();
	});

	return (
		<>
			<Show when={showFileModel()}>
				<ChatFileModal
					file={file()!}
					onModalClose={() => setShowFileModel(false)}
					onFileSubmit={handleFileSubmit}
				/>
			</Show>
			<div class="mx-auto mb-5 mt-2 flex items-end md:w-[40rem] md:gap-2">
				<form
					onSubmit={handleSubmit}
					class="flex w-full flex-col rounded-2xl bg-base-200 p-4"
					classList={{
						"pt-1 md:gap-2": isEditingMessage()
					}}
				>
					<Show when={isEditingMessage()}>
						<div class="flex w-full items-center gap-3">
							<div class="relative flex flex-1 gap-2 overflow-y-hidden rounded-md bg-base-100 px-2 py-0.5 leading-none">
								<div class="absolute inset-y-0 left-0 bg-primary md:w-1" />
								<div class="pl-1">
									<span class="select-none text-xs text-info">
										Editing
									</span>
									<span class="line-clamp-1 text-sm text-secondary">
										{editMessage()?.content}
									</span>
								</div>
							</div>
							<button
								onClick={() => setEditMessage(undefined)}
								class="btn btn-link p-0.5"
							>
								<Close class="md:size-7" />
							</button>
						</div>
					</Show>
					<div class="flex w-full items-end gap-3">
						<input
							type="file"
							id="image-file-input"
							accept=".png,.jpg,.jpeg"
							class="hidden"
							onChange={handleFileChange}
						/>
						<input
							type="file"
							id="gif-file-input"
							accept=".gif"
							class="hidden"
							onChange={handleFileChange}
						/>
						<button class="text-neutral-100 hover:text-primary transition-colors">
							<Emoji class="md:size-6" />
						</button>
						<TextareaAutosize
							ref={(ref) => (inputRef = ref)}
							value={
								isEditingMessage()
									? editMessage()?.content
									: message()
							}
							onInput={(e) => setMessage(e.currentTarget.value)}
							onKeyDown={handleKeyDown}
							class="flex-1 resize-none self-center border-none bg-base-200 caret-accent text-accent outline-none [scrollbar-width:none]"
							placeholder="Message"
							maxRows={5}
						/>
						<button
							type="button"
							class="text-neutral-100 hover:text-primary transition-colors"
						>
							<Clip class="md:size-6" />
						</button>
					</div>
				</form>
				<button
					type="submit"
					class="size-14 aspect-square bg-base-200 grid place-items-center rounded-full text-neutral-100"
				>
					<Show
						when={message() || editMessage()}
						fallback={<Mic class="md:size-6" />}
					>
						<Send class="md:size-5 text-primary" />
					</Show>
				</button>
			</div>
		</>
	);
};
