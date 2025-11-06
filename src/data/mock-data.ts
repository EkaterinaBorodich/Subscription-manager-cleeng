import type { Subscription } from "../types/subscription";


export const mockSubscriptions: Subscription[] = [
  {
    id: 'S12345',
    offerTitle: 'Premium Monthly',
    status: 'active',
    price: 12.99,
    currency: 'USD',
    nextPaymentDate: '2025-11-15T10:00:00Z',
    period: 'monthly',
  },
  {
    id: 'S67890',
    offerTitle: 'Sports Pass - Annual',
    status: 'active',
    price: 99.99,
    currency: 'USD',
    nextPaymentDate: '2026-08-01T10:00:00Z',
    period: 'annual',
  },
  {
    id: 'S11223',
    offerTitle: 'Music Streaming Pro',
    status: 'active',
    price: 9.99,
    currency: 'USD',
    nextPaymentDate: '2025-12-01T10:00:00Z',
    period: 'monthly',
  },
];