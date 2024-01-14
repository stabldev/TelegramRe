import Pencil from "~/icons/pencil";

const PasswordForm = () => {
    return (
        <>
            <div class="flex flex-col md:gap-[0.5vw] items-center">
				<h2 class="font-semibold text-stone-50 md:text-[1.75vw] flex items-center md:gap-[0.75vw]">
                    Complete Verification!
                </h2>
				<span class="flex max-w-[17vw] self-center text-stone-400 md:text-[1.05vw]">
                    Please enter your Password as a final verification
                </span>
			</div>
            <form
				class="flex w-full flex-col md:gap-[1vw]"
			>
				<input
					name="password"
					placeholder="Password"
                    maxLength={5}
					class="w-full border-stone-700 bg-transparent text-stone-50 md:rounded-[0.65vw] md:border-[0.1vw] md:p-[0.75vw] md:text-[1.1vw]"
				/>
				<button class="bg-blue-600 font-medium uppercase leading-none text-white md:rounded-[0.65vw] md:p-[1vw] md:text-[1.1vw]">Verify</button>
			</form>
        </>
    )
};

export default PasswordForm;