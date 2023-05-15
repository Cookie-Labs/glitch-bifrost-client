import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOP_NAV_HEIGHT } from './layoutConst';
import ConnectWallet from '@articles/ConnectWallet';
import CurrentNetwork from '@articles/CurrentNetwork';
import shoeswapLogo from '@assets/images/Shoeswap_image.svg';

const TopBarContainer = styled.div`
  backdrop-filter: blur(6px);
  background-color: ${colors.bgSecondary};
  border-bottom: 1px solid ${colors.bgQuaternary};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 10;
`;

const TopBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: ${TOP_NAV_HEIGHT};
  padding: 0 1.5rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 2rem;
`;

const LogoImage = styled.img`
  width: 10rem;
`;

const NavButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const NavTitle = styled.span`
  font-size: 1.7rem;
  font-weight: 700;
  color: ${({ isActive }) => (isActive ? colors.bgRed : colors.textPrimary)};
`;

const WalletButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${TOP_NAV_HEIGHT};
`;

const TopBar = () => {
  const account = localStorage.getItem('_user');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <TopBarContainer>
        <TopBarWrapper>
          <ButtonsWrapper>
            <LogoImage src={shoeswapLogo} />
            <NavButton
              onClick={() => {
                navigate('/shoeswap');
              }}
            >
              <NavTitle isActive={pathname === '/shoeswap'}>Swap</NavTitle>
            </NavButton>
            <NavButton
              onClick={() => {
                navigate('/shoeswap/pool');
              }}
            >
              <NavTitle isActive={pathname === '/shoeswap/pool'}>Pool</NavTitle>
            </NavButton>
          </ButtonsWrapper>
          <ButtonsWrapper>
            {account && (
              <WalletButtonWrapper>
                <CurrentNetwork />
              </WalletButtonWrapper>
            )}
            <WalletButtonWrapper>
              <ConnectWallet />
            </WalletButtonWrapper>
          </ButtonsWrapper>
        </TopBarWrapper>
      </TopBarContainer>
    </>
  );
};

export default TopBar;
