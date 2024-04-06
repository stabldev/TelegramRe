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
		<div class="flex h-12 items-center justify-between gap-3 px-3 text-accent">
			<div class="flex items-center gap-3">
				<button
					onClick={props.toggleView}
					class="btn btn-sm btn-circle btn-ghost text-xl text-neutral-content/95"
				>
					<Arrow variant="left" />
				</button>
				<h3 class="select-none text-base font-medium">Settings</h3>
			</div>
			<div class="flex items-center gap-1">
				<button disabled class="btn btn-sm btn-circle btn-ghost text-neutral-content/75">
					<Pencil class="md:size-5" />
				</button>
				<div class="dropdown dropdown-bottom dropdown-end">
					<div tabindex="0" role="button">
						<button class="btn btn-sm btn-circle btn-ghost text-neutral-content/75">
							<Menu variant="dots" class="md:size-4" />
						</button>
					</div>
					<ul tabindex="0" class="dropdown-content z-10 p-1 md:mt-3 shadow bg-base-300 w-40 rounded-xl">
						<button
							onClick={handleLogout}
							class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-start text-accent hover:bg-base-100 w-full"
						>
							<Logout class="size-4" />
							<span class="text-sm font-medium">Logout</span>
						</button>
						<span class="flex px-3 py-1 text-xs text-secondary">TG-RE version 1.0</span>
					</ul>
				</div>
			</div>
		</div>
	);
};
