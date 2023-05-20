import { useState, useEffect } from 'react';
import useWeb3 from './useWeb3';
import { FACTORY_ABI, ERC20_ABI } from './useABI';

const POLYGON_FACTORY = process.env.REACT_APP_SWAP_FACTORY_POLYGON_TEST_ADDR;
const BIFROST_FACTORY = process.env.REACT_APP_SWAP_FACTORY_BIFROST_TEST_ADDR;
const MSG_SENDER = process.env.REACT_APP_ADMIN_ADDR;

export default function useFactory() {
  const { web3 } = useWeb3();
  const [factory, setFactory] = useState({});

  async function authenticateWithPolygon() {
    if (
      Object.keys(web3).length === 0 ||
      (await web3.eth.getChainId()) !== 80001
    )
      return false;
    return true;
  }

  async function authenticateWithBifrost() {
    if (
      Object.keys(web3).length === 0 ||
      (await web3.eth.getChainId()) !== 49088
    )
      return false;
    return true;
  }

  useEffect(() => {
    async function auth() {
      if (await authenticateWithPolygon(web3)) {
        setFactory(new web3.eth.Contract(FACTORY_ABI, POLYGON_FACTORY));
      } else if (await authenticateWithBifrost(web3)) {
        setFactory(await new web3.eth.Contract(FACTORY_ABI, BIFROST_FACTORY));
      }
    }

    auth();
  }, [web3]);

  const getPair = async (address1, address2) => {
    if (factory == undefined) return;
    const address = await factory.methods
      .getPair(address1, address2)
      .call({ from: MSG_SENDER });

    return address;
  };

  return { getPair };
}
