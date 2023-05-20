import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import SearchBar from './components/overview/SearchBar';
import { TbSquareRoundedNumber7Filled } from 'react-icons/tb';
import LoadingSpinner from '@atoms/LoadingSpinner';

import { userState } from '@states/userState';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { walletConnectError } from '@utils/toastMessage';
// import useRaffle from '@hooks/useRaffle';
// import MyShoesList from './MyShoesList';

import shoe1Image from '@assets/images/shoe1.png';
import shoe2Image from '@assets/images/shoe2.png';
import shoe3Image from '@assets/images/shoe3.png';
import shoe4Image from '@assets/images/shoe4.png';
import shoe5Image from '@assets/images/shoe5.png';
import shoe6Image from '@assets/images/shoe6.png';
import shoe7Image from '@assets/images/shoe7.png';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2.5rem 4rem;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 3rem;
`;

const MyPageTitle = styled.span`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 1rem;
`;

const MyPageSubTitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.bgWhiteSecondary};
  margin-bottom: 2rem;
`;

const MyAssets = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid ${colors.bgWhiteSecondary};
  font-size: 1.4rem;
  font-weight: 600;
  gap: 0.3rem;
  margin-bottom: 2rem;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 46%;
  left: 46%;
`;

const ShoesContainer = styled.div`
  width: 100%;
  min-height: 30rem;
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const TokenWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ShoesImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const ShoeboxMyPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { account } = useRecoilValue(userState);

  useEffect(() => {
    if (!account) {
      walletConnectError();
      navigate(-1);
    }
  }, [account, navigate]);

  setTimeout(() => {
    setIsLoading(false);
  }, 2500);

  return (
    <Container>
      <SearchBarWrapper>
        <SearchBar place="Search Pages" path="myPage" />
      </SearchBarWrapper>
      <MyPageTitle>My Page</MyPageTitle>
      <MyPageSubTitle>
        The global cryptocurrency market cap today is $1.18 Trillion, a 1.2%
        change in the last 24 hours. Read More
      </MyPageSubTitle>
      <MyAssets>
        Shoes
        <TbSquareRoundedNumber7Filled color={colors.bgWhiteTertiary} />
      </MyAssets>
      <ShoesContainer>
        {isLoading ? (
          <LoadingWrapper>
            <LoadingSpinner />
          </LoadingWrapper>
        ) : (
          <>
            <TokenWrapper>
              <ShoesImage src={shoe1Image} />
            </TokenWrapper>
            <TokenWrapper>
              <ShoesImage src={shoe2Image} />
            </TokenWrapper>
            <TokenWrapper>
              <ShoesImage src={shoe3Image} />
            </TokenWrapper>
            <TokenWrapper>
              <ShoesImage src={shoe4Image} />
            </TokenWrapper>
            <TokenWrapper>
              <ShoesImage src={shoe5Image} />
            </TokenWrapper>
            <TokenWrapper>
              <ShoesImage src={shoe6Image} />
            </TokenWrapper>
            <TokenWrapper>
              <ShoesImage src={shoe7Image} />
            </TokenWrapper>
          </>
        )}
      </ShoesContainer>
    </Container>
  );
};

export default ShoeboxMyPage;
