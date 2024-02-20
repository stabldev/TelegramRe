import { Show, createEffect, createSignal } from "solid-js";
import TextareaAutosize from "solid-textarea-autosize";
import Emoji from "~/icons/emoji";
import Mic from "~/icons/mic";
import Send from "~/icons/send";
import Clip from "~/icons/clip";
import { ChatFileModal } from "~/components/shared/chat/chat-file-modal";
import { useChat } from "~/context/chat";
import ApiEndpoints from "~/connections/api/api-endpoints";
import { useAuth } from "~/context/auth";
import { ChatFileTypeSelect } from "~/components/shared/chat/chat-file-type-select";
import { useShared } from "~/context/shared";
import Pencil from "~/icons/pencil";
import Close from "~/icons/close";

export const ChatInput = () => {
	const { socket, activeRoom } = useChat();
	const { csrfToken, user } = useAuth();
	const { editMessage, isEditingMessage, setEditMessage } = useShared();

	const [message, setMessage] = createSignal("");
	const [showFileModel, setShowFileModel] = createSignal(false);
	const [showFileTypeSelect, setShowFileTypeSelect] = createSignal(false);
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

	const handleToggleShowFileTypeSelect = () => {
		setShowFileTypeSelect((prev) => !prev);
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
			<div class="flex items-end md:w-[42rem] md:min-w-[42rem] my-2 mx-auto md:gap-2">
				<form
					onSubmit={handleSubmit}
					class="flex flex-col p-3 rounded-xl w-full bg-stone-900"
					classList={{
						"pt-1.5 md:gap-2": isEditingMessage(),
					}}
				>
					<Show when={isEditingMessage()}>
						<div class="flex items-center w-full gap-3">
							<Pencil class="md:size-6 text-blue-500" />
							<div class="flex gap-2 overflow-y-hidden relative bg-stone-800 px-2 py-0.5 leading-none flex-1 rounded-md">
								<div class="absolute inset-y-0 left-0 md:w-1 bg-blue-500" />
								<div class="pl-1">
									<span class="text-xs text-blue-300 select-none">Editing</span>
									<span class="text-sm text-white/60 line-clamp-1">{editMessage()?.content}</span>
								</div>
							</div>
							<button
								onClick={() => setEditMessage(undefined)}
								class="cursor-pointer text-2xl text-blue-500 transition-colors hover:text-blue-300"
							>
								<Close class="md:size-7" />
							</button>
						</div>
					</Show>
					<div class="flex w-full items-end gap-3">
						<div class="relative flex">
							<Show when={showFileTypeSelect()}>
								<ChatFileTypeSelect onClose={handleToggleShowFileTypeSelect} />
							</Show>
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
							<button
								onClick={handleToggleShowFileTypeSelect}
								class="cursor-pointer text-2xl text-white/50 transition-colors hover:text-white/75"
							>
								<Clip />
							</button>
						</div>
						<TextareaAutosize
							ref={(ref) => (inputRef = ref)}
							value={isEditingMessage() ? editMessage()?.content : message()}
							onInput={(e) => setMessage(e.currentTarget.value)}
							onKeyDown={handleKeyDown}
							class="flex-1 resize-none border-none bg-transparent text-sm text-white outline-none [scrollbar-width:none]"
							placeholder="Write a message..."
							maxRows={5}
						/>
						<button
							type="button"
							class="text-xl text-white/50 transition-colors hover:text-white/75"
						>
							<Emoji />
						</button>
					</div>
				</form>
				<button
					type="submit"
					class="text-white rounded-full aspect-square h-12 bg-blue-500 grid place-items-center"
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
