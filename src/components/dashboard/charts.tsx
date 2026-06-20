"use client";

import { useSyncExternalStore } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartPoint } from "@/types/trade";

const tooltipStyle = {
  background: "rgba(3, 7, 18, 0.94)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  color: "#fff"
};

function useMounted() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );
}

function ChartSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-sm text-muted-foreground">
      Loading chart...
    </div>
  );
}

export function TradeVolumeChart({ data }: { data: ChartPoint[] }) {
  const mounted = useMounted();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Trade Volume</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 min-w-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="volume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#94a3b8" />
                <YAxis tickLine={false} axisLine={false} stroke="#94a3b8" />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#34d399"
                  fillOpacity={1}
                  fill="url(#volume)"
                  strokeWidth={2}
                  name="Volume ($M)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ChartSkeleton />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function TrustGrowthChart({ data }: { data: ChartPoint[] }) {
  const mounted = useMounted();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trust Score Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 min-w-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#94a3b8" />
                <YAxis tickLine={false} axisLine={false} stroke="#94a3b8" domain={[60, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="trust"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#22d3ee" }}
                  name="Trust score"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ChartSkeleton />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function FinancingApprovalsChart({ data }: { data: ChartPoint[] }) {
  const mounted = useMounted();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financing Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 min-w-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#94a3b8" />
                <YAxis tickLine={false} axisLine={false} stroke="#94a3b8" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="approvals" radius={[6, 6, 0, 0]} fill="#a7f3d0" name="Approvals" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ChartSkeleton />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function RevenueFraudChart({ data }: { data: ChartPoint[] }) {
  const mounted = useMounted();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue and Fraud Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 min-w-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#94a3b8" />
                <YAxis tickLine={false} axisLine={false} stroke="#94a3b8" />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#34d399"
                  strokeWidth={3}
                  name="Revenue ($K)"
                />
                <Line
                  type="monotone"
                  dataKey="fraud"
                  stroke="#fb7185"
                  strokeWidth={3}
                  name="Fraud alerts"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ChartSkeleton />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
