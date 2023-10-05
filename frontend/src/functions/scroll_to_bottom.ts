export function scrollToBottom(el: HTMLElement, smooth: boolean) {
	el.scrollTo({
		top: el.scrollHeight,
		behavior: smooth ? "smooth" : "instant"
	});
};