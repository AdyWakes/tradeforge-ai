import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

export function shortHash(value: string) {
  if (value.length <= 16) return value;
  return `${value.slice(0, 8)}...${value.slice(-6)}`;
}

export function pseudoHash(input: string, length = 64) {
  let seed = 0x811c9dc5;
  for (let index = 0; index < input.length; index += 1) {
    seed ^= input.charCodeAt(index);
    seed = Math.imul(seed, 0x01000193);
  }

  let output = "";
  let value = seed >>> 0;
  while (output.length < length) {
    value ^= value << 13;
    value ^= value >>> 17;
    value ^= value << 5;
    output += (value >>> 0).toString(16).padStart(8, "0");
  }

  return `0x${output.slice(0, length)}`;
}
