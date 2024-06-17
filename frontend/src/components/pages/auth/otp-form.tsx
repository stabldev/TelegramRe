import { Show, createSignal } from "solid-js";
import Spinner from "~/components/ui/spinner";
import TextInput from "~/components/ui/text-input";
import { useAuth } from "~/context/auth";

const OtpForm = () => {
  const { loading, verifyOTP, authState } = useAuth();
  const [error, setError] = createSignal("");

  const handleFormSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const otp = formData.get("otp") as string;
    const email = authState()!.email!;

    try {
      await verifyOTP(email, otp);
      setError("");
    } catch (err) {
      const errorMsg = (err as { message: string }).message;
      setError(errorMsg);
    }
  };

  return (
    <>
      <div class="flex flex-col md:gap-3">
        <h2 class="font-medium text-accent md:text-3xl">Email verification</h2>
        <span class="flex self-center text-neutral-100 md:text-base">
          Please enter the OTP which we've send to <br /> your email address to
          complete.
        </span>
      </div>
      <form
        onSubmit={handleFormSubmit}
        class="flex w-full flex-col md:gap-3"
      >
        <TextInput
          inputProps={{
            autofocus: true,
            required: true,
            minLength: 5,
            maxLength: 5,
            type: "text",
            name: "otp",
            placeholder: "OTP"
          }}
          errorMsg={error()}
        />
        <button
          disabled={loading()}
          class="group flex h-12 w-full items-center justify-center rounded-xl bg-primary uppercase text-accent disabled:cursor-progress md:gap-2"
        >
          verify
          <Show when={loading()}>
            <Spinner />
          </Show>
        </button>
      </form>
    </>
  );
};

export default OtpForm;
