import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Header = styled.header`
  margin-bottom: 5rem;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: -0.5rem;
  letter-spacing: -0.5px;
  animation: ${fadeIn} 1.2s ease-out 0.9s both;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.8rem;
  color: #a7bfb2ff;
  font-weight: 600;
  margin: 0;
  animation: ${fadeIn} 1s ease-out 0.9s both;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const App = () => {
  return (
    <Container>
      <Header>
        <Title>My streaming service subscriptions</Title>
        <Subtitle>Manage your active streaming subscriptions</Subtitle>
      </Header>
    </Container>
  );
};

export default App;
