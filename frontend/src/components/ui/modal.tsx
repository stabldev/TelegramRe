import { destructure } from "@solid-primitives/destructure";
import { JSX, Setter } from "solid-js";
import { Portal } from "solid-js/web";
import { cn } from "~/functions/cn";
import { Motion } from "solid-motionone";

interface Props {
  children: JSX.Element;
  setOpen: Setter<boolean>;
  class?: string;
}

const Modal = (props: Props) => {
  const { children, setOpen } = destructure(props);

  const modalRef: HTMLElement | undefined = undefined;

  const handleOverlayClick = (e: UIEvent) => {
    if (modalRef!.contains(e.target as Node)) return;
    else {
      setOpen()(false);
    }
  };

  return (
    <>
      <Portal>
        <Motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.15, easing: "ease-out" }}
          onClick={handleOverlayClick}
          class={cn(
            props.class,
            "absolute inset-0 grid place-items-center bg-base-100/25"
          )}
        >
          <Motion.div
            animate={{ scale: [0.95, 1] }}
            transition={{ duration: 0.15, easing: "ease-out" }}
            ref={modalRef}
          >
            {children()}
          </Motion.div>
        </Motion.div>
      </Portal>
    </>
  );
};

export default Modal;
