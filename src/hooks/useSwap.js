import { useEffect, useState } from 'react';
import Web3 from 'web3';
import useWeb3 from './useWeb3';
import { FACTORY_ABI, ERC20_ABI } from './useABI';

const POLYGON_ROUTER = process.env.REACT_APP_SWAP_ROUTER_POLYGON_TEST_ADDR;
const ERC20 = process.env.REACT_APP_SWAP_ERC20_POLYGON_TEST_ADDR;

async function authenticate(_web3) {
  if (
    Object.keys(_web3).length === 0 ||
    (await _web3.eth.getChainId()) !== 80001
  )
    return false;
  return true;
}

export default function useSwap() {
  const [allPairs, setAllPairs] = useState(0);
  const { web3 } = useWeb3();
  let polygonRouter;

  async function auth() {
    if (await authenticate(web3)) {
      polygonRouter = new web3.eth.Contract(FACTORY_ABI, POLYGON_ROUTER);
    }
  }

  auth();

  useEffect(() => {
    async function approve() {
      if (!(await authenticate(web3))) return;

      const ERC20Token = new web3.eth.Contract(ERC20_ABI, ERC20);

      ERC20Token.methods
        .approve(POLYGON_ROUTER, 100)
        .send({ from: process.env.REACT_APP_ADMIN_ADDR, value: 0 })
        .catch((e) => {
          if (e.code === 4001) {
            console.log('user rejected the transaction');
          }
        });
    }

    // async function addLiquidity() {
    //     if (Object.keys(web3).length === 0 || await web3.eth.getChainId() !== 80001) return;

    //     const polygonRouter = new web3.eth.Contract(
    //         POLYGON_ABI,
    //         POLYGON_ROUTER,
    //     );

    //     const accounts = await window.ethereum.request({
    //         method: 'eth_requestAccounts',
    //     });

    //     const length = await polygonRouter.methods
    //         .addLiquidity(
    //             "0x57714804960e11693B462934C4440C7DaD94515a",
    //             "0x5B67676a984807a212b1c59eBFc9B3568a474F0a",
    //             10,
    //             10,
    //             1,
    //             1,
    //             process.env.REACT_APP_ADMIN_ADDR,
    //             1000000000000,
    //         )
    //         .send({ from: process.env.REACT_APP_ADMIN_ADDR, value: 0 });

    //     setAllPairs(length);
    // }

    approve();
  }, [web3]);

  return { allPairs };
}
