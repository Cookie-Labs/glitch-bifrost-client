 import { atom, selector } from 'recoil';

export const userAccount = atom({
  key: 'userState/userAccount',
  default: localStorage.getItem('_user'),
});

export const userWalletType = atom({
  key: 'userState/userWalletType',
  default: localStorage.getItem('_wallet'),
});

export const userNetworkId = atom({
  key: 'userState/userNetworkId',
  default: localStorage.getItem('_chainId'),
});

export const userState = selector({
  key: 'userState/currentUser',
  get: ({ get }) => {
    const account = get(userAccount);
    const walletType = get(userWalletType);
    const networkId = get(userNetworkId);

    return { account, walletType, networkId };
  },
});
