import { useAuth } from "~/context/auth";
import { SettingsHeader } from "./settings-header";
import { useChat } from "~/context/chat";
import Photo from "~/icons/photo";
import At from "~/icons/at";
import Info from "~/icons/info";

type Props = {
    toggleView: () => void;
};

export const SettingsBar = (props: Props) => {
    const { user } = useAuth();
    const { onlineUsers } = useChat();

    return (
        <>
            <SettingsHeader toggleView={props.toggleView} />
            <div class="text-stone-100">
                <div class="w-ful h-56 relative">
                    <img
                        src={user()?.avatar ?? ""}
                        alt={user()?.username}
                        class="object-cover size-full"
                    />
                    <button class="absolute -bottom-7 right-3 rounded-full bg-blue-500 p-4">
                        <Photo class="text-xl text-white" />
                    </button>
                </div>
                <div class="flex flex-col text-white p-3">
                    <span class="font-medium md:text-lg">
                    {user()?.first_name + " " + user()?.last_name}
                    </span>
                    <span class="text-stone-400 text-sm">
                        {onlineUsers()?.some((onlineUser) => onlineUser.user === user()?.id) ? "Online" : "Offline"}
                    </span>
                    
                    <div class="grid grid-cols-8 mt-3">
                        <At class="col-span-1 size-6 self-center text-stone-400" />
                        <div class="flex flex-col col-span-7">
                            <span>{user()?.username}</span>
                            <span class="text-stone-400 text-sm select-none">Username</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-8 mt-3">
                        <Info class="col-span-1 size-[1.4rem] self-center text-stone-400" />
                        <div class="flex flex-col col-span-7">
                            <span>{user()?.bio}</span>
                            <span class="text-stone-400 text-sm select-none">Bio</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};