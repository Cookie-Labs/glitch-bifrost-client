import React, { useState } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import useSwap from '@hooks/useSwap';
import useChainRunner from '@hooks/useChainRunner';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 30rem;
  height: 30rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${colors.bgQuaternary};
  border-radius: 1rem;
  background-color: ${colors.bgPrimary};
`;

const TopTitleWrapper = styled.div`
  width: 100%;
  height: 16%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${colors.bgQuaternary};
`;

const FromAmount = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px;
  font-weight: 400;
  font-size: 20px;
  color: rgb(255, 255, 255);
  background-color: transparent;
  border: none;
  outline: none;
`;

const TopTitle = styled.span`
  font-size: 1.7rem;
  font-weight: 900;
`;

const SelectNetwork = styled.button`
  text-align: left;
  width: 100%;
`;

const ResetButton = styled.button`
  cursor: pointer;
  color: ${colors.bgWhiteSecondary};

  &:hover {
    color: ${colors.textPrimary};
  }
`;

const SelectToken = styled.a``;

const TokenWrapper = styled.div``;

const InfoWrapper = styled.div``;

const ExchangeRate = styled.div``;

const CurrentBalance = styled.div``;

const SwapWrapper = styled.div`
  width: 100%;
  height: 42%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: ${({ isFrom }) =>
    isFrom ? colors.bgPrimary : colors.bgWhiteSecondary};
  border-radius: 0 0 1rem 1rem;
`;

const ShoeboxSwapPage = () => {
  const [network, setNetwork] = useState('Select Network');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBalance, setCurrentBalance] = useState('0');
  const [exchange, setExchange] = useState('0');
  const { allPairs } = useSwap();
  const { client, approveBridge, implementBridge } = useChainRunner();

  const [bridgeTokenAddress, setBridgeTokenAddress] = useState(
    '0x0000000000000000000000000000000000000000',
  ); // polygon WMATIC
  const [bridgeAmount, setBridgeAmount] = useState(0);
  const [bridgeFromNetwork, setBridgeFromNetwork] = useState(137); // polygon main network
  const [bridgeToNetwork, setBridgeToNetwork] = useState(3068); // bifrost main network

  async function doBridge() {
    try {
      // await approveBridge(bridgeTokenAddress, bridgeAmount, bridgeFromNetwork);
      console.log(bridgeTokenAddress);
      console.log(bridgeAmount);
      console.log(bridgeFromNetwork);
      console.log(bridgeToNetwork);
      await implementBridge(
        bridgeTokenAddress,
        bridgeAmount,
        bridgeFromNetwork,
        bridgeToNetwork,
      );
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
  
  console.log(allPairs);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <Wrapper>
        <TopTitleWrapper>
          <TopTitle>Shoe Box Cross Chain Swap</TopTitle>
          <ResetButton>Reset</ResetButton>
        </TopTitleWrapper>
        <SwapWrapper isFrom={false}>
          <SelectNetwork onClick={openModal}>{network}</SelectNetwork>
          <TokenWrapper>
            <FromAmount placeholder="From Amount"></FromAmount>
            <SelectToken>LDO</SelectToken>
          </TokenWrapper>
          <InfoWrapper>
            <ExchangeRate>$ {exchange}</ExchangeRate>
            <CurrentBalance>Balance : {currentBalance}</CurrentBalance>
          </InfoWrapper>
        </SwapWrapper>
        <SwapWrapper isFrom={true}>
          <SelectNetwork onClick={openModal}>{network}</SelectNetwork>
          <TokenWrapper>
            <FromAmount placeholder="To Amount"></FromAmount>
            <SelectToken>LDO</SelectToken>
          </TokenWrapper>
          <InfoWrapper>
            <ExchangeRate>$ {exchange}</ExchangeRate>
            <CurrentBalance>Balance : {currentBalance}</CurrentBalance>
          </InfoWrapper>
        </SwapWrapper>
      </Wrapper>
    </Container>
  );
};

export default ShoeboxSwapPage;
