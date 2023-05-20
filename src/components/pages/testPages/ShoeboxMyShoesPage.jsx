import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import LoadingSpinner from '@atoms/LoadingSpinner';
import { userState } from '@states/userState';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { walletConnectError } from '@utils/toastMessage';
// import useRaffle from '@hooks/useRaffle';
// import MyShoesList from './MyShoesList';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ShoesContainer = styled.div`
  width: 100%;
  min-height: 20rem;
  border: 1px solid ${colors.bgQuaternary};
  border-radius: 1rem;
  position: relative;
`

const LoadingWrapper = styled.div`
  position: absolute;
  top: 46%;
  left: 46%;
`

const ShoeboxMyShoesPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {account} = useRecoilValue(userState);

  // const {} = useRaffle();

  useEffect(() => {
    if (!account) {
      walletConnectError();
      navigate(-1);
    }
  }, [account, navigate]);

  setTimeout(() => {
    setIsLoading(false);
  }, 2500)

  return (
    <Container>
      <ShoesContainer>
        {/* {
          isLoading ? (
            <LoadingWrapper>
              <LoadingSpinner />
            </LoadingWrapper>
          ) : 
        } */}
      </ShoesContainer>
    </Container>
  );
};

export default ShoeboxMyShoesPage;
