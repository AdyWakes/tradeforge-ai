import { BellRing, UserCog } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { PlatformShell } from "@/components/layout/platform-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminUsers, fraudSignals, transactions } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function AdminPage() {
  return (
    <PlatformShell>
      <PageHeader
        eyebrow="Admin Panel"
        title="Manage users, transactions, fraud alerts, and verification requests"
        description="Administrative controls for monitoring the trust network and reviewing elevated trade finance risk."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5 text-primary" />
              Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {adminUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col gap-3 rounded-md border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.company} - {user.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        user.status === "Active"
                          ? "default"
                          : user.status === "Review"
                            ? "warning"
                            : "danger"
                      }
                    >
                      {user.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {user.trustScore}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellRing className="h-5 w-5 text-amber-200" />
              Fraud Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {fraudSignals.map((signal) => (
              <div key={signal.id} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{signal.title}</p>
                  <Badge variant={signal.severity === "High" ? "danger" : "warning"}>
                    {signal.severity}
                  </Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {signal.explanation}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Transaction Monitor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="rounded-md border border-white/10 bg-white/[0.04] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{transaction.id.toUpperCase()}</p>
                  <Badge
                    variant={
                      transaction.status === "Disputed"
                        ? "danger"
                        : transaction.status === "Pending"
                          ? "warning"
                          : "default"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{transaction.counterparty}</p>
                <p className="mt-3 text-xl font-semibold text-white">
                  {formatCurrency(transaction.amount, transaction.currency)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PlatformShell>
  );
}
