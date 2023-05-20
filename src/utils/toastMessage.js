import { toast } from 'react-toastify';

export const walletConnectError = () => {
  toast.error('Need to connect wallet.', {
    autoClose: 2000,
  });
};

export const walletNotAdmin = () => {
  toast.error('This account is not a contract owner.', {
    autoClose: 2000,
  });
};
