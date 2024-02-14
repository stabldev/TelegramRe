export const scrollToBottom = (el: HTMLDivElement, options: { behavior: ScrollBehavior }) => {
	el.scrollTo({
		top: el.scrollHeight,
		behavior: options.behavior
	});
};