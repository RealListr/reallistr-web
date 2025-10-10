export const PACKAGES = {
  starter: { label: "Starter (12 leads)", priceId: "price_xxx_starter", leads: { valuation: 12, finance: 0, insurance: 0 }, amountCents: 14900 },
  pro:     { label: "Pro (28 leads +5)",  priceId: "price_xxx_pro",     leads: { valuation: 28, finance: 0, insurance: 0 }, amountCents: 34900, bonus: 5 },
  elite:   { label: "Elite (40 leads +10)",priceId: "price_xxx_elite",   leads: { valuation: 40, finance: 0, insurance: 0 }, amountCents: 49900, bonus: 10 },
} as const;
