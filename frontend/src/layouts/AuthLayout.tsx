import { Match, Switch, createSignal } from "solid-js";
import EmailForm from "~/components/pages/auth/EmailForm";
import OtpForm from "~/components/pages/auth/OtpForm";
import { VERSION } from "~/config";

const AuthLayout = () => {
  const [state, setState] = createSignal<"email" | "otp">("email");

  return (
    <main class="relative grid h-screen w-screen place-items-center bg-base-100 bg-[url(/wallpaper.svg)]">
      <div class="relative flex flex-col items-center border border-neutral-300 bg-base-200 text-center md:w-96 md:gap-5 md:rounded-2xl md:p-5">
        <img
          src="/favicon.svg"
          class="md:size-28"
        />
        <Switch>
          <Match when={state() === "email"}>
            <EmailForm onEmailSubmit={() => setState("otp")} />
          </Match>
          <Match when={state() === "otp"}>
            <OtpForm />
          </Match>
        </Switch>
        <span class="absolute -bottom-8 mx-auto text-sm text-neutral-100">
          Telegram Web RE {VERSION}
        </span>
      </div>
    </main>
  );
};

export default AuthLayout;
