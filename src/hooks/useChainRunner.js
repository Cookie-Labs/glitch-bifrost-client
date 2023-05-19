import { WsV2 } from 'chainrunner-sdk';
import BigNumber from 'bignumber.js';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';

export default function useChainRunner() {
  const { walletType } = useRecoilValue(userState);
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
  }, [walletType]);

  async function implementBridge() {
    if (client !== null) {
      const response = await client.call(
        'Glitch.run.bridge', // bridge 서비스를 이용할 protocol의 ID
        undefined,
        'bifrostBridge',
        '0x0000000000000000000000000000000000000000',
        BigNumber(1),
        BigNumber(5),
        BigNumber(49088),
      );
      console.log(JSON.stringify(response.result, undefined, 2));
    } else {
      toast.error('Please log in first', {
        autoClose: 1500,
      });
    }
  }

  return { implementBridge };
}
