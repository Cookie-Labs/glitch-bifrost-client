import { WsV2 } from 'chainrunner-sdk';
import BigNumber from 'bignumber.js';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';

export default function useChainRunner() {
  const { walletType, networkId } = useRecoilValue(userState);
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (walletType === 'Biport') {
      const _client = new WsV2(
        'wss://api.glitch.chainrunner.io',
        window.biport,
        'GLITCH/KOREA',
        process.env.REACT_APP_CHAINRUNNER_API_KEY,
      );
      setClient(_client);
    } else if (walletType === 'Metamask') {
      const _client = new WsV2(
        'wss://api.glitch.chainrunner.io',
        window.ethereum,
        'GLITCH/KOREA',
        process.env.REACT_APP_CHAINRUNNER_API_KEY,
      );
      setClient(_client);
    } else return;
  }, [walletType, networkId]);

  async function approveBridge(
    _tokenAddressFromNetwork,
    _amount,
    _fromNetwork,
  ) {
    if (client !== null) {
      const response = await toast.promise(
        client.call(
          'Glitch.approve.bridge',
          undefined,
          'bifrostBridge',
          _tokenAddressFromNetwork,
          BigNumber(_amount),
          BigNumber(_fromNetwork),
        ),
        { pending: 'Please wait for the approve...' },
        { closeButton: true },
      );
      console.log(JSON.stringify(response.result, undefined, 2));
    } else {
      toast.error('Please log in first', {
        autoClose: 1500,
      });
    }
  }

  async function implementBridge(
    _tokenAddressFromNetwork,
    _amount,
    _fromNetwork,
    _toNetwork,
  ) {
    if (client !== null) {
      const response = await toast.promise(
        client.call(
          'Glitch.run.bridge',
          undefined,
          'bifrostBridge',
          _tokenAddressFromNetwork,
          BigNumber(_amount),
          BigNumber(137),
          BigNumber(3068),
        ),
        { pending: 'Please wait for the bridge...' },
        { closeButton: true },
      );
      console.log(JSON.stringify(response.result, undefined, 2));
    } else {
      toast.error('Please log in first', {
        autoClose: 1500,
      });
    }
  }

  return { approveBridge, implementBridge, client };
}
