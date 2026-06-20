"use client";

import { useState } from "react";
import { CheckCircle2, TriangleAlert, WalletCards } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EscrowTimeline } from "@/components/dashboard/escrow-timeline";
import { escrows } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";
import type { EscrowContract, EscrowStatus } from "@/types/trade";

export function EscrowSimulator() {
  const [contract, setContract] = useState<EscrowContract>(escrows[0]);

  function updateStatus(status: EscrowStatus) {
    setContract((current) => ({
      ...current,
      status,
      timeline:
        status === "Released"
          ? current.timeline.map((item) => ({ ...item, state: "complete" }))
          : status === "Under Review"
            ? current.timeline.map((item, index) =>
                index === 2 ? { ...item, state: "blocked", label: "Dispute under review" } : item
              )
            : escrows[0].timeline
    }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <CardHeader>
          <CardTitle>Smart Escrow Simulation</CardTitle>
          <CardDescription>
            Model deposit, delivery confirmation, release, and dispute states.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <WalletCards className="mb-4 h-8 w-8 text-primary" />
            <p className="text-sm text-muted-foreground">Escrow balance</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {formatCurrency(contract.amount, contract.currency)}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Buyer deposits funds. Funds release after delivery confirmation or
              move to review when a dispute is raised.
            </p>
          </div>
          <div className="grid gap-2">
            <Button onClick={() => updateStatus("Pending")} variant="secondary">
              <WalletCards className="h-4 w-4" />
              Buyer deposited funds
            </Button>
            <Button onClick={() => updateStatus("Released")}>
              <CheckCircle2 className="h-4 w-4" />
              Confirm delivery and release
            </Button>
            <Button onClick={() => updateStatus("Under Review")} variant="outline">
              <TriangleAlert className="h-4 w-4" />
              Open dispute review
            </Button>
          </div>
        </CardContent>
      </Card>
      <EscrowTimeline contract={contract} />
    </div>
  );
}
