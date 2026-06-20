"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, Building2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseBrowserClient, hasSupabaseConfig } from "@/lib/supabase";
import type { UserRole } from "@/types/trade";

type AuthFormProps = {
  mode: "login" | "signup";
};

const roles: UserRole[] = [
  "SME Owner",
  "Buyer",
  "Supplier",
  "Financing Partner"
];

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("founder@tradeforge.ai");
  const [password, setPassword] = useState("tradeforge-demo");
  const [role, setRole] = useState<UserRole>("SME Owner");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const next = searchParams.get("next") ?? "/dashboard";

  function enterDemo() {
    localStorage.setItem("tradeforge-role", role);
    window.location.assign(`/api/demo/start?next=${encodeURIComponent(next)}`);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNotice("");

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      enterDemo();
      return;
    }

    const authResult =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { role }
            }
          });

    if (authResult.error) {
      setNotice(`${authResult.error.message}. You can still enter demo mode.`);
      setLoading(false);
      return;
    }

    document.cookie = "tf_session=demo; path=/; max-age=86400";
    localStorage.setItem("tradeforge-role", role);
    router.push(next);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <Link href="/" className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4 text-primary" />
          TradeForge AI
        </Link>
        <CardTitle className="text-2xl">
          {mode === "login" ? "Welcome back" : "Create your workspace"}
        </CardTitle>
        <CardDescription>
          {mode === "login"
            ? "Sign in with Supabase auth or launch the demo workspace."
            : "Create a Supabase-backed account for your trade finance network."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value as UserRole)}
              className="h-11 w-full rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm text-white outline-none focus:ring-2 focus:ring-ring"
            >
              {roles.map((item) => (
                <option key={item} value={item} className="bg-slate-950">
                  {item}
                </option>
              ))}
            </select>
          </div>
          {notice ? <p className="text-sm leading-5 text-amber-200">{notice}</p> : null}
          <Button className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {mode === "login" ? "Sign in" : "Create account"}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={enterDemo}
          >
            Launch demo workspace
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          {mode === "login" ? "No account yet?" : "Already have an account?"}{" "}
          <Link
            href={mode === "login" ? "/signup" : "/login"}
            className="font-medium text-primary"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </Link>
        </p>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Supabase config: {hasSupabaseConfig ? "connected" : "demo fallback"}
        </p>
      </CardContent>
    </Card>
  );
}
