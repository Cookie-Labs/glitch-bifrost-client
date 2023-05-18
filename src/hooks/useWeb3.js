import { useEffect, useState } from 'react';
import { userState } from '@states/userState';
import { useRecoilValue } from 'recoil';
import Web3 from 'web3';
import { toast } from 'react-toastify';

const metamask = window.ethereum;
const biport = window.biport;

export default function useWeb3() {
  const [web3, setWeb3] = useState({});
  const [isSigned, setIsSigned] = useState(false);
  const { account, walletType, networkId } = useRecoilValue(userState);

  useEffect(() => {
    if (walletType === 'Biport') {
      try {
        setWeb3(new Web3(biport));
      } catch (err) {
        console.log(err);
      }
    } else if (walletType === 'Metamask') {
      try {
        setWeb3(new Web3(metamask));
      } catch (err) {
        console.log(err);
      }
    } else return;
  }, [walletType, networkId]);

  async function signMessage(_msg) {
    if (web3 && account) {
      try {
        const signature = await web3.eth.personal.sign(web3.utils.utf8ToHex(_msg), account, '');
        const signingAccount = await web3.eth.personal.ecRecover(
          web3.utils.utf8ToHex(_msg),
          signature,
        );

        if (signingAccount === account) {
          setIsSigned(true);
        } else {
          setIsSigned(false);
        }
      } catch (signErr) {
        toast.error('Sign Failed', { autoClose: 1500 });
        setIsSigned(false);
      }
    }
  }

  return { web3, signMessage, isSigned };
}
