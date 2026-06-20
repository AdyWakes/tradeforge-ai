import { Suspense } from "react";

import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#061019] px-4 py-10">
      <div className="absolute inset-0 -z-10 bg-fintech-grid fintech-grid opacity-45" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_20%,rgba(46,229,157,0.16),transparent_28%),radial-gradient(circle_at_75%_18%,rgba(34,211,238,0.14),transparent_28%)]" />
      <Suspense fallback={<div className="text-sm text-muted-foreground">Loading auth...</div>}>
        <AuthForm mode="login" />
      </Suspense>
    </main>
  );
}
