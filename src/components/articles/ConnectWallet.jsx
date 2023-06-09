import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import * as colors from '@styles/colors';
import { toast } from 'react-toastify';
import biportImage from '@assets/images/biport_image.png';
import metamaskImage from '@assets/images/metamask_image.png';
import { BiWalletAlt } from 'react-icons/bi';
import { formatAddress } from '@utils/parser';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAccount, userWalletType, userNetworkId } from '@states/userState';
import CustomModal from '@articles/CustomModal';
import { networks } from '@constants/networkInfo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ImgWrapper = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
`;

const SelectButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.bgWhiteSecondary};
  width: 100%;
  height: 4rem;
  border-radius: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${colors.textBlack};
  border: 1px solid ${colors.bgWhiteTertiary};
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
  opacity: 0.8;
  padding: 0 2rem;

  &:hover {
    background-color: ${colors.bgWhiteTertiary};
  }
`;

const MyAddress = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${colors.textBlack};
`;

const borderGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
`;

const WalletButton = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  border-radius: 1rem;
  min-width: 11.5rem;
  height: 3rem;
  padding: 0.4rem;
  font-size: 1.2rem;
  background-color: ${colors.bgWhitePrimary};
  position: relative;

  &:after {
    --borderWidth: 3px;
    content: '';
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(
      60deg,
      #ff770f,
      #c8f53c,
      #a166ab,
      #5073b8,
      #1098ad,
      #f37055,
      #07b39b
    );
    border-radius: 1rem;
    z-index: -1;
    animation: ${borderGradient} 3s ease alternate infinite;
    background-size: 300% 300%;
  }

  &:hover {
    background-color: ${colors.bgWhiteSecondary};
  }
`;

const shine = keyframes`
	from {
		background-position: 0%;
		opacity: 0.9;
	}

	to {
		background-position: 200%;
		opacity: 1;
	}
`;

const GradientSectionTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(
    90deg,
    #c425bf,
    #5dae1e 25.52%,
    #72c554 50%,
    #3838c9 76.04%,
    #cc7843
  );
  background-size: 200% auto;
  background-position: 0%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shine} 4s linear infinite;
`;

const metamask = window.ethereum;
const biport = window.biport;

const ConnectWallet = () => {
  const [showConnectOptions, setShowConnectOptions] = useState(false);
  const [showDisconnectOptions, setShowDisconnectOptions] = useState(false);
  const [account, setAccount] = useRecoilState(userAccount);
  const [walletType, setWalletType] = useRecoilState(userWalletType);
  const setNetworkId = useSetRecoilState(userNetworkId);
  const bifrostMainId = networks['bifrostMain'].chainId;

  const loginBiport = async () => {
    if (!biport) {
      toast.error('Biport installation is required');
      window.open(
        'https://chrome.google.com/webstore/detail/biport-wallet/mapbhaebnddapnmifbbkgeedkeplgjmf',
      );
      return;
    }

    try {
      // 지갑 연결을 위해
      const accounts = await toast.promise(
        biport.request({
          method: 'eth_requestAccounts',
        }),
        { pending: 'Interlocking biport wallet...' },
        { closeButton: true },
      );

      // 현재 연결되어 있는 네트워크 ID 받아오기
      const chainId = await biport.request({ method: 'eth_chainId' });

      // 지갑에 있는 계정들 중 유저가 체크한 계정 권한 받기
      await biport.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      });

      // 받아온 정보들 저장
      setAccount(accounts[0]);
      setWalletType('Biport');
      setNetworkId(chainId);
      localStorage.setItem('_user', accounts[0]);
      localStorage.setItem('_wallet', 'Biport');
      localStorage.setItem('_chainId', chainId);

      // 현재 연결되어 있는 바이프로스트 네트워크로 바꾸기
      if (chainId !== bifrostMainId) {
        try {
          await biport.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: bifrostMainId }],
          });
          setNetworkId(bifrostMainId);
          localStorage.setItem('_chainId', bifrostMainId);
        } catch (switchError) {
          toast.error('Switch network FAILED', {
            autoClose: 1500,
          });
        }
      }

      toast.success(`${formatAddress(accounts[0])}, welcome.`, {
        autoClose: 1500,
      });
      setTimeout(() => window.location.reload(), 1500);
    } catch {
      toast.error('Login failed. Please refresh your browser.', {
        autoClose: 1500,
      });
    }
  };

  const loginMetamask = async () => {
    if (!metamask) {
      toast.error('Metamask installation is required');
      window.open(
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      );
      return;
    }

    try {
      // 지갑 연결을 위해
      const accounts = await toast.promise(
        metamask.request({
          method: 'eth_requestAccounts',
        }),
        { pending: 'Interlocking metamask wallet...' },
        { closeButton: true },
      );

      // 현재 연결되어 있는 네트워크 ID 받아오기
      const chainId = await metamask.request({ method: 'eth_chainId' });

      // 지갑에 있는 계정들 중 유저가 체크한 계정 권한 받기
      await metamask.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      });

      // 받아온 정보들 저장
      setAccount(accounts[0]);
      setWalletType('Metamask');
      setNetworkId(chainId);
      localStorage.setItem('_user', accounts[0]);
      localStorage.setItem('_wallet', 'Metamask');
      localStorage.setItem('_chainId', chainId);

      // 현재 연결되어 있는 바이프로스트 네트워크로 바꾸기 + 없으면 추가
      if (chainId !== bifrostMainId) {
        try {
          await metamask.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: bifrostMainId }],
          });
          setNetworkId(bifrostMainId);
          localStorage.setItem('_chainId', bifrostMainId);
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await metamask.request({
                method: 'wallet_addEthereumChain',
                params: [networks['bifrostMain']],
              });
              setNetworkId(bifrostMainId);
              localStorage.setItem('_chainId', bifrostMainId);
            } catch (addError) {
              console.error('Add new network FAILED', addError);
            }
          }
          console.error('Switch network FAILED', switchError);
        }
      }

      toast.success(`${formatAddress(accounts[0])}, welcome.`, {
        autoClose: 1500,
      });
      setTimeout(() => window.location.reload(), 1500);
    } catch {
      toast.error('Login failed. Please refresh your browser.', {
        autoClose: 1500,
      });
    }
  };

  const handleConnect = (walletType) => {
    if (walletType === 'Metamask') loginMetamask();
    else if (walletType === 'Biport') loginBiport();
    else return;

    setShowConnectOptions(false);
  };

  const handleDisConnect = () => {
    toast.warn('Logout!', {
      autoClose: 1500,
    });
    setAccount('');
    setWalletType('');
    setNetworkId('');
    localStorage.removeItem('_user');
    localStorage.removeItem('_wallet');
    localStorage.removeItem('_chainId');

    setShowDisconnectOptions(false);
    setTimeout(() => window.location.reload(), 1500);
  };

  return (
    <Container>
      {!account ? (
        <WalletButton onClick={() => setShowConnectOptions(true)}>
          <GradientSectionTitle>Connect Wallet</GradientSectionTitle>
        </WalletButton>
      ) : walletType === 'Biport' ? (
        <WalletButton onClick={() => setShowDisconnectOptions(true)}>
          <ImgWrapper src={biportImage} />
          <GradientSectionTitle>{formatAddress(account)}</GradientSectionTitle>
        </WalletButton>
      ) : walletType === 'Metamask' ? (
        <WalletButton onClick={() => setShowDisconnectOptions(true)}>
          <ImgWrapper src={metamaskImage} />
          <GradientSectionTitle>{formatAddress(account)}</GradientSectionTitle>
        </WalletButton>
      ) : null}

      <CustomModal
        show={showConnectOptions}
        toggleModal={() => setShowConnectOptions(false)}
        title="Connect Wallet"
      >
        <SelectButton
          onClick={() => {
            handleConnect('Biport');
          }}
        >
          <ImgWrapper src={biportImage} />
          Biport
        </SelectButton>
        <SelectButton
          onClick={() => {
            handleConnect('Metamask');
          }}
        >
          <ImgWrapper src={metamaskImage} />
          Metamask
        </SelectButton>
      </CustomModal>

      <CustomModal
        show={showDisconnectOptions}
        toggleModal={() => setShowDisconnectOptions(false)}
        title="Connected"
      >
        <MyAddress>{formatAddress(account)}</MyAddress>
        <SelectButton onClick={handleDisConnect}>
          <BiWalletAlt size="30" />
          Disconnect
        </SelectButton>
      </CustomModal>
    </Container>
  );
};

export default ConnectWallet;
