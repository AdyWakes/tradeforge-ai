import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TrustGauge } from "@/components/dashboard/trust-gauge";
import { PageHeader } from "@/components/dashboard/page-header";
import { PlatformShell } from "@/components/layout/platform-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { companies } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function TrustScorePage() {
  return (
    <PlatformShell>
      <PageHeader
        eyebrow="Trust Score Engine"
        title="Proprietary-looking scoring for SME commerce trust"
        description="The demo score blends transaction history, invoice consistency, business age, payment behavior, and fraud indicators into a 0-100 trust score."
      />
      <Card>
        <CardContent className="p-5">
          <TrustGauge score={82} />
        </CardContent>
      </Card>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {companies.map((company) => (
          <Card key={company.id}>
            <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
              <div>
                <CardTitle>{company.name}</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">
                  {company.location} - {company.industry}
                </p>
              </div>
              <Badge variant={company.riskLevel === "Low" ? "default" : "warning"}>
                {company.riskLevel} risk
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Trust Score</p>
                  <p className="text-3xl font-semibold text-white">{company.trustScore}/100</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(company.monthlyVolume)}/mo
                </p>
              </div>
              <div className="space-y-3">
                <Progress value={company.paymentReliability} />
                <Progress value={company.invoiceConsistency} tone="info" />
              </div>
              <Button asChild variant="ghost" className="mt-5 px-0">
                <Link href={`/companies/${company.id}`}>
                  View company profile
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PlatformShell>
  );
}
