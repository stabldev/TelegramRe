import { component$ } from "@builder.io/qwik";
import Chat from "~/components/pages/chat";
import DefaultLayout from "~/layouts/default-layout";

export default component$(() => {
  return (
    <DefaultLayout>
      <Chat />
    </DefaultLayout>
  )
})
