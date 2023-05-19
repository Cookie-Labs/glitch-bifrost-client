import React from 'react';
import styled from 'styled-components';
import useWeb3 from '@hooks/useWeb3';
import useOracle from '@hooks/useOracle';
import useChainRunner from '@hooks/useChainRunner';

const TestButton = styled.button`
  border: 1px solid white;
  padding: 1rem;
  font-size: 1.2rem;
`;

const ShoeboxOverviewPage = () => {
  const { web3, signMessage, isSigned } = useWeb3();
  const { BFC, BIFI, ETH, BNB, MATIC } = useOracle();
  const {implementBridge} = useChainRunner();

  console.log(web3);

  return (
    <>
      <TestButton onClick={() => signMessage('HELLO')}>TEST SIGN</TestButton>
      <TestButton onClick={() => implementBridge()}>TEST bridge mumbai to bifrost</TestButton>
      <div>{isSigned}</div>
      <div>BFC: {BFC}USDT</div>
      <div>BIFI: {BIFI}USDT</div>
      <div>ETH: {ETH}USDT</div>
      <div>BNB: {BNB}USDT</div>
      <div>MATIC: {MATIC}USDT</div>
    </>
  );
};

export default ShoeboxOverviewPage;
