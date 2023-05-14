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
    if (walletType === 'Biport') {
      biport.on('accountsChanged', handleBiportAccountChanged);
      biport.on('chainChanged', handleBiportNetworkChanged);
      return () => {
        biport.removeListener('accountsChanged', handleBiportAccountChanged);
        biport.removeListener('chainChanged', handleBiportNetworkChanged);
      };
    } else if (walletType === 'Metamask') {
      metamask.on('accountsChanged', handleMetamaskAccountChanged);
      metamask.on('chainChanged', handleMetamaskNetworkChanged);
      return () => {
        metamask.removeListener(
          'accountsChanged',
          handleMetamaskAccountChanged,
        );
        metamask.removeListener('chainChanged', handleMetamaskNetworkChanged);
      };
    } else return;

    function handleBiportAccountChanged(accounts) {
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
    };

    function handleMetamaskAccountChanged(accounts) {
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
    };

    function handleBiportNetworkChanged(chainId) {
      setNetworkId(chainId);
      localStorage.setItem('_chainId', chainId);
      toast.success('Your network has changed.', {
        autoClose: 1500,
      });
    };

    function handleMetamaskNetworkChanged(chainId) {
      setNetworkId(chainId);
      localStorage.setItem('_chainId', chainId);
      toast.success('Your network has changed.', {
        autoClose: 1500,
      });
    };
  }, [walletType, setAccount, setNetworkId, setWalletType, navigate]);

  return;
};

export default CheckWallet;
