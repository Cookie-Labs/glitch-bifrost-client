import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import GlobalStyle from '@styles/GlobalStyle';
import { Routes, Route } from 'react-router-dom';

// Font
import '@fontsource/do-hyeon';
import '@fontsource/shrikhand';
import '@fontsource/roboto-condensed';

// browser view
import TestPage from '@pages/testPages/TestPage';
import Test404Page from '@pages/testPages/Test404Page';

// mobile view
import MobilePage from './MobilePage';

function App() {
  return (
    <>
      <GlobalStyle/>
      <MobileView>
        <MobilePage />
      </MobileView>
      <BrowserView>
        <Routes>
          <Route path="/" element={<TestPage />}>
            <Route path="*" element={<Test404Page />}/>
          </Route>
        </Routes>
      </BrowserView>
    </>
  );
}

export default App;
