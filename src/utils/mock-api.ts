import type { Subscription } from '../types/subscription';
import { mockSubscriptions } from '../data/mock-data';

export const fetchSubscriptions = async (): Promise<Subscription[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSubscriptions);
    }, 1000);
  });
};