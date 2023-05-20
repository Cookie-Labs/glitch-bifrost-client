import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import shoeBoxLogo from '@assets/images/ShoeBox_Logo.png';
import { SIDE_NAV_WIDTH, FOOTER_H } from './layoutConst';
import { BsTwitter, BsTelegram, BsDiscord } from 'react-icons/bs';
import { useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FooterContainer = styled.div`
  width: ${(props) =>
    props.lgUp ? `calc(100vw - ${SIDE_NAV_WIDTH})` : '100vw'};
  height: ${FOOTER_H};
  margin-left: ${(props) => (props.lgUp ? `${SIDE_NAV_WIDTH}` : 0)};
  padding: 20px;
  background-color: ${colors.bgWhiteSecondary};
`;

const LogoImage = styled.img`
    width: 3rem;
`;

const EmojiWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
`;

const EmojiButton = styled.button`
  color: ${colors.textSecondary};
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    color: ${colors.textPrimary};
  }
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const TextWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.8rem;
`;

const FooterText = styled.span`
  color: ${colors.textSecondary};
  font-size: 1rem;
`;

const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Divider = () => {
  return (
    <svg
      width={1}
      height={12}
      viewBox="0 0 1 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={1} height={12} fill={colors.textSecondary} />
    </svg>
  );
};

const Footer = () => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const navigate = useNavigate();
  return (
    <>
      <FooterContainer lgUp={lgUp}>
        <TopWrapper>
          <EmojiButton
            onClick={() => {
              navigate('/');
            }}
          >
            <LogoImage src={shoeBoxLogo} />
          </EmojiButton>
          <EmojiWrapper>
            <EmojiButton
              onClick={() => {
                window.open('https://twitter.com/');
              }}
            >
              <BsTwitter />
            </EmojiButton>
            <EmojiButton
              onClick={() => {
                window.open('https://telegram.org/?setln=ko');
              }}
            >
              <BsTelegram />
            </EmojiButton>
            <EmojiButton
              onClick={() => {
                window.open('https://discord.com/');
              }}
            >
              <BsDiscord />
            </EmojiButton>
          </EmojiWrapper>
        </TopWrapper>
        <TextWrapper>
          <FooterText>Cookie Labs</FooterText>
        </TextWrapper>
        <TextWrapper>
          <FooterText>&copy; Shoe Box. 2023. All rights reserved</FooterText>
        </TextWrapper>
        <FooterLinks>
          <FooterText>이용약관</FooterText>
          <Divider />
          <FooterText>개인정보처리방침</FooterText>
          <Divider />
          <FooterText>자주묻는질문</FooterText>
        </FooterLinks>
      </FooterContainer>
    </>
  );
};

export default Footer;
