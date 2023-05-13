import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { useLocation } from 'react-router-dom';
import { Drawer, useTheme, useMediaQuery } from '@mui/material';
import { Scrollbar } from '@atoms/scrollbar';
import shoeBoxLogo from '@assets/images/ShoeBox_Logo.png';
import SideNavItems from './SideNavItems';
import { TbCircleNumber1, TbCircleNumber2 } from 'react-icons/tb';
import { SIDE_NAV_WIDTH, TOP_NAV_HEIGHT } from './layoutConst';

const items = [
  {
    title: 'TEST1',
    path: '/',
    icon: <TbCircleNumber1 size="30" />,
    color: `${colors.primary80}`,
  },
  {
    title: 'TEST2',
    path: '/test2',
    icon: <TbCircleNumber2 size="30" />,
    color: `${colors.secondary80}`,
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
  width: ${SIDE_NAV_WIDTH};
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
