import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { BiChevronDown, BiDownArrowAlt } from 'react-icons/bi';
import shoeswapImage from '@assets/images/shoeswap_background.png';
import { Divider } from '@atoms/Divider';
import { toast } from 'react-toastify';
import useChainRunner from '@hooks/useChainRunner';
import useSwap from '@hooks/useSwap';
// import useFactory from '@hooks/useFactory';
// import usePair from '@hooks/usePair';

import QMIcon from '@assets/icons/QM_Icon.png';
import BifrostIcon from '@assets/icons/Bifrost_Icon.png';
import EthereumIcon from '@assets/icons/Ethereum_Icon.png';
import BSCIcon from '@assets/icons/BSC_Icon.png';
import PolygonIcon from '@assets/icons/Polygon_Icon.png';
import AvalancheIcon from '@assets/icons/Avalanche_Icon.png';
import GMTIcon from '@assets/icons/GMT_token.png';
import KWIIcon from '@assets/icons/KWI_token.png';
import LoadingSpinner from '@atoms/LoadingSpinner';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 4rem;
  background: url(${shoeswapImage}) no-repeat center;
  background-size: cover;
`;

const PageTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: ${colors.bgWhitePrimary};
`;

const PageSubTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.bgWhiteTertiary};
  margin-bottom: 0.5rem;
`;

const Wrapper = styled.div`
  width: 30rem;
  min-height: 40rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${colors.bgWhiteTertiary};
  background-color: ${colors.bgWhitePrimary};
  padding: 1rem 2rem;
  gap: 0.5rem;
`;

const TopTitleWrapper = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopTitle = styled.span`
  font-size: 1.4rem;
  font-weight: 900;
`;

const ResetButton = styled.button`
  cursor: pointer;
  color: ${colors.bgWhiteSecondary};

  &:hover {
    color: ${colors.textBlack};
  }
`;

const SwapWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: ${({ isFrom }) =>
    isFrom ? colors.bgWhiteTertiary : colors.bgWhiteSecondary};
`;

const SwapContent = styled.div`
  width: 100%;
  height: 3.3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 7rem;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 2rem;
`;

const DropdownButton = styled.button`
  background-color: ${colors.bgWhitePrimary};
  color: ${colors.textBlack};
  border: 1px solid ${colors.bgWhiteSecondary};
  padding: 0 0 0 1rem;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownButtonTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  min-width: 100%;
  background-color: ${colors.bgWhiteTertiary};
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 1rem 1.5rem;
  z-index: 1;
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  border-radius: 1rem;
  width: 100%;
  padding: 1rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    background-color: ${colors.bgWhitePrimary};
  }
`;

const DropdownIcon = styled.img`
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${colors.bgQuaternary};
`;

const DropdownName = styled.span``;

const TextInputBox = styled.input`
  width: 40%;
  height: auto;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem;
  color: ${colors.textBlack};
  background-color: ${colors.bgWhiteSecondary};
  outline: none;
  border-top: none;
  border-left: none;
  border-right: none;

  &:hover {
    border-bottom: 1px solid ${colors.primary80};
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid ${colors.primary80};
    box-shadow: 0 0 10px ${colors.primary40};
  }
`;

const TextBox = styled.div`
  width: 40%;
  height: auto;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem;
  color: ${colors.textBlack};
  background-color: ${colors.bgWhiteTertiary};
  border-bottom: 2px solid ${colors.bgBlack};
`;

const SlippageContent = styled.div`
  font-size: 1rem;
`;

const SlippageButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const SlippageButton = styled.button`
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? colors.primary80 : null)};
  background-color: ${({ isActive }) =>
    isActive ? colors.primary20 : colors.bgWhiteSecondary};
  padding: 0.5rem;
`;

const DoCrossChainWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 900;
`;

const DoCrossChainButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 5rem;
  margin-top: 1rem;
  cursor: pointer;
  color: ${colors.textPrimary};
  background-color: ${colors.primary80};
  border-radius: 1rem;
  font-size: 1.5rem;

  &:hover {
    background-color: ${colors.primary20};
  }

  &:disabled {
    cursor: default;
    color: ${colors.bgWhiteSecondary};
    border: none;
  }
`;

