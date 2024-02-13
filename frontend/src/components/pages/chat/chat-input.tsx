import { Show, createSignal } from "solid-js";
import TextareaAutosize from "solid-textarea-autosize";
import Emoji from "~/icons/emoji";
import Mic from "~/icons/mic";
import Send from "~/icons/send";
import Clip from "~/icons/clip";
import { ChatFileModal } from "~/components/shared/chat/chat-file-modal";
import { useChat } from "~/context/chat";
import ApiEndpoints from "~/connections/api/api-endpoints";
import { useAuth } from "~/context/auth";
import Photo from "~/icons/photo";
import Gif from "~/icons/gif";


export const ChatInput = () => {
	const { socket, activeRoom } = useChat();
	const { csrfToken, user } = useAuth();

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
				message: message(),
			},
			type: "text",
		};

		socket()!.send(
			JSON.stringify({
				action: "message",
				type: detail.type,
				content: detail.content,
				room_id: activeRoom()?.room_id
			})
		);

		setMessage(""); // clear input
		inputRef.focus();
	};

	const handleFileSubmit = async (e: CustomEvent<{
		type: string;
		content: {
			file: File;
			message: string;
		}
	}>) => {
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
					"X-CSRFToken": csrfToken(),
				},
				credentials: "include",
				body: formData,
			});

			if (!res.ok) {
				throw new Error(res.statusText);
			};
		} catch (err) {
			throw err;
		} finally {
			setShowFileModel(false);
		};
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

	return (
		<>
			<Show when={showFileModel()}>
				<ChatFileModal
					file={file()!}
					onModalClose={() => setShowFileModel(false)}
					onFileSubmit={handleFileSubmit}
				/>
			</Show>
			<form
				onSubmit={handleSubmit}
				class="absolute bottom-0 flex w-full items-end gap-3 bg-stone-900 p-3"
			>
				<div class="flex relative">
					<Show when={showFileTypeSelect()}>
						<div class="absolute bottom-11 z-50 w-max select-none overflow-hidden rounded-xl bg-stone-900">
							<label
								for="image-file-input"
								class="cursor-pointer grid grid-cols-12 gap-2 px-3 py-2 text-start text-stone-300 transition-colors hover:bg-stone-800 hover:text-stone-100"
							>
								<Photo class="col-span-2 size-full" />
								<span class="col-span-10 text-sm font-medium">Send Photo</span>
							</label>
							<label
								for="gif-file-input"
								class="cursor-pointer grid grid-cols-12 gap-2 px-3 py-2 text-start text-stone-300 transition-colors hover:bg-stone-800 hover:text-stone-100"
							>
								<Gif class="col-span-2 size-full" />
								<span class="col-span-10 text-sm font-medium">Send GIF</span>
							</label>
						</div>
					</Show>
					<input type="file" id="image-file-input" accept=".png,.jpg,.jpeg" class="hidden" onChange={handleFileChange} />
					<input type="file" id="gif-file-input" accept=".gif" class="hidden" onChange={handleFileChange} />
					<button
						onClick={handleToggleShowFileTypeSelect}
						class="cursor-pointer text-2xl text-white/50 transition-colors hover:text-white/75"
					>
						<Clip />
					</button>
				</div>
				<TextareaAutosize
					ref={(ref) => (inputRef = ref)}
					value={message()}
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
				<button
					type="submit"
					class="text-xl text-white/50 transition-colors hover:text-white/75"
				>
					<Show
						when={message()}
						fallback={<Mic />}
					>
						<Send />
					</Show>
				</button>
			</form>
		</>
	);
};
