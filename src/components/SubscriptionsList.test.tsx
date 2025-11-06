import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SubscriptionsList from '../components/SubscriptionsList';
import { fetchSubscriptions } from '../utils/mock-api';
import { mockSubscriptions } from '../data/mock-data';

vi.mock('../utils/mock-api.ts');

const mockFetchSubscriptions = fetchSubscriptions as ReturnType<typeof vi.fn>;

describe('SubscriptionsList', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should display a loading message initially', () => {
    mockFetchSubscriptions.mockResolvedValueOnce(mockSubscriptions);
    render(<SubscriptionsList />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should display subscriptions after a successful fetch', async () => {
    mockFetchSubscriptions.mockResolvedValueOnce(mockSubscriptions);
    render(<SubscriptionsList />);
    await waitFor(() => {
      expect(screen.getByText('Premium Monthly')).toBeInTheDocument();
    });
    expect(screen.getByText('Sports Pass - Annual')).toBeInTheDocument();
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });

  it('should display an error message if the fetch fails', async () => {
    mockFetchSubscriptions.mockRejectedValueOnce(new Error('Failed to fetch'));
    render(<SubscriptionsList />);
    await waitFor(() => {
      expect(screen.getByText(/Failed to load subscriptions. Please try again./i)).toBeInTheDocument();
    });
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });

  it('should handle cancellation of a subscription', async () => {
    const initialSubscriptions = JSON.parse(JSON.stringify(mockSubscriptions));
    mockFetchSubscriptions.mockResolvedValueOnce(initialSubscriptions);
    render(<SubscriptionsList />);
    
    await waitFor(() => {
        expect(screen.getByText('Premium Monthly')).toBeInTheDocument();
    });

    const cancelButton = screen.getAllByRole('button', { name: /Cancel Subscription/i })[0];
    await userEvent.click(cancelButton);

    await waitFor(() => {
        const cancelledButton = screen.getAllByRole('button', { name: /Cancelled/i })[0];
        expect(cancelledButton).toBeInTheDocument();
        expect(cancelledButton).toBeDisabled();
    });
  });
});