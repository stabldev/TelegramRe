import { Show, createSignal } from "solid-js";
import toast from "solid-toast";
import { useAuth } from "~/context/auth";
import Arrow from "~/icons/arrow";
import Logout from "~/icons/logout";
import Menu from "~/icons/menu";
import Pencil from "~/icons/pencil";

type Props = {
	toggleView: () => void;
};

export const SettingsHeader = (props: Props) => {
	const { logoutUser } = useAuth();
	const [openMenu, setOpenMenu] = createSignal(true);

	const toggleMenu = () => setOpenMenu((prev) => !prev);

	const handleLogout = async () => {
		try {
			await toast.promise(logoutUser(), {
				loading: "Logging out user...",
				success: () => <span>Logout success!</span>,
				error: <span>Something wrong!</span>
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div class="flex h-12 items-center justify-between gap-3 px-3 text-stone-50">
			<div class="flex items-center gap-3">
				<button
					onClick={props.toggleView}
					class="text-xl text-white/50 transition-colors hover:text-white/75"
				>
					<Arrow variant="left" />
				</button>
				<h3 class="text-lg font-medium select-none">Settings</h3>
			</div>
			<div class="flex items-center gap-2">
				<button class="text-lg text-white/50 transition-colors hover:text-white/75">
					<Pencil />
				</button>
				<div class="relative flex">
					<button
						onClick={toggleMenu}
						class="text-lg text-white/50 transition-colors hover:text-white/75"
					>
						<Menu variant="dots" />
					</button>
					<Show when={openMenu()}>
						<div class="absolute top-10 right-0 z-50 bg-stone-800 overflow-hidden rounded-xl w-max select-none">
							<button
								onClick={handleLogout}
								class="grid grid-cols-12 gap-2 px-3 py-2 text-stone-300 hover:bg-stone-700 hover:text-stone-100 transition-colors text-start"
							>
								<Logout class="col-span-2 size-full" />
								<span class="col-span-10 text-sm font-medium">Logout</span>
							</button>
							<span class="px-3 text-xs flex py-1 text-stone-400">TG-RE version 1.0</span>
						</div>
					</Show>
				</div>
			</div>
		</div>
	);
};
