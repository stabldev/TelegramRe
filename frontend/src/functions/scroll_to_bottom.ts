export const scrollToBottom = (el: HTMLElement, options: { behavior: ScrollBehavior }) => {
	el.scrollTo({
		top: el.scrollHeight,
		behavior: options.behavior
	});
};
