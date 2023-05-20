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
import ShoeboxEventsPage from '@pages/testPages/ShoeboxEventsPage';
import ShoeboxMyCalendarPage from '@pages/testPages/ShoeboxMyCalendarPage';
import ShoeboxMyPage from '@pages/testPages/ShoeboxMyPage';
import Shoebox404Page from '@pages/testPages/Shoebox404Page';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<ShoeboxLayout />}>
          <Route index element={<ShoeboxOverviewPage />} />
          <Route path="shoeSwap" element={<ShoeboxSwapPage />} />
          <Route path="events" element={<ShoeboxEventsPage />} />
          <Route path="myCalendar" element={<ShoeboxMyCalendarPage />} />
          <Route path="myPage" element={<ShoeboxMyPage />} />
          <Route path="*" element={<Shoebox404Page />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
