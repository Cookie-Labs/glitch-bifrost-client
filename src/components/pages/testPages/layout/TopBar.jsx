import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { useTheme, useMediaQuery } from '@mui/material';
import { SIDE_NAV_WIDTH } from './layoutConst';
import { BiMenu } from 'react-icons/bi';

const TopBarContainer = styled.div`
  background-color: none;
  position: fixed;
  top: 0;
  left: ${(props) => (props.lgUp ? `${SIDE_NAV_WIDTH}` : null)};
  width: ${(props) =>
    props.lgUp ? `calc(100vw - ${SIDE_NAV_WIDTH})` : '100vw'};
  z-index: 10;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid ${colors.bgQuaternary};
  margin: 1rem 0 0 1rem;
  padding: 0.1rem;
`;

const TopBar = ({ onNavOpen }) => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      <TopBarContainer lgUp={lgUp}>
        <ButtonsWrapper>
          {!lgUp && (
            <>
              <IconButton onClick={onNavOpen}>
                <BiMenu size="30" color={colors.bgWhiteSecondary} />
              </IconButton>
            </>
          )}
        </ButtonsWrapper>
      </TopBarContainer>
    </>
  );
};

export default TopBar;
