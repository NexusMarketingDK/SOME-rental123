import { AuthForm } from "@/components/auth/auth-form";
import { signUpAction } from "@/services/auth";

export default function SignupPage() {
  return (
    <AuthForm
      action={signUpAction}
      submitLabel="Create account"
      pendingLabel="Creating account…"
      title="Create your account"
      description="Start scheduling posts for your vacation rentals."
      showPreferences
      footer={{
        text: "Already have an account?",
        linkLabel: "Log in",
        href: "/login",
      }}
    />
  );
}
