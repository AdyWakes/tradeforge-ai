"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestedQuestions = [
  "What is TradeForge AI for?",
  "Which invoice is riskiest?",
  "Which invoices are finance-ready?",
  "Explain Polygon verification"
];

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "I can inspect the demo workspace, explain invoice risk, compare financing candidates, summarize escrow status, and describe Polygon verification."
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollIntoView({ block: "end" });
  }, [loading, messages, open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendMessage(input);
  }

  async function sendMessage(message: string) {
    const trimmed = message.trim();
    if (!trimmed) return;

    setInput("");
    setLoading(true);
    setMessages((current) => [...current, { role: "user", content: trimmed }]);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed })
      });

      if (!response.ok) {
        throw new Error("Assistant request failed");
      }

      const payload = (await response.json()) as { reply: string };

      setMessages((current) => [
        ...current,
        { role: "assistant", content: payload.reply }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I could not reach the assistant service. Try again, or review the dashboard, invoice, fraud, blockchain, and escrow pages directly."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-[calc(100vw-2.5rem)] max-w-sm rounded-lg border border-white/10 bg-[#071019]/95 shadow-panel backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary/15 p-2 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI Commerce Assistant</p>
                <p className="text-xs text-muted-foreground">Trade intelligence copilot</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === "user"
                    ? "ml-10 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                    : "mr-10 rounded-md bg-white/10 px-3 py-2 text-sm leading-5 text-slate-100"
                }
              >
                {message.content}
              </div>
            ))}
            {loading ? (
              <div className="mr-10 rounded-md bg-white/10 px-3 py-2 text-sm text-muted-foreground">
                Analyzing trade context...
              </div>
            ) : null}
            {messages.length === 1 ? (
              <div className="grid gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-xs text-slate-200 transition hover:border-primary/50 hover:bg-primary/10"
                  >
                    {question}
                  </button>
                ))}
              </div>
            ) : null}
            <div ref={scrollRef} />
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-white/10 p-4">
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={loading}
              placeholder="Ask about risk, financing, or an invoice..."
            />
            <Button size="icon" aria-label="Send message" disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      ) : (
        <Button size="lg" onClick={() => setOpen(true)} className="shadow-glow">
          <Bot className="h-4 w-4" />
          Assistant
        </Button>
      )}
    </div>
  );
}
