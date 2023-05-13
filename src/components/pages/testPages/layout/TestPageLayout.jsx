import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import TopBar from './TopBar';
import SideBar from './SideBar';
import Footer from './Footer';
import { TOP_NAV_HEIGHT, SIDE_NAV_WIDTH, FOOTER_H } from './layoutConst';
import { Outlet } from 'react-router-dom';

const LayoutWrapper = styled.div`
  margin-left: ${(props) => (props.lgUp ? `${SIDE_NAV_WIDTH}` : 0)};
  margin-top: ${TOP_NAV_HEIGHT};
  background-color: ${colors.bgSecondary};
  width: ${(props) =>
    props.lgUp ? `calc(100vw - ${SIDE_NAV_WIDTH})` : '100vw'};
  min-height: calc(100vh - ${TOP_NAV_HEIGHT} - ${FOOTER_H});
  padding: 1.5rem;
`;

const TestPageLayout = () => {
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

export default TestPageLayout;
