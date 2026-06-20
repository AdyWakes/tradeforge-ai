import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  FileSearch,
  Gauge,
  ShieldAlert,
  WalletCards
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const walkthroughSteps = [
  {
    title: "Upload invoice",
    detail: "Generate extracted fields, summary, risk indicators, and a verification report.",
    href: "/invoices",
    icon: FileSearch
  },
  {
    title: "Explain trust score",
    detail: "Show how transaction history, payment behavior, and fraud signals create the 82/100 score.",
    href: "/trust-score",
    icon: Gauge
  },
  {
    title: "Review fraud alert",
    detail: "Use AI explanations to show why DIL-2026-7710 needs manual review.",
    href: "/fraud",
    icon: ShieldAlert
  },
  {
    title: "Anchor proof",
    detail: "Open the Polygon-style explorer and show immutable invoice verification metadata.",
    href: "/blockchain",
    icon: Blocks
  },
  {
    title: "Release escrow",
    detail: "Simulate buyer deposit, delivery confirmation, dispute review, and funds release.",
    href: "/escrow",
    icon: WalletCards
  }
];

export function DemoWalkthrough() {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-white/10 bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-transparent">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge variant="info" className="mb-3">
              Hackathon Demo Mode
            </Badge>
            <CardTitle className="text-xl">Five-minute judge walkthrough</CardTitle>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              This workspace uses realistic simulated trade data so judges can evaluate
              the full AI, trust, blockchain, escrow, and analytics workflow without
              live banking integrations.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/invoices">
              Start with Invoice AI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
      </div>
      <CardContent className="grid gap-3 p-5 md:grid-cols-2 xl:grid-cols-5">
        {walkthroughSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Link
              key={step.title}
              href={step.href}
              className="group rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-primary/30 hover:bg-white/[0.07]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs text-muted-foreground">0{index + 1}</span>
              </div>
              <h3 className="text-sm font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {step.detail}
              </p>
            </Link>
          );
        })}
      </CardContent>
      <div className="border-t border-white/10 px-5 py-4">
        <div className="flex flex-col gap-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span className="inline-flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-primary" />
            Simulated systems: lenders, bank rails, escrow execution, and Polygon
            transactions.
          </span>
          <span>Ready integrations: Supabase auth, AI extraction API, Polygon testnet.</span>
        </div>
      </div>
    </Card>
  );
}
