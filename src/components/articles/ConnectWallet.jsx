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
// import { networks } from '@constants/networkInfo';
// import { useNavigate } from 'react-router-dom';

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
  background-color: ${colors.bgTertiary};
  width: 100%;
  height: 4rem;
  border-radius: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${colors.textPrimary};
  border: 1px solid ${colors.textPrimary};
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
    background-color: ${colors.bgWhite};
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
  color: ${colors.textPrimary};
`

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
  width: 100%;
  height: 3rem;
  padding: 0.4rem;
  font-size: 1.2rem;
  background-color: ${colors.bgPrimary};
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
    background-color: ${colors.bgTertiary};
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
  // const supportChainIds = Object.values(networks).map(
  //   (network) => network.chainId,
  // );

  const loginMetamask = async () => {
    if (!metamask) {
      toast.error('Metamask installation is required');
      window.open(
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      );
      return;
    }

    try {
      const accounts = await toast.promise(
        metamask.request({
          method: 'eth_requestAccounts',
        }),
        { pending: 'Interlocking metamask wallet...' },
        { closeButton: true },
      );
      const chainId = await metamask.request({ method: 'eth_chainId' });
      setAccount(accounts[0]);
      setWalletType('Metamask');
      setNetworkId(chainId);
      localStorage.setItem('_user', accounts[0]);
      localStorage.setItem('_wallet', 'Metamask');

      // for (let networkId of supportChainIds) {
      //   if (chainId === networkId) {
      //     return;
      //   }
      // }

      toast.success(`${formatAddress(accounts[0])}, welcome.`, {
        autoClose: 1500,
      });
    } catch {
      toast.error(
        'Login failed. Please turn off your browser and turn it on again.',
        {
          autoClose: 1500,
        },
      );
    }
  };

  const loginBiport = async () => {
    if (!biport) {
      toast.error('Biport installation is required');
      window.open(
        'https://chrome.google.com/webstore/detail/biport-wallet/mapbhaebnddapnmifbbkgeedkeplgjmf',
      );
      return;
    }

    try {
      const accounts = await toast.promise(
        biport.request({
          method: 'eth_requestAccounts',
        }),
        { pending: 'Interlocking biport wallet...' },
        { closeButton: true },
      );
      const chainId = await biport.request({ method: 'eth_chainId' });
      setAccount(accounts[0]);
      setWalletType('Biport');
      setNetworkId(chainId);
      localStorage.setItem('_user', accounts[0]);
      localStorage.setItem('_wallet', 'Biport');

      // for (let networkId of supportChainIds) {
      //   if (chainId === networkId) {
      //     return;
      //   }
      // }

      toast.success(`${formatAddress(accounts[0])}, welcome.`, {
        autoClose: 1500,
      });
    } catch {
      toast.error(
        'Login failed. Please turn off your browser and turn it on again.',
        {
          autoClose: 1500,
        },
      );
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
