import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import GlobalStyle from '@styles/GlobalStyle';
import { Routes, Route } from 'react-router-dom';

// Font
import '@fontsource/do-hyeon';
import '@fontsource/shrikhand';
import '@fontsource/roboto-condensed';

// browser view
import TestPageLayout from '@pages/testPages/layout/TestPageLayout';
import Test1Page from '@pages/testPages/Test1Page';
import Test2Page from '@pages/testPages/Test2Page';
import Test404Page from '@pages/testPages/Test404Page';

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
          <Route path="/" element={<TestPageLayout />}>
            <Route index element={<Test1Page />} />
            <Route path="/test2" element={<Test2Page />} />
            <Route path="*" element={<Test404Page />} />
          </Route>
        </Routes>
      </BrowserView>
    </>
  );
}

export default App;
