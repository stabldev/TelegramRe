type ProfileItem = {
	image: string;
	name: string;
	username: string;
	timestamp: string;
	message: string;
	new_message: boolean;
};

export default function ProfileItem(props: ProfileItem) {
	return (
		<a href={`/@${props.username}`} class="flex items-center gap-[1vw] px-[1vw] py-[0.75vw] bg-stone-700">
			<img class="w-[3.5vw] rounded-full" src={props.image} alt={props.name} />
			<div class="flex flex-col">
				<div class="flex items-center justify-between">
					<span class="text-[1.1vw] font-medium text-white">{props.name}</span>
					<span class="uppercase text-white/75 text-[0.8vw]">{props.timestamp}</span>
				</div>
				<div>
					<span class="line-clamp-1 text-white/75 text-[1vw]">{props.message}</span>
				</div>
			</div>
		</a>
	);
};