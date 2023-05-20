import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { useLocation } from 'react-router-dom';
import { Drawer, useTheme, useMediaQuery } from '@mui/material';
import { Scrollbar } from '@atoms/scrollbar';
import shoeBoxLogo from '@assets/images/ShoeBox_Logo.png';
import SideNavItems from './SideNavItems';
import { BiHome, BiGift, BiShoppingBag, BiCalendarCheck } from 'react-icons/bi';
import { AiOutlineSwap } from 'react-icons/ai';
import { TbShoe } from 'react-icons/tb';
import { SIDE_NAV_WIDTH } from './layoutConst';
import bmallImage from '@assets/images/Bmall_image.svg';
import ConnectWallet from '@articles/ConnectWallet';
import CurrentNetwork from '@articles/CurrentNetwork';

const items = [
  {
    title: 'Overview',
    path: '/',
    icon: <BiHome size="2rem" />,
    color: `${colors.primary80}`,
  },
  {
    title: 'Shoe Swap',
    path: '/shoeSwap',
    icon: <AiOutlineSwap size="2rem" />,
    color: `${colors.primary80}`,
  },
  {
    title: 'Events',
    path: '/events',
    icon: <BiGift size="2rem" />,
    color: `${colors.primary80}`,
  },
  {
    title: 'My Calendar',
    path: '/myCalendar',
    icon: <BiCalendarCheck size="2rem" />,
    color: `${colors.primary80}`,
  },
  {
    title: 'My Page',
    path: '/myPage',
    icon: <TbShoe size="2rem" />,
    color: `${colors.primary80}`,
  },
];

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const NavButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LogoImage = styled.img`
  height: 7rem;
`;

const IconButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  color: ${colors.bgWhiteSecondary};
  padding: 0.5rem 1rem;
`;

const MallImage = styled.img`
  width: 4.5rem;
`;

const SideNavTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: ${colors.bgWhiteSecondary};
  border-top: 1px solid ${colors.bgWhiteSecondary};
  padding: 1rem;
  margin-top: 1rem;
  width: 80%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem 0;
`;

const WalletButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ButtonTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${colors.bgWhiteSecondary};
`

const SideBar = ({ open, onNavClose }) => {
  const account = localStorage.getItem('_user');
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const { pathname } = useLocation();

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: `${colors.bgRed}`,
        },
      }}
    >
      <SideBarContainer>
        <LogoImage src={shoeBoxLogo} />
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
        <SideNavTitle>Dashboards</SideNavTitle>
        <NavButtonsWrapper>
          {items.map((item) => {
            const active1 = item.path ? pathname === item.path : false;
            const active2 = item.subPath ? pathname === item.subPath : false;
            const active = active1 || active2;

            return (
              <SideNavItems
                key={item.title}
                active={active}
                activeColor={item.color}
                path={item.path}
                title={item.title}
                icon={item.icon}
                disabled={item.disabled}
              />
            );
          })}
          <IconButton
            onClick={() => {
              window.open('https://bmall.store/ko');
            }}
          >
            <BiShoppingBag size="2rem" />
            <ButtonTitle>Marketplace</ButtonTitle>
          </IconButton>
        </NavButtonsWrapper>
      </SideBarContainer>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: `${colors.bgWhitePrimary}`,
            color: `${colors.textBlack}`,
            width: SIDE_NAV_WIDTH,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  } else {
    return (
      <Drawer
        anchor="left"
        onClose={onNavClose}
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: `${colors.bgPrimary}`,
            color: `${colors.textPrimary}`,
            width: SIDE_NAV_WIDTH,
          },
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        variant="temporary"
      >
        {content}
      </Drawer>
    );
  }
};

export default SideBar;
