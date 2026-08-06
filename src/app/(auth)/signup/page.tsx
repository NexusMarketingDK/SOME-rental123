import { SignupForm } from "@/components/auth/signup-form";
import { getLocale } from "@/lib/locale-server";

export default async function SignupPage() {
  // The visitor's chosen site language (locale cookie, set by the language
  // switcher / middleware) so the signup page opens in the same language they
  // were just reading — instead of always defaulting to Danish.
  const locale = await getLocale();
  return <SignupForm initialLocale={locale} />;
}
