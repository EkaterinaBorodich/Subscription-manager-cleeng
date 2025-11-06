export interface Subscription {
  id: string;
  offerTitle: string;
  status: 'active' | 'cancelled';
  price: number;
  currency: string;
  nextPaymentDate: string;
  period: 'monthly' | 'annual';
}