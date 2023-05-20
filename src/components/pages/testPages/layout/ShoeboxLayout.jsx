import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import TopBar from './TopBar';
import SideBar from './SideBar';
import Footer from './Footer';
import { SIDE_NAV_WIDTH } from './layoutConst';

const LayoutWrapper = styled.div`
  margin-left: ${(props) => (props.lgUp ? `${SIDE_NAV_WIDTH}` : 0)};
  background-color: ${colors.bgWhitePrimary};
  width: ${(props) =>
    props.lgUp ? `calc(100vw - ${SIDE_NAV_WIDTH})` : '100vw'};
  min-height: calc(100vh);
  padding: 2rem 4.5rem;
`;

const ShoeboxLayout = () => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const [openNav, setOpenNav] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    handleTabChange();
    // eslint-disable-next-line
  }, [pathname]);

  const handleTabChange = useCallback(() => {
    if (openNav) setOpenNav(false);
  }, [openNav]);

  return (
    <>
      <TopBar onNavOpen={() => setOpenNav(true)} />
      <SideBar onNavClose={() => setOpenNav(false)} open={openNav} />
      <LayoutWrapper lgUp={lgUp}>
        <Outlet />
      </LayoutWrapper>
      <Footer />
    </>
  );
};

export default ShoeboxLayout;