const SuccessMsg = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
`;

const ShoeboxSwapPage = () => {
  const TokenAddressFromNetwork = '0x0000000000000000000000000000000000000000';
  const BifrostNetworkId = 49088; // mainnet: 3068
  const EthereumNetworkId = 1;
  const BSCNetworkId = 56;
  const PolygonNetworkId = 80001; // mainnet: 137
  const AvalancheNetworkId = 43114;

  const [isToggleOpen1, setIsToggleOpen1] = useState(false);
  const [isToggleOpen2, setIsToggleOpen2] = useState(false);
  const [isToggleOpen3, setIsToggleOpen3] = useState(false);
  const [isToggleOpen4, setIsToggleOpen4] = useState(false);

  const [fromNetworkIcon, setFromNetworkIcon] = useState(QMIcon);
  const [fromNetworkName, setFromNetworkName] = useState('Select Network');
  const [fromNetworkId, setFromNetworkId] = useState(0);
  const [fromAmount, setFromAmount] = useState(0);
  const [fromTokenIcon, setFromTokenIcon] = useState(QMIcon);
  const [fromTokenName, setFromTokenName] = useState('Select Token');

  const [toNetworkIcon, setToNetworkIcon] = useState(QMIcon);
  const [toNetworkName, setToNetworkName] = useState('Select Network');
  const [toNetworkId, setToNetworkId] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [toTokenIcon, setToTokenIcon] = useState(QMIcon);
  const [toTokenName, setToTokenName] = useState('Select Token');

  const [swapSlippage, setSwapSlippage] = useState(0.5);

  const [isLoading, setIsLoading] = useState(false);
  const [isCrossSwap, setIsCrossSwap] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isCrossSwap2, setIsCrossSwap2] = useState(false);

  const { implementBridge } = useChainRunner();
  const { swapExactTokensForETH, swapExactTokensForTokens } = useSwap();

  async function doCrossChainSwap() {
    setIsCrossSwap(false);
    setIsLoading(true);
    try {
      const amount = await swapExactTokensForETH(fromAmount);
      const amountAfterBridge = await implementBridge(
        TokenAddressFromNetwork,
        amount,
        PolygonNetworkId,
        BifrostNetworkId,
      );

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xbfc0' }],
        });

        localStorage.setItem('_chainId', '0xbfc0');
      } catch (switchError) {
        toast.error('Switch network FAILED', {
          autoClose: 1500,
        });
      }

      await swapExactTokensForTokens(3);
    } catch (err) {
      console.log(err);
      toast.error('Shoe swap failed.');
    }
    setIsCrossSwap(true);
    setIsLoading(false);
  }

  async function doCrossChainSwap2() {
    setIsCrossSwap2(false);
    setIsLoading2(true);
    try {
      swapExactTokensForTokens(3);
    } catch (err) {
      console.log(err);
      toast.error('Shoe swap failed.');
    }
    setIsCrossSwap2(true);
    setIsLoading2(true);
  }

  const handleFromAmount = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setFromAmount(Number(newValue));
    } else {
      e.target.value = fromAmount;
    }
  };

  const handleResetClick = () => {
    setFromNetworkIcon(QMIcon);
    setFromNetworkName('Select Network');
    setFromNetworkId(0);
    setFromAmount(0);
    setFromTokenIcon(QMIcon);
    setFromTokenName('Select Token');
    setToNetworkIcon(QMIcon);
    setToNetworkName('Select Network');
    setToNetworkId(0);
    setToAmount(0);
    setToTokenIcon(QMIcon);
    setToTokenName('Select Token');
  };

  useEffect(() => {
    if (fromAmount === 0) {
      setToAmount(0);
    } else {
      const _toAmount = fromAmount / 1.325245;
      setTimeout(() => setToAmount(_toAmount.toFixed(4)), 1500);
    }
  }, [fromAmount]);

  return (
    <Container>
      <PageTitle>Shoe Swap</PageTitle>
      <PageSubTitle>Move all M2E assets at once.</PageSubTitle>
      <PageSubTitle>
        If you run into any issue please let us know in out discord server
      </PageSubTitle>
      <Wrapper>
        <TopTitleWrapper>
          <TopTitle>Shoe Swap</TopTitle>
          <ResetButton onClick={handleResetClick}>Reset</ResetButton>
        </TopTitleWrapper>
        <DropdownContainer>
          <DropdownButton onClick={() => setIsToggleOpen1(!isToggleOpen1)}>
            <DropdownButtonTitle>
              <DropdownIcon src={fromNetworkIcon} />
              <DropdownName>{fromNetworkName}</DropdownName>
            </DropdownButtonTitle>
            <DropdownButtonTitle>
              <Divider
                width="1px"
                height="2rem"
                color={colors.bgWhiteSecondary}
              />
              <BiChevronDown size="1.5rem" color={colors.bgWhiteSecondary} />
            </DropdownButtonTitle>
          </DropdownButton>
          <DropdownContent isOpen={isToggleOpen1}>
            <DropdownItem
              onClick={() => {
                setIsToggleOpen1(!isToggleOpen1);
                setFromNetworkIcon(BifrostIcon);
                setFromNetworkName('Bifrost Mainnet');
                setFromNetworkId(BifrostNetworkId);
              }}
            >
              <DropdownIcon src={BifrostIcon} />
              <DropdownName>Bifrost Mainnet</DropdownName>
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setIsToggleOpen1(!isToggleOpen1);
                setFromNetworkIcon(EthereumIcon);
                setFromNetworkName('Ethereum Mainnet');
                setFromNetworkId(EthereumNetworkId);
              }}
            >
              <DropdownIcon src={EthereumIcon} />
              <DropdownName>Ethereum Mainnet</DropdownName>
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setIsToggleOpen1(!isToggleOpen1);
                setFromNetworkIcon(BSCIcon);
                setFromNetworkName('BSC Mainnet');
                setFromNetworkId(BSCNetworkId);
              }}
            >
              <DropdownIcon src={BSCIcon} />
              <DropdownName>BSC Mainnet</DropdownName>
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setIsToggleOpen1(!isToggleOpen1);
                setFromNetworkIcon(PolygonIcon);
                setFromNetworkName('Polygon Mainnet');
                setFromNetworkId(PolygonNetworkId);
              }}
            >
              <DropdownIcon src={PolygonIcon} />
              <DropdownName>Polygon Mainnet</DropdownName>
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setIsToggleOpen1(!isToggleOpen1);
                setFromNetworkIcon(AvalancheIcon);
                setFromNetworkName('Avalanche Mainnet');
                setFromNetworkId(AvalancheNetworkId);
              }}
            >
              <DropdownIcon src={AvalancheIcon} />
              <DropdownName>Avalanche Mainnet</DropdownName>
            </DropdownItem>
          </DropdownContent>
        </DropdownContainer>
        <SwapWrapper isFrom={false}>
          <SwapContent>From amount</SwapContent>
          <SwapContent>
            <TextInputBox onChange={handleFromAmount} value={fromAmount} />
            <DropdownContainer>
              <DropdownButton onClick={() => setIsToggleOpen3(!isToggleOpen3)}>
                <DropdownButtonTitle>
                  <DropdownIcon src={fromTokenIcon} />
                  <DropdownName>{fromTokenName}</DropdownName>
                </DropdownButtonTitle>
                <DropdownButtonTitle>
                  <BiChevronDown
                    size="1.5rem"
                    color={colors.bgWhiteSecondary}
                  />
                </DropdownButtonTitle>
              </DropdownButton>
              <DropdownContent isOpen={isToggleOpen3}>
                <DropdownItem
                  onClick={() => {
                    setIsToggleOpen3(!isToggleOpen3);
                    setFromTokenIcon(GMTIcon);
                    setFromTokenName('GMT');
                  }}
                >
                  <DropdownIcon src={GMTIcon} />
                  <DropdownName>GMT</DropdownName>
                </DropdownItem>
              </DropdownContent>
            </DropdownContainer>
          </SwapContent>
          <SwapContent>Balance: {} MAX</SwapContent>
        </SwapWrapper>
        <BiDownArrowAlt size="3rem" color={colors.bgWhiteSecondary} />
        <DropdownContainer>
          <DropdownButton onClick={() => setIsToggleOpen2(!isToggleOpen2)}>
            <DropdownButtonTitle>
              <DropdownIcon src={toNetworkIcon} />
              <DropdownName>{toNetworkName}</DropdownName>
            </DropdownButtonTitle>
            <DropdownButtonTitle>
              <Divider
                width="1px"
                height="2rem"
                color={colors.bgWhiteSecondary}
              />
              <BiChevronDown size="1.5rem" color={colors.bgWhiteSecondary} />
            </DropdownButtonTitle>
          </DropdownButton>
          <DropdownContent isOpen={isToggleOpen2}>
            <DropdownItem
              onClick={() => {
                setIsToggleOpen2(!isToggleOpen2);
                setToNetworkIcon(BifrostIcon);
                setToNetworkName('Bifrost Mainnet');
                setToNetworkId(BifrostNetworkId);
              }}
            >
              <DropdownIcon src={BifrostIcon} />
              <DropdownName>Bifrost Mainnet</DropdownName>
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setIsToggleOpen2(!isToggleOpen2);
                setToNetworkIcon(EthereumIcon);
                setToNetworkName('Ethereum Mainnet');
                setToNetworkId(EthereumNetworkId);
              }}
            >
              <DropdownIcon src={EthereumIcon} />
              <DropdownName>Ethereum Mainnet</DropdownName>
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setIsToggleOpen2(!isToggleOpen2);
                setToNetworkIcon(BSCIcon);
                setToNetworkName('BSC Mainnet');
                setToNetworkId(BSCNetworkId);
              }}
            >
              <DropdownIcon src={BSCIcon} />
              <DropdownName>BSC Mainnet</DropdownName>
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setIsToggleOpen2(!isToggleOpen2);
                setToNetworkIcon(PolygonIcon);
                setToNetworkName('Polygon Mainnet');
                setToNetworkId(PolygonNetworkId);
              }}
            >
              <DropdownIcon src={PolygonIcon} />
              <DropdownName>Polygon Mainnet</DropdownName>
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setIsToggleOpen2(!isToggleOpen2);
                setToNetworkIcon(AvalancheIcon);
                setToNetworkName('Avalanche Mainnet');
                setToNetworkId(AvalancheNetworkId);
              }}
            >
              <DropdownIcon src={AvalancheIcon} />
              <DropdownName>Avalanche Mainnet</DropdownName>
            </DropdownItem>
          </DropdownContent>
        </DropdownContainer>
        <SwapWrapper isFrom={true}>
          <SwapContent>To amount</SwapContent>
          <SwapContent>
            <TextBox>{toAmount}</TextBox>
            <DropdownContainer>
              <DropdownButton onClick={() => setIsToggleOpen4(!isToggleOpen4)}>
                <DropdownButtonTitle>
                  <DropdownIcon src={toTokenIcon} />
                  <DropdownName>{toTokenName}</DropdownName>
                </DropdownButtonTitle>
                <DropdownButtonTitle>
                  <BiChevronDown
                    size="1.5rem"
                    color={colors.bgWhiteSecondary}
                  />
                </DropdownButtonTitle>
              </DropdownButton>
              <DropdownContent isOpen={isToggleOpen4}>
                <DropdownItem
                  onClick={() => {
                    setIsToggleOpen4(!isToggleOpen4);
                    setToTokenIcon(KWIIcon);
                    setToTokenName('KWI');
                  }}
                >
                  <DropdownIcon src={KWIIcon} />
                  <DropdownName>KWI</DropdownName>
                </DropdownItem>
              </DropdownContent>
            </DropdownContainer>
          </SwapContent>
          <SwapContent>Balance: {} MAX</SwapContent>
        </SwapWrapper>
        <SlippageContent>Swap Slippage: {swapSlippage}%</SlippageContent>
        <SlippageButtons>
          <SlippageButton
            isActive={swapSlippage === 0.1}
            onClick={() => setSwapSlippage(0.1)}
          >
            0.1%
          </SlippageButton>
          <SlippageButton
            isActive={swapSlippage === 0.5}
            onClick={() => setSwapSlippage(0.5)}
          >
            0.5%
          </SlippageButton>
          <SlippageButton
            isActive={swapSlippage === 1}
            onClick={() => setSwapSlippage(1)}
          >
            1.0%
          </SlippageButton>
        </SlippageButtons>
        <DoCrossChainWrapper>
          {isLoading ? (
            <LoadingSpinner />
          ) : isCrossSwap ? (
            <SuccessMsg>Successful progress!</SuccessMsg>
          ) : (
            <DoCrossChainButton
              onClick={doCrossChainSwap}
              disabled={
                fromNetworkName === 'Select Network' ||
                toNetworkName === 'Select Network' ||
                fromTokenName === 'Select Token' ||
                toTokenName === 'Select Token'
              }
            >
              Cross Chain
            </DoCrossChainButton>
          )}
        </DoCrossChainWrapper>
      </Wrapper>
    </Container>
  );
};

export default ShoeboxSwapPage;
