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
					room_id: activeRoom()?.room_id,
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
		};

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
			formData.append("room", activeRoom()?.id.toString()!);
			formData.append("sender", user()?.id.toString()!);
			formData.append("content", content.message);
			formData.append("file", content.file);

			const res = await fetch(ApiEndpoints.chat.CHAT_ROOMS + activeRoom()?.room_id + "/", {
				method: "POST",
				headers: {
					"X-CSRFToken": csrfToken()
				},
				credentials: "include",
				body: formData
			});

			if (!res.ok) {
				throw new Error(res.statusText);
			}
		} catch (err) {
			throw err;
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
			<div class="flex items-end md:w-[42rem] md:min-w-[42rem] mb-2 mt-1 mx-auto md:gap-2">
				<form
					onSubmit={handleSubmit}
					class="flex flex-col p-2 rounded-xl w-full bg-base-300"
					classList={{
						"pt-1 md:gap-2": isEditingMessage(),
					}}
				>
					<Show when={isEditingMessage()}>
						<div class="flex items-center w-full gap-3">
							<div class="flex gap-2 overflow-y-hidden relative bg-base-100 px-2 py-0.5 leading-none flex-1 rounded-md">
								<div class="absolute inset-y-0 left-0 md:w-1 bg-primary" />
								<div class="pl-1">
									<span class="text-xs text-info select-none">Editing</span>
									<span class="text-sm text-secondary line-clamp-1">{editMessage()?.content}</span>
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
						<div class="dropdown dropdown-top">
							<div tabindex="0" role="button">
								<button class="btn btn-sm btn-neutral btn-circle">
									<Clip class="md:size-6" />
								</button>
							</div>
							<ul tabindex="0" class="dropdown-content z-10 p-1 shadow bg-base-300 w-44 rounded-xl md:mb-4">
								<label
									for="image-file-input"
									class="grid cursor-pointer grid-cols-12 gap-2 px-3 py-1.5 rounded-lg text-start text-accent hover:bg-base-100"
								>
									<Photo class="col-span-2 size-full" />
									<span class="col-span-10 text-sm font-medium">Send Photo</span>
								</label>
								<label
									for="gif-file-input"
									class="grid cursor-pointer grid-cols-12 gap-2 px-3 py-1.5 rounded-lg text-start text-accent hover:bg-base-100"
								>
									<Gif class="col-span-2 size-full" />
									<span class="col-span-10 text-sm font-medium">Send GIF</span>
								</label>
							</ul>
						</div>
						<TextareaAutosize
							ref={(ref) => (inputRef = ref)}
							value={isEditingMessage() ? editMessage()?.content : message()}
							onInput={(e) => setMessage(e.currentTarget.value)}
							onKeyDown={handleKeyDown}
							class="flex-1 self-center resize-none border-none bg-transparent text-sm text-white outline-none [scrollbar-width:none]"
							placeholder="Write a message..."
							maxRows={5}
						/>
						<button
							type="button"
							class="btn btn-sm btn-ghost btn-circle text-neutral-content/75"
						>
							<Emoji class="md:size-5" />
						</button>
					</div>
				</form>
				<button
					type="submit"
					class="btn btn-circle btn-primary text-accent"
				>
					<Show
						when={message() || editMessage()}
						fallback={<Mic class="md:size-6" />}
					>
						<Send class="md:size-5" />
					</Show>
				</button>
			</div>
		</>
	);
};
