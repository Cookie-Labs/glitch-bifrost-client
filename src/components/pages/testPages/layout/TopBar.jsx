import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TOP_NAV_HEIGHT, SIDE_NAV_WIDTH } from './layoutConst';
import ConnectWallet from '@articles/ConnectWallet';
import { BiMenu } from 'react-icons/bi';
import shoeBoxLogo from '@assets/images/ShoeBox_Logo.png';

const TopBarContainer = styled.div`
  backdrop-filter: blur(6px);
  background-color: ${colors.bgSecondary};
  border-bottom: 1px solid ${colors.bgQuaternary};
  position: fixed;
  top: 0;
  left: ${(props) => (props.lgUp ? `${SIDE_NAV_WIDTH}` : null)};
  width: ${(props) =>
    props.lgUp ? `calc(100vw - ${SIDE_NAV_WIDTH})` : '100vw'};
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
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
`;

const WalletButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${TOP_NAV_HEIGHT};
`;

const IconButton = styled.button`
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 5rem;
  margin-right: 2rem;

  &:hover {
    width: 4.8rem;
    transition: 0.3s;
  }
`;

const TopBar = ({ onNavOpen }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      <TopBarContainer lgUp={lgUp}>
        <TopBarWrapper>
          <ButtonsWrapper>
            {!lgUp && (
              <>
                <IconButton onClick={onNavOpen}>
                  <BiMenu size="30" color={colors.bgWhite} />
                </IconButton>
                <IconButton
                    onClick={() => {
                        navigate('/');
                    }}
                >
                  <LogoImage src={shoeBoxLogo} />
                </IconButton>
              </>
            )}
          </ButtonsWrapper>
          <ButtonsWrapper>
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
