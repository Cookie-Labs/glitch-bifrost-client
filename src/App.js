import React from 'react';
import GlobalStyle from '@styles/GlobalStyle';
import { Routes, Route } from 'react-router-dom';

// Font
import '@fontsource/do-hyeon';
import '@fontsource/shrikhand';
import '@fontsource/roboto-condensed';

// browser view
import ShoeboxLayout from '@pages/testPages/layout/ShoeboxLayout';
import ShoeboxOverviewPage from '@pages/testPages/ShoeboxOverviewPage';
import ShoeboxSwapPage from '@pages/testPages/ShoeboxSwapPage';
import ShoeboxEventPage from '@pages/testPages/ShoeboxEventPage';
import ShoeboxMyShoesPage from '@pages/testPages/ShoeboxMyShoesPage';
import Shoebox404Page from '@pages/testPages/Shoebox404Page';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<ShoeboxLayout />}>
          <Route index element={<ShoeboxOverviewPage />} />
          <Route path="shoeSwap" element={<ShoeboxSwapPage />} />
          <Route path="event" element={<ShoeboxEventPage />} />
          <Route path="myShoes" element={<ShoeboxMyShoesPage />} />
          <Route path="*" element={<Shoebox404Page />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
