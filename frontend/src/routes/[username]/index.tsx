import { component$ } from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import Chat from "~/components/pages/chat";
import DefaultLayout from "~/layouts/default-layout";

export default component$(() => {
  return (
    <DefaultLayout>
      <Chat />
    </DefaultLayout>
  )
})

export const head: DocumentHead = ({ params }) => {
  return {
    title: params.username,
    meta: [
      {
        name: "description",
        content: "Chatting with @hello"
      }
    ]
  }
}
