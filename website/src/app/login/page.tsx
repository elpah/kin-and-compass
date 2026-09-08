import { googleAuthConfigured } from "@/auth";
import { LoginForm } from "./LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="px-4 py-32 text-center text-sm text-muted">Loading...</p>}>
      <LoginForm googleReady={googleAuthConfigured} />
    </Suspense>
  );
}
