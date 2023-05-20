import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { useLocation } from 'react-router-dom';
import { Drawer, useTheme, useMediaQuery } from '@mui/material';
import { Scrollbar } from '@atoms/scrollbar';
import shoeBoxLogo from '@assets/images/ShoeBox_Logo.png';
import SideNavItems from './SideNavItems';
import {
  BiHome,
  BiGift,
  BiShoppingBag,
  BiCalendarCheck,
} from 'react-icons/bi';
import { AiOutlineSwap } from 'react-icons/ai';
import { TbShoe } from 'react-icons/tb';
import { SIDE_NAV_WIDTH, TOP_NAV_HEIGHT } from './layoutConst';
import bmallImage from '@assets/images/Bmall_image.svg';

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
  padding: 1.4rem 0;
  gap: 1.5rem;
`;

const LogoImage = styled.img`
  height: ${TOP_NAV_HEIGHT};
`;

const IconButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  color: ${colors.bgWhite};
  padding: 0.5rem 1rem;
`;

const MallImage = styled.img`
  width: 4.5rem;
`;

const SideBar = ({ open, onNavClose }) => {
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
            <MallImage src={bmallImage} />
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
            backgroundColor: `${colors.bgPrimary}`,
            color: `${colors.textPrimary}`,
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
