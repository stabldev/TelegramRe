import { component$ } from "@builder.io/qwik";
import DefaultLayout from "~/layouts/default-layout";

export default component$(() => {
  return (
    <DefaultLayout>
      <span>Chat screen</span>
    </DefaultLayout>
  )
})
