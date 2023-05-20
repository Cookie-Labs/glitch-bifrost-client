import React, { useState } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import SearchBar from './components/overview/SearchBar';
import LoadingSpinner from '@atoms/LoadingSpinner';
// import CoinTable from './components/overview/CoinTable';
import m2eImage from '@assets/images/m2e.png';
import p2eImage from '@assets/images/p2e.png';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 3rem;
`;

const OverviewTitle = styled.span`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 1rem;
`;

const OverviewSubTitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.bgWhiteSecondary};
  margin-bottom: 2rem;
`;

const TabButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const TabButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  border: 1px solid ${colors.bgWhiteSecondary};
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? colors.primary80 : null)};
  color: ${({ isActive }) => (isActive ? colors.textPrimary : null)};

  &:hover {
    background-color: ${colors.primary40};
    transition: 0.3s;
  }
`;

const CoinTableWrapper = styled.div`
  width: 100%;
  min-height: 30rem;
  border-radius: 10px;
  position: relative;
`;

const CoinTableImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 46%;
  left: 46%;
`;

const ShoeboxOverviewPage = () => {
  const [tab, setTab] = useState('M2E');
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2500);

  return (
    <Container>
      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>
      <OverviewTitle>Today's X2E Prices by Market Cap</OverviewTitle>
      <OverviewSubTitle>
        The global cryptocurrency market cap today is $1.18 Trillion, a 1.2%
        change in the last 24 hours. Read More
      </OverviewSubTitle>
      <TabButtonsWrapper>
        <TabButton
          isActive={tab === 'M2E'}
          value="M2E"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          Move to Earn
        </TabButton>
        <TabButton
          isActive={tab === 'P2E'}
          value="P2E"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          Play to Earn
        </TabButton>
      </TabButtonsWrapper>
      <CoinTableWrapper>
        {isLoading ? (
          <LoadingWrapper>
            <LoadingSpinner />
          </LoadingWrapper>
        ) : tab === 'M2E' ? (
          <CoinTableImage src={m2eImage} />
        ) : tab === 'P2E' ? (
          <CoinTableImage src={p2eImage} />
        ) : null}
      </CoinTableWrapper>
    </Container>
  );
};

export default ShoeboxOverviewPage;
