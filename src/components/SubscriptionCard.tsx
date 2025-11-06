import styled from 'styled-components';
import type { Subscription } from '../types/subscription';

interface SubscriptionCardProps {
  subscription: Subscription;
  onCancel: (id: string) => void;
}

const CardContainer = styled.div<{ $isCancelled?: boolean }>`
  background: ${props => props.$isCancelled 
    ? '#f8fafc' 
    : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)'};
  border-style: solid;
  border-color: ${props => (props.$isCancelled ? '#e2e8f0' : '#7C898B')};
  border-width: 24px 6px 6px 6px;
  border-radius: 12px;
  padding: 0;
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  opacity: ${props => (props.$isCancelled ? 0.65 : 1)};
  transition: all 0.3s ease;

  &:hover {
    transform: ${props => (props.$isCancelled ? 'none' : 'translateY(-4px)')};
    box-shadow: ${props =>
      props.$isCancelled
        ? '0 2px 8px rgba(15, 23, 42, 0.08)'
        : '0 8px 24px rgba(15, 23, 42, 0.12)'};
    border-color: ${props => (props.$isCancelled ? '#cbd5e1' : '#a7bfb2ff')};
  }
`;

const CardContent = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #1a1a2e;
`;

const OfferTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  margin-top: 0;
  line-height: 1.3;
  font-family: inherit;
  color: #1a1a2e;
  border-bottom:  2px solid #7C898B;
  padding-bottom: 1.5rem;

`;

const PriceContainer = styled.div`
  margin-bottom: 2.5rem;
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  letter-spacing: -0.02em;
`;

const Currency = styled.span`
  font-size: 2.3rem;
  font-weight: 500;
  color: #1a1a2e;
`;

const Period = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: #636e72;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const CancelButton = styled.button<{ $disabled: boolean }>`
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  background: ${props => 
    props.$disabled 
      ? '#f1f5f9'
      : '#1a1a2e'
  };
  color: ${props => (props.$disabled ? '#94a3b8' : '#ffffff')};
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => 
      props.$disabled 
        ? '#f1f5f9'
        : '#2d2d44'
    };
    transform: ${props => (props.$disabled ? 'none' : 'translateY(-1px)')};
  }

  &:active {
    transform: ${props => (props.$disabled ? 'none' : 'translateY(0)')};
  }
`;

const Guarantee = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const NextPayment = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

const StatusBadge = styled.span<{ $status: string }>`
  position: absolute;
  top: -15px; 
  left: 50%;
  transform: translateX(-50%); /* only center horizontally */
  display: inline-block;
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${props => (props.$status === 'cancelled' ? '#64748b' : '#014e35ff')};
  background: ${props =>
    props.$status === 'cancelled' ? '#f1f5f9' : '#7aeea6ff'};
  border: 1px solid ${props => (props.$status === 'cancelled' ? '#e2e8f0' : '#014e35ff')};
  z-index: 10; 
`;

const CancelledMessage = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.875rem;
  margin-bottom: 1.25rem;
  color: #64748b;
  font-size: 0.875rem;
  text-align: center;
  font-weight: 500;
`;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getCurrencySymbol = (currency: string): string => {
  const symbols: { [key: string]: string } = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'PLN': 'zł',
  };
  return symbols[currency] || currency;
};

const SubscriptionCard = ({ subscription, onCancel }: SubscriptionCardProps) => {
  const { id, offerTitle, status, price, currency, nextPaymentDate, period } = subscription;
  const isCancelled = status === 'cancelled';

const handleCancel = () => {
  if (!isCancelled) {
    onCancel(id);

    const alert = document.createElement('div');
    alert.textContent = 'Subscription cancelled successfully!';
    alert.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: #059668ff;
      color: #ffffff;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 10px 40px rgba(5, 150, 105, 0.3);
      font-size: 0.9375rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      z-index: 1000;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
      opacity: 0;
      animation: fadeInOut 4s forwards;
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-5px); }
        10% { opacity: 1; transform: translateY(0); }    
        80% { opacity: 1; transform: translateY(0); }   
        100% { opacity: 0; transform: translateY(-10px); } 
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(alert);

    setTimeout(() => {
      alert.remove();
      style.remove();
    }, 4000);
  }
};


  return (
    <CardContainer $isCancelled={isCancelled}>
      <CardContent>
        <StatusBadge $status={status}>{status}</StatusBadge>
        {isCancelled && (
          <CancelledMessage>This subscription has been cancelled</CancelledMessage>
        )}

        <OfferTitle>{offerTitle}</OfferTitle>

        <PriceContainer>
        <Price>
             {price.toFixed(2)}<Currency>{getCurrencySymbol(currency)}</Currency>
            <Period>/{period === 'annual' ? 'yr' : 'mo'}</Period>
          </Price>
        </PriceContainer>
        
        <ButtonGroup>
          <CancelButton
            $disabled={isCancelled}
            onClick={handleCancel}
            disabled={isCancelled}
          >
            {isCancelled ? 'Cancelled' : 'Cancel Subscription'}
          </CancelButton>

        {!isCancelled && <Guarantee>30-day money back guarantee</Guarantee>}
        </ButtonGroup>

        <NextPayment>
          {isCancelled ? 'Subscription ended' : `Renews on ${formatDate(nextPaymentDate)}`}
        </NextPayment>

      </CardContent>
    </CardContainer>
  );
};

export default SubscriptionCard;
