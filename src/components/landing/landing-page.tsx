"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Blocks,
  Bot,
  Building2,
  FileSearch,
  Globe2,
  ShieldCheck,
  Sparkles,
  WalletCards
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { dashboardStats } from "@/lib/demo-data";
import { formatCompact, formatCurrency } from "@/lib/utils";

const features = [
  {
    title: "AI invoice intelligence",
    description:
      "Extract invoice numbers, entities, amounts, payment terms, and verification reports from PDFs and image uploads.",
    icon: FileSearch
  },
  {
    title: "SME trust scoring",
    description:
      "Score counterparties with transaction history, payment behavior, invoice consistency, and fraud signals.",
    icon: ShieldCheck
  },
  {
    title: "Polygon verification",
    description:
      "Anchor verified invoice metadata to a Polygon testnet-style receipt for tamper-resistant lender review.",
    icon: Blocks
  },
  {
    title: "Smart escrow simulation",
    description:
      "Model buyer deposits, delivery confirmation, dispute review, and automatic release workflows.",
    icon: WalletCards
  },
  {
    title: "Trade analytics",
    description:
      "Track financing approvals, geographic activity, trade volume, revenue trends, and fraud statistics.",
    icon: BarChart3
  },
  {
    title: "Commerce assistant",
    description:
      "Ask a contextual assistant about invoice risk, lender readiness, escrow state, and verification trails.",
    icon: Bot
  }
];

const testimonials = [
  {
    quote:
      "TradeForge turns messy invoice review into a board-ready risk and financing workflow.",
    name: "Anika Rao",
    role: "SME exporter"
  },
  {
    quote:
      "The trust score and verification trail make counterparties easier to underwrite.",
    name: "Marcus Tan",
    role: "Trade finance partner"
  },
  {
    quote:
      "It feels like the missing operating system between buyers, suppliers, and capital.",
    name: "Leila Haddad",
    role: "Global commerce operator"
  }
];

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <section className="relative min-h-[92vh] border-b border-white/10 bg-[#061019]">
        <div className="absolute inset-0 bg-fintech-grid fintech-grid opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(46,229,157,0.22),transparent_28%),radial-gradient(circle_at_78%_12%,rgba(34,211,238,0.18),transparent_28%),linear-gradient(180deg,rgba(6,16,25,0.12),#05070b_96%)]" />
        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-glow">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="text-base font-semibold">TradeForge AI</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-white">
              Platform
            </a>
            <a href="#proof" className="hover:text-white">
              Proof
            </a>
            <a href="#testimonials" className="hover:text-white">
              Customers
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">
                Sign up
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-[1fr_0.92fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <Badge variant="info" className="mb-5">
              AI + Blockchain + Trade Finance
            </Badge>
            <h1 className="balanced max-w-5xl text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
              Trust Infrastructure for Global Commerce
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              AI-powered trade finance, invoice verification, and blockchain-backed
              trust scoring for modern businesses.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/api/demo/start?next=/dashboard">
                  Launch demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/signup">Create workspace</Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              <Stat label="Trade volume" value={formatCompact(dashboardStats.totalTradeVolume)} />
              <Stat label="Trust score" value={`${dashboardStats.trustScore}/100`} />
              <Stat label="Verified" value={dashboardStats.verifiedTransactions.toString()} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.08] p-3 shadow-panel backdrop-blur-xl">
              <div className="rounded-xl border border-white/10 bg-[#07111a] p-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Dashboard preview</p>
                    <p className="text-lg font-semibold text-white">Trade risk command center</p>
                  </div>
                  <Badge>Live</Badge>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <PreviewCard label="Trust Score" value="82/100" icon={ShieldCheck} />
                  <PreviewCard label="Fraud Alerts" value="7" icon={Sparkles} />
                  <PreviewCard label="Active Invoices" value="47" icon={FileSearch} />
                  <PreviewCard label="Escrow Value" value="$1.4M" icon={WalletCards} />
                </div>
                <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-white">AI verification pipeline</p>
                    <span className="text-xs text-emerald-200">96% confidence</span>
                  </div>
                  {[78, 92, 63, 84].map((width, index) => (
                    <div key={width} className="mb-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.12 }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
                  <div className="rounded-md bg-white/[0.04] p-3">
                    <Globe2 className="mx-auto mb-2 h-4 w-4 text-primary" />
                    12 markets
                  </div>
                  <div className="rounded-md bg-white/[0.04] p-3">
                    <Blocks className="mx-auto mb-2 h-4 w-4 text-primary" />
                    Polygon
                  </div>
                  <div className="rounded-md bg-white/[0.04] p-3">
                    <BadgeCheck className="mx-auto mb-2 h-4 w-4 text-primary" />
                    Escrow
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <Badge variant="secondary">Platform</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white md:text-4xl">
            Purpose-built infrastructure for SME trade finance.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <CardContent className="p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="proof" className="border-y border-white/10 bg-white/[0.03] py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          <ProofMetric label="Total trade volume" value={formatCurrency(12840000)} />
          <ProofMetric label="Verified transactions" value="318" />
          <ProofMetric label="Financing approvals" value="73%" />
          <ProofMetric label="Fraud reduction" value="41%" />
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardContent className="p-6">
                <p className="text-base leading-7 text-slate-200">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-6">
                  <p className="font-medium text-white">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 rounded-xl border border-white/10 bg-gradient-to-r from-emerald-400/12 to-cyan-400/12 p-8 text-center">
          <h2 className="text-3xl font-semibold tracking-normal text-white">
            Launch a credible trade finance demo in minutes.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            No banking integrations, real lenders, or payment rails required.
            The product simulates the full AI and blockchain trust workflow.
          </p>
          <Button asChild className="mt-6" size="lg">
            <Link href="/api/demo/start?next=/dashboard">
              Enter demo workspace
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
      <p className="text-xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function PreviewCard({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: string;
  icon: typeof ShieldCheck;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <Icon className="mb-4 h-4 w-4 text-primary" />
      <p className="text-xl font-semibold text-white">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function ProofMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-background/50 p-5">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
