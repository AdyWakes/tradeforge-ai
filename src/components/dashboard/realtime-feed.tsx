"use client";

import { useEffect, useState } from "react";
import { Radio } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activities } from "@/lib/demo-data";

export function RealtimeFeed() {
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCursor((current) => (current + 1) % activities.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, []);

  const ordered = [...activities.slice(cursor), ...activities.slice(0, cursor)];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-primary" />
          Live Transaction Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {ordered.slice(0, 4).map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="rounded-md border border-white/10 bg-white/[0.04] p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-white">{item.action}</p>
              <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
            </div>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
