import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import GlobalStyle from '@styles/GlobalStyle';
import { Routes, Route } from 'react-router-dom';

// Font
import '@fontsource/do-hyeon';
import '@fontsource/shrikhand';
import '@fontsource/roboto-condensed';

// browser view
import ShoeboxLayout from '@pages/testPages/layout/ShoeboxLayout';
import ShoeboxMainPage from '@pages/testPages/ShoeboxMainPage';
import ShoeboxOverviewPage from '@pages/testPages/ShoeboxOverviewPage';
import ShoeboxChainsPage from '@pages/testPages/ShoeboxChainsPage';
import ShoeboxAirdropsPage from '@pages/testPages/ShoeboxAirdropsPage';
import ShoeboxRafflesPage from '@pages/testPages/ShoeboxRafflesPage';
import ShoeboxMyShoesPage from '@pages/testPages/ShoeboxMyShoesPage';
import Shoebox404Page from '@pages/testPages/Shoebox404Page';

import ShoeswapPageLayout from '@pages/shoeswapPages/layout/ShoeswapPageLayout';
import ShoeswapPage from '@pages/shoeswapPages/ShoeswapPage';
import ShoeswapPoolPage from '@pages/shoeswapPages/ShoeswapPoolPage';
import Shoeswap404Page from '@pages/shoeswapPages/Shoeswap404Page';

// mobile view
import MobilePage from './MobilePage';

function App() {
  return (
    <>
      <GlobalStyle />
      <MobileView>
        <MobilePage />
      </MobileView>
      <BrowserView>
        <Routes>
          <Route path="/" element={<ShoeboxLayout />}>
            <Route index element={<ShoeboxMainPage />} />
            <Route path="overview" element={<ShoeboxOverviewPage />} />
            <Route path="chains" element={<ShoeboxChainsPage />} />
            <Route path="airdrops" element={<ShoeboxAirdropsPage />} />
            <Route path="raffles" element={<ShoeboxRafflesPage />} />
            <Route path="myShoes" element={<ShoeboxMyShoesPage />} />
            <Route path="*" element={<Shoebox404Page />} />
          </Route>
          <Route path="/shoeswap" element={<ShoeswapPageLayout />}>
            <Route index element={<ShoeswapPage />} />
            <Route path="pool" element={<ShoeswapPoolPage />} />
            <Route path="*" element={<Shoeswap404Page />} />
          </Route>
        </Routes>
      </BrowserView>
    </>
  );
}

export default App;
