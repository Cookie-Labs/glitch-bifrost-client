import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { formatAddress } from '@utils/parser';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAccount, userWalletType, userNetworkId } from '@states/userState';
import { useNavigate } from 'react-router-dom';

const metamask = window.ethereum;
const biport = window.biport;

const CheckWallet = () => {
  const setAccount = useSetRecoilState(userAccount);
  const [walletType, setWalletType] = useRecoilState(userWalletType);
  const setNetworkId = useSetRecoilState(userNetworkId);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: 왜 biport지갑은 잠금 감지가 안되는지 모르겠음.
    if (walletType === 'Biport') {
      biport.on('accountsChanged', handleAccountChanged);
      biport.on('chainChanged', handleNetworkChanged);
      return () => {
        biport.removeListener('accountsChanged', handleAccountChanged);
        biport.removeListener('chainChanged', handleNetworkChanged);
      };
    } else if (walletType === 'Metamask') {
      metamask.on('accountsChanged', handleAccountChanged);
      metamask.on('chainChanged', handleNetworkChanged);
      return () => {
        metamask.removeListener('accountsChanged', handleAccountChanged);
        metamask.removeListener('chainChanged', handleNetworkChanged);
      };
    } else return;

    function handleAccountChanged(accounts) {
      if (accounts.length === 0) {
        setAccount('');
        setWalletType('');
        setNetworkId('');
        localStorage.removeItem('_user');
        localStorage.removeItem('_wallet');
        localStorage.removeItem('_chainId');
        toast.warn('Your account has been locked. Please log in again.', {
          autoClose: 1500,
        });
      } else {
        toast.success(
          `The account has been changed to ${formatAddress(accounts[0])}`,
          {
            autoClose: 1500,
          },
        );
        setAccount(accounts[0]);
        localStorage.setItem('_user', accounts[0]);
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1500);
      }
    }

    function handleNetworkChanged(chainId) {
      setNetworkId(chainId);
      localStorage.setItem('_chainId', chainId);
      toast.success('Your network has changed.', {
        autoClose: 1500,
      });
      setTimeout(() => window.location.reload(), 1500);
    }
  }, [walletType, setAccount, setNetworkId, setWalletType, navigate]);

  return;
};

export default CheckWallet;
