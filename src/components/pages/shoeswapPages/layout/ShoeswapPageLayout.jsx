import React from 'react';
import {Outlet} from 'react-router-dom';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import TopBar from './TopBar';
import {TOP_NAV_HEIGHT} from './layoutConst';

const LayoutWrapper = styled.div`
  margin-top: ${TOP_NAV_HEIGHT};
  background-color: ${colors.bgSecondary};
  width: 100vw;
  min-height: calc(100vh - ${TOP_NAV_HEIGHT});
  padding: 1.5rem;
`;

const ShoeswapPageLayout = () => {
  return (
    <>
      <TopBar />
      <LayoutWrapper>
        <Outlet />
      </LayoutWrapper>
    </>
  )
}

export default ShoeswapPageLayout