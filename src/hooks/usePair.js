import { useState, useEffect } from 'react';
import useWeb3 from './useWeb3';
import { PAIR_ABI } from './useABI';

const POLYGON_PAIR = process.env.REACT_APP_SWAP_PAIR_POLYGON_TEST_ADDR;
const MSG_SENDER = process.env.REACT_APP_ADMIN_ADDR;

export default function usePair() {
  const { web3 } = useWeb3();
  const [pair, setPair] = useState({});

  async function authenticateWithPolygon() {
    if (
      Object.keys(web3).length === 0 ||
      (await web3.eth.getChainId()) !== 80001
    )
      return false;
    return true;
  }

  useEffect(() => {
    async function auth() {
      if (await authenticateWithPolygon(web3)) {
        setPair(new web3.eth.Contract(PAIR_ABI, POLYGON_PAIR));
      }
    }

    auth();
  }, [web3]);

  const getReserves = async () => {
    if (pair == undefined) return;
    const { _reserve0, _reserve1, date } = await pair.methods
      .getReserves()
      .call({ from: MSG_SENDER });
    return { _reserve0, _reserve1 };
  };

  return { getReserves };
}
