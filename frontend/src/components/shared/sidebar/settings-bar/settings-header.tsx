import { destructure } from "@solid-primitives/destructure";
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
    const { toggleView } = destructure(props);

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
        <div class="flex h-14 items-center justify-between gap-3 px-3 text-accent">
            <div class="flex items-center gap-3">
                <button
                    onClick={toggleView()}
                    class="size-10 text-2xl text-neutral-100 rounded-full hover:bg-base-300 grid place-items-center"
                >
                    <Arrow variant="left" />
                </button>
                <h3 class="select-none text-lg font-medium">Settings</h3>
            </div>
            <div class="flex items-center gap-1">
                <button class="size-10 text-xl text-neutral-100 rounded-full hover:bg-base-300 grid place-items-center">
                    <Pencil />
                </button>
                <div class="dropdown dropdown-end dropdown-bottom">
                    <div
                        tabindex="0"
                        role="button"
                    >
                        <button class="size-10 text-xl text-neutral-100 rounded-full hover:bg-base-300 grid place-items-center">
                            <Menu variant="dots" />
                        </button>
                    </div>
                    <ul
                        tabindex="0"
                        hidden
                        class="dropdown-content z-10 w-40 rounded-xl bg-base-300 p-1 shadow md:mt-3"
                    >
                        <button
                            onClick={handleLogout}
                            class="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-start text-accent hover:bg-base-100"
                        >
                            <Logout class="size-4" />
                            <span class="text-sm font-medium">Logout</span>
                        </button>
                        <span class="flex px-3 py-1 text-xs text-secondary">
                            TG-RE version 1.0
                        </span>
                    </ul>
                </div>
            </div>
        </div>
    );
};
