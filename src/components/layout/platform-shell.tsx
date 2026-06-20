"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  BadgeCheck,
  BarChart3,
  Blocks,
  Bot,
  Building2,
  FileSearch,
  Gauge,
  LayoutDashboard,
  LogOut,
  ShieldAlert,
  Users
} from "lucide-react";

import { AssistantWidget } from "@/components/assistant/assistant-widget";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/invoices", label: "Invoice AI", icon: FileSearch },
  { href: "/trust-score", label: "Trust Score", icon: Gauge },
  { href: "/fraud", label: "Fraud", icon: ShieldAlert },
  { href: "/blockchain", label: "Blockchain", icon: Blocks },
  { href: "/escrow", label: "Escrow", icon: BadgeCheck },
  { href: "/trades", label: "Trades", icon: Activity },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin", label: "Admin", icon: Users }
];

type PlatformShellProps = {
  children: React.ReactNode;
};

export function PlatformShell({ children }: PlatformShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    document.cookie = "tf_session=; path=/; max-age=0";
    localStorage.removeItem("tradeforge-role");
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(46,229,157,0.15),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.12),transparent_28%),linear-gradient(180deg,#061019_0%,#05070b_100%)]" />
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-white/10 bg-black/35 backdrop-blur-xl lg:block">
        <div className="flex h-full flex-col">
          <Link href="/dashboard" className="flex items-center gap-3 px-6 py-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-glow">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold">TradeForge AI</p>
              <p className="text-xs text-muted-foreground">Commerce trust layer</p>
            </div>
          </Link>
          <nav className="flex-1 space-y-1 px-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/10 hover:text-white",
                    active && "bg-white/10 text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4">
            <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-100">
                <Bot className="h-4 w-4" />
                Demo mode
              </div>
              <p className="mt-2 text-xs leading-5 text-emerald-100/70">
                Supabase-ready auth with simulated AI, escrow, and Polygon testnet flows.
              </p>
            </div>
            <Button
              variant="ghost"
              className="mt-3 w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-background/75 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Building2 className="h-5 w-5 text-primary" />
            TradeForge AI
          </Link>
          <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Sign out">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs text-muted-foreground",
                  active && "bg-white/10 text-white"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="lg:pl-72">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <AssistantWidget />
    </div>
  );
}
