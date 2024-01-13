import Pencil from "~/icons/pencil";

const OtpForm = () => {
    const handleFormSubmit = (e: SubmitEvent) => {
        console.log(e)
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        const re = new RegExp(/^[0-9\b]+$/);
        if (!re.test(e.key) && e.key !== "Backspace") e.preventDefault();
    };

    return (
        <>
            <img
				src="/favicon.ico"
				class="md:size-[10vw]"
			/>
			<div class="flex flex-col md:gap-[0.5vw]">
				<h2 class="font-semibold text-stone-50 md:text-[1.75vw] flex items-center md:gap-[0.75vw]">
                    <span>admin@admin.com</span>
                    <button class="text-stone-400 hover:text-stone-300 transition-colors">
                        <Pencil />
                    </button>
                </h2>
				<span class="flex max-w-[17vw] self-center text-stone-400 md:text-[1.05vw]">
                    We have send you a message in Email with the Code
                </span>
			</div>
            <form
				onSubmit={handleFormSubmit}
				class="flex w-full flex-col md:gap-[1vw]"
			>
				<input
                    onKeyDown={handleKeyDown}
					name="code"
					placeholder="Code"
					class="w-full border-stone-700 bg-transparent text-stone-50 md:rounded-[0.65vw] md:border-[0.1vw] md:p-[0.75vw] md:text-[1.1vw]"
				/>
				<button class="bg-blue-600 font-medium uppercase leading-none text-white md:rounded-[0.65vw] md:p-[1vw] md:text-[1.1vw]">Submit</button>
			</form>
        </>
    )
}

export default OtpForm;