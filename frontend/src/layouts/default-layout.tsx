import { JSXNode, component$ } from "@builder.io/qwik";
import Sidebar from "~/components/shared/sidebar";

interface Props {
  children: JSXNode;
}

// TODO: add background-image
export default component$<Props>((props) => {
  return (
    <>
      <main
        class="relative grid h-screen w-screen grid-cols-[25vw_1fr]"
        style={{
          "background-image": "url(/wallpaper.svg)"
        }}
      >
        {/* dark overlay for background-image */}
        <div class="absolute inset-0 -z-[9999] bg-black/95" />

        <Sidebar />
        {props.children}
      </main>
    </>
  )
})
