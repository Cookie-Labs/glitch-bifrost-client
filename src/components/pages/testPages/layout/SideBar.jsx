import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { useLocation } from 'react-router-dom';
import { Drawer, useTheme, useMediaQuery } from '@mui/material';
import { Scrollbar } from '@atoms/scrollbar';
import shoeBoxLogo from '@assets/images/ShoeBox_Logo.png';
import SideNavItems from './SideNavItems';
import {BiHome, BiBarChartAlt, BiGift} from 'react-icons/bi';
import {SiHiveBlockchain} from 'react-icons/si';
import {HiOutlineTicket} from 'react-icons/hi';
import {TbShoe} from 'react-icons/tb';
import { SIDE_NAV_WIDTH, TOP_NAV_HEIGHT } from './layoutConst';

const items = [
  {
    title: 'MAIN',
    path: '/',
    icon: <BiHome size="30"/>,
    color: `${colors.primary80}`,
  },
  {
    title: 'OVERVIEW',
    path: '/overview',
    icon: <BiBarChartAlt size="30"/>,
    color: `${colors.primary80}`,
  },
  {
    title: 'CHAINS',
    path: '/chains',
    icon: <SiHiveBlockchain size="30" />,
    color: `${colors.primary80}`,
  },
  {
    title: 'AIRDROPS',
    path: '/airdrops',
    icon: <BiGift size="30" />,
    color: `${colors.primary80}`,
  },
  {
    title: 'RAFFLES',
    path: '/raffles',
    icon: <HiOutlineTicket size="30" />,
    color: `${colors.primary80}`,
  },
  {
    title: 'MY SHOES',
    path: '/myShoes',
    icon: <TbShoe size="30" />,
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
