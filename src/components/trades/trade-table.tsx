"use client";

import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { transactions } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";
import type { TradeStatus } from "@/types/trade";

const statuses: Array<TradeStatus | "All"> = [
  "All",
  "Pending",
  "Verified",
  "Financed",
  "Completed",
  "Disputed"
];

export function TradeTable() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<TradeStatus | "All">("All");
  const [sort, setSort] = useState<"amount" | "updatedAt">("updatedAt");

  const rows = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const matchesStatus = status === "All" || transaction.status === status;
        const matchesQuery = `${transaction.counterparty} ${transaction.route} ${transaction.id}`
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesStatus && matchesQuery;
      })
      .sort((a, b) =>
        sort === "amount"
          ? b.amount - a.amount
          : b.updatedAt.localeCompare(a.updatedAt)
      );
  }, [query, sort, status]);

  function exportCsv() {
    const csv = [
      "id,counterparty,route,amount,currency,status,riskLevel,financingDecision,updatedAt",
      ...rows.map((row) =>
        [
          row.id,
          row.counterparty,
          row.route,
          row.amount,
          row.currency,
          row.status,
          row.riskLevel,
          row.financingDecision,
          row.updatedAt
        ].join(",")
      )
    ].join("\n");

    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "tradeforge-transactions.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-9"
            placeholder="Search counterparty, route, or ID"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as TradeStatus | "All")}
            className="h-10 rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm text-white outline-none"
          >
            {statuses.map((item) => (
              <option key={item} value={item} className="bg-slate-950">
                {item}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as "amount" | "updatedAt")}
            className="h-10 rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm text-white outline-none"
          >
            <option value="updatedAt" className="bg-slate-950">
              Sort by latest
            </option>
            <option value="amount" className="bg-slate-950">
              Sort by amount
            </option>
          </select>
          <Button variant="secondary" onClick={exportCsv}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-white/10">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/[0.04]">
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <th className="px-4 py-3">Trade</th>
                <th className="px-4 py-3">Route</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Risk</th>
                <th className="px-4 py-3">Financing</th>
                <th className="px-4 py-3">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {rows.map((row) => (
                <tr key={row.id} className="text-sm">
                  <td className="px-4 py-4">
                    <p className="font-medium text-white">{row.counterparty}</p>
                    <p className="text-xs text-muted-foreground">{row.id}</p>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{row.route}</td>
                  <td className="px-4 py-4 text-white">
                    {formatCurrency(row.amount, row.currency)}
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      variant={
                        row.status === "Disputed"
                          ? "danger"
                          : row.status === "Pending"
                            ? "warning"
                            : "default"
                      }
                    >
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{row.riskLevel}</td>
                  <td className="px-4 py-4 text-muted-foreground">{row.financingDecision}</td>
                  <td className="px-4 py-4 text-muted-foreground">{row.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
