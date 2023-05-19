import React, { useState } from 'react';
import styled from 'styled-components';
import useWeb3 from '@hooks/useWeb3';
import useOracle from '@hooks/useOracle';
import useChainRunner from '@hooks/useChainRunner';

const TestButton = styled.button`
  border: 1px solid white;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: white;
    transition: 0.3s;
  }
`;

const ShoeboxOverviewPage = () => {
  const { web3, signMessage, isSigned } = useWeb3();
  const { BFC, BIFI, ETH, BNB, MATIC } = useOracle();
  const { client, approveBridge, implementBridge } = useChainRunner();
  const [bridgeAmount, setBridgeAmount] = useState(0);

  // console.log(web3);
  // console.log(client);

  async function doBridge() {
    try {
      await approveBridge(bridgeAmount);
      await implementBridge(bridgeAmount);
    } catch (err) {
      console.error(err);
    }
  }

  const handleBridgeAmount = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setBridgeAmount(Number(newValue));
    } else {
      e.target.value = bridgeAmount;
    }
  };

  return (
    <>
      <div>
        <TestButton onClick={() => signMessage('HELLO')}>TEST SIGN</TestButton>
      </div>
      <div>
        <input onChange={handleBridgeAmount} value={bridgeAmount} />
        <TestButton onClick={doBridge}>
          TEST bridge polygonMainnet to bifrostMainnet
        </TestButton>
      </div>
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
