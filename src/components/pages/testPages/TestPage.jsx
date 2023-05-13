import React from 'react';
import styled from 'styled-components';
// import * as colors from '@styles/colors';
import ConnectWallet from '@articles/ConnectWallet';

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 1rem;
`

const WalletWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 15rem;
`;

const TestPage = () => {
  return (
    <Container>
      <WalletWrapper>
        <ConnectWallet />
      </WalletWrapper>
    </Container>
  );
};

export default TestPage;
