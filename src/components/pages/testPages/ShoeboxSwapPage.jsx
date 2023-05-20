import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 30rem;
  height: 30rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${colors.bgQuaternary};
  border-radius: 1rem;
  background-color: ${colors.bgPrimary};
`;

const TopTitleWrapper = styled.div`
  width: 100%;
  height: 16%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${colors.bgQuaternary};
`;

const TopTitle = styled.span`
  font-size: 1.7rem;
  font-weight: 900;
`

const ResetButton = styled.button`
  cursor: pointer;
  color: ${colors.bgWhite};

  &:hover{
    color: ${colors.textPrimary};
  }
`

const SwapWrapper = styled.div`
  width: 100%;
  height: 42%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ isFrom }) =>
    isFrom ? colors.bgPrimary : colors.bgWhite};
  border-radius: 0 0 1rem 1rem;
`;

const ShoeboxSwapPage = () => {
  return (
    <Container>
      <Wrapper>
        <TopTitleWrapper>
          <TopTitle>Shoe Box Cross Chain Swap</TopTitle>
          <ResetButton>Reset</ResetButton>
        </TopTitleWrapper>
        <SwapWrapper isFrom={true}>Top</SwapWrapper>
        <SwapWrapper isFrom={false}>Bottom</SwapWrapper>
      </Wrapper>
    </Container>
  );
};

export default ShoeboxSwapPage;
