import { useParams } from "solid-start";
import { useShared } from "~/context/shared";
import { FormatDate } from "~/functions/format-date";
import Close from "~/icons/close";

export const ChatSidebar = () => {
	const { toggleShowSidebar, activeChatUser } = useShared();
	const params = useParams<{ username: string }>();

	const formatted_date_joined = new FormatDate(activeChatUser()?.date_joined ?? "").format_to_d_m_y

	return (
		<>
			<div class="h-full whitespace-nowrap border-l border-black/50 bg-stone-900 md:w-80">
				<div class="flex items-center justify-between md:p-3">
					<h3 class="flex items-center font-medium text-stone-200 md:gap-3 md:text-sm">
						Profile
						<span class="font-normal text-stone-400">{params.username}</span>
					</h3>
					<button onClick={toggleShowSidebar}>
						<Close class="text-white/50 transition-colors hover:text-white/75 md:size-6" />
					</button>
				</div>
				<img
					src={activeChatUser()?.avatar ?? ""}
					class="object-cover md:size-auto"
				/>
				<div class="flex flex-col leading-none md:gap-1 md:p-3">
					<h3 class="font-medium text-stone-100 md:text-base">
						{activeChatUser()?.first_name + " " + activeChatUser()?.last_name}
					</h3>
					<h5 class="text-stone-400 md:text-xs">Joined Date: {formatted_date_joined}</h5>
				</div>
			</div>
		</>
	);
};
