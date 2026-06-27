import { AuthForm } from "@/components/auth/auth-form";
import { signInAction } from "@/services/auth";

export default function LoginPage() {
  return (
    <AuthForm
      action={signInAction}
      submitLabel="Log in"
      pendingLabel="Logging in…"
      title="Welcome back"
      description="Log in to manage your properties and posts."
      footer={{
        text: "Don't have an account?",
        linkLabel: "Sign up",
        href: "/signup",
      }}
    />
  );
}
