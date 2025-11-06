import { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { Subscription } from '../types/subscription';
import { fetchSubscriptions } from '../utils/mock-api';
import SubscriptionCard from './SubscriptionCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.25rem;
  color: #777; 

  &::after {
    content: '';
    width: 36px;
    height: 36px;
    margin-left: 1rem;
    border: 3px solid #ccc; 
    border-top-color: #999; 
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: rgba(255, 51, 102, 0.1);
  border: 1px solid #ff3366;
  border-radius: 12px;
  color: #ff3366;
  text-align: center;
  box-shadow: 0 4px 12px rgba(255, 51, 102, 0.2);
`;

const SubscriptionsList = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        setLoading(true);
        const data = await fetchSubscriptions();
        setSubscriptions(data);
        setError(null);
      } catch (err) {
        setError('Failed to load subscriptions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadSubscriptions();
  }, []);

  const handleCancelSubscription = (id: string) => {
    setSubscriptions(prevSubscriptions =>
      prevSubscriptions.map(subscription =>
        subscription.id === id
          ? { ...subscription, status: 'cancelled' as const }
          : subscription
      )
    );
  };

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <Grid>
      {subscriptions.map((subscription) => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          onCancel={handleCancelSubscription}
        />
      ))}
    </Grid>
  );
};

export default SubscriptionsList;
