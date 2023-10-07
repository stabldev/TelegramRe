export const scrollToBottom = (
  el: HTMLElement,
  options: { behavior: "smooth" | "instant" }
) => {
  el.scrollTo({
    top: el.scrollHeight,
    behavior: options.behavior
  });
};
