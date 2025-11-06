import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SubscriptionCard from '../components/SubscriptionCard';
import type { Subscription } from '../types/subscription';

const mockSubscription: Subscription = {
  id: 'S12345',
  offerTitle: 'Premium Monthly',
  status: 'active',
  price: 12.99,
  currency: 'USD',
  nextPaymentDate: '2025-11-15T10:00:00Z',
  period: 'monthly',
};

const mockCancelledSubscription: Subscription = {
    ...mockSubscription,
    id: 'S54321',
    status: 'cancelled',
};

describe('SubscriptionCard', () => {
  it('should render subscription details correctly', () => {
    const onCancel = vi.fn();
    render(<SubscriptionCard subscription={mockSubscription} onCancel={onCancel} />);

    expect(screen.getByText('Premium Monthly')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByText(/12.99/)).toBeInTheDocument();
    expect(screen.getByText(/Renews on Nov 15, 2025/)).toBeInTheDocument();
  });

  it('should call onCancel with the correct id when the cancel button is clicked', async () => {
    const onCancel = vi.fn();
    render(<SubscriptionCard subscription={mockSubscription} onCancel={onCancel} />);

    const cancelButton = screen.getByRole('button', { name: /Cancel Subscription/i });
    await userEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalledWith('S12345');
  });

  it('should display the button as disabled and with "Cancelled" text if the subscription is cancelled', () => {
    const onCancel = vi.fn();
    render(<SubscriptionCard subscription={mockCancelledSubscription} onCancel={onCancel} />);

    const cancelledButton = screen.getByRole('button', { name: /Cancelled/i });
    expect(cancelledButton).toBeInTheDocument();
    expect(cancelledButton).toBeDisabled();
  });
});