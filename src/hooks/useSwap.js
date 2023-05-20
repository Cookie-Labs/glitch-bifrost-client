import { useState, useEffect } from 'react';
import useWeb3 from './useWeb3';
import { ERC20_ABI, ROUTER_ABI } from './useABI';
import useFactory from './useFactory';
import usePair from './usePair';

const POLYGON_FACTORY = process.env.REACT_APP_SWAP_FACTORY_POLYGON_TEST_ADDR;
const POLYGON_ROUTER = process.env.REACT_APP_SWAP_ROUTER_POLYGON_TEST_ADDR;
const POLYGON_ERC20 = process.env.REACT_APP_SWAP_ERC20_POLYGON_TEST_ADDR;
const POLYGON_WMATIC = process.env.REACT_APP_SWAP_WMATIC_POLYGON_TEST_ADDR;

const BIFROST_FACTORY = process.env.REACT_APP_SWAP_FACTORY_BIFROST_TEST_ADDR;
const BIFROST_ROUTER = process.env.REACT_APP_SWAP_ROUTER_BIFROST_TEST_ADDR;
const BIFROST_ERC20 = process.env.REACT_APP_SWAP_ERC20_BIFROST_TEST_ADDR;
const BIFROST_MATIC = process.env.REACT_APP_SWAP_MATIC_BIFROST_TEST_ADDR;
const BIFROST_WBFC = process.env.REACT_APP_SWAP_WBFC_BIFROST_TEST_ADDR;

const MSG_SENDER = process.env.REACT_APP_ADMIN_ADDR;

export default function useSwap() {
  const { web3 } = useWeb3();
  const [router, setRouter] = useState({});
  const { getPair } = useFactory();
  const { getReserves } = usePair();

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

  async function getRouterInfoByNetwork() {
    const address = await router.methods.factory().call({ from: MSG_SENDER });

    let ERC20;
    let ROUTER;
    let MATIC;
    if (address === POLYGON_FACTORY) {
      ERC20 = POLYGON_ERC20;
      ROUTER = POLYGON_ROUTER;
      MATIC = POLYGON_WMATIC;
    } else if (address === BIFROST_FACTORY) {
      ERC20 = BIFROST_ERC20;
      ROUTER = BIFROST_ROUTER;
      MATIC = BIFROST_MATIC;
    }
    return { ERC20, ROUTER, MATIC };
  }

  useEffect(() => {
    async function auth() {
      if (await authenticateWithPolygon(web3)) {
        setRouter(new web3.eth.Contract(ROUTER_ABI, POLYGON_ROUTER));
      } else if (await authenticateWithBifrost(web3)) {
        setRouter(await new web3.eth.Contract(ROUTER_ABI, BIFROST_ROUTER));
      }
    }

    auth();
  }, [web3]);

  /**
   * MAINNET : POLYGON, BIFROST
   * DESCRIPTION
   * 1) (POLYGON) ERC20 -> MATIC 변환하기 전 approve
   * 2) (BIFROST) ERC20 -> BFC 변환하기 전 approve
   */
  const approve = async (amount) => {
    if (router === undefined) return;

    const { ERC20, ROUTER, MATIC } = await getRouterInfoByNetwork();

    const ERC20Token = new web3.eth.Contract(ERC20_ABI, ERC20);

    const approvedAmount = web3.utils.toWei(amount.toString(), 'wei');
    const approvalTx = await ERC20Token.methods
      .approve(ROUTER, approvedAmount)
      .send({ from: MSG_SENDER })
      .catch((e) => {
        if (e.code === 4001) {
          console.log('user rejected the transaction');
        }
      });

    console.log('Approval successful');
  };

  /**
   * MAINNET : POLYGON, BIFROST
   * DESCRIPTION
   * 1) (POLYGON) ERC20 -> MATIC 변환
   * 2) (BIFROST) ERC20 -> BFC 변환
   */
  const swapExactTokensForETH = async (amount) => {
    try {
      if (router == undefined) return;
      await approve(amount);

      const { ERC20, ROUTER, MATIC } = await getRouterInfoByNetwork(router);

      const minEthAmount = web3.utils.toWei('0', 'wei');
      const path = [ERC20, MATIC];
      const deadline = Math.floor(Date.now() / 1000) + 300;

      const { _reserve0, _reserve1 } = await getReserves();
      const optimalAmount = await router.methods
        .getAmountOut(amount, _reserve0, _reserve1)
        .call({ from: MSG_SENDER });

      const swapTx = await router.methods
        .swapExactTokensForETH(
          web3.utils.toWei(amount.toString(), 'wei'),
          minEthAmount,
          path,
          MSG_SENDER,
          deadline,
        )
        .send({ from: MSG_SENDER, gas: 3000000 });

      console.log('optimal amount : ' + optimalAmount);
      console.log('Swap successful');

      return optimalAmount;
    } catch (error) {
      console.error('Swap failed', error);
    }
  };

  /**
   * MAINNET : BIFROST
   * DESCRIPTION : MATIC -> BFC -> ERC20 변환
   */
  const swapExactTokensForTokens = async (amount) => {
    try {
      if (router == undefined) return;
      await approve(amount);

      const { ERC20, ROUTER, MATIC } = await getRouterInfoByNetwork(router);
      const WBFC = BIFROST_WBFC;

      const minTokenAmount = web3.utils.toWei('0', 'wei');
      const path = [WBFC, ERC20];
      const deadline = Math.floor(Date.now() / 1000) + 300;

      const swapTx = await router.methods
        .swapExactTokensForTokens(
          amount,
          minTokenAmount,
          [MATIC, WBFC, ERC20],
          MSG_SENDER,
          deadline,
        )
        .send({ from: MSG_SENDER, gas: 3000000 });

      console.log('Swap successful');
    } catch (error) {
      console.error('Swap failed', error);
    }
  };

  return { approve, swapExactTokensForETH, swapExactTokensForTokens };
}
