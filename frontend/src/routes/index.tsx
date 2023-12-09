import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import DefaultLayout from "~/layouts/default-layout";

export default component$(() => {
  return (
    <>
      <DefaultLayout />
    </>
  );
});

export const head: DocumentHead = {
  title: "Telegram Web",
  meta: [
    {
      name: "description",
      content: "A Telegram inspired web messaging experience",
    },
  ],
};
