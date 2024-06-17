import { HttpStatusCode } from "@solidjs/start";

const NotFound = () => {
  return (
    <div class="bg-stone-100 text-stone-900 flex h-screen w-screen flex-col items-center justify-center leading-none">
      <HttpStatusCode code={404} />
      <code class="font-bold md:text-[5vw]">404</code>
      <span class="md:text-[1.2vw]">Page not found</span>
    </div>
  );
};

export default NotFound;
