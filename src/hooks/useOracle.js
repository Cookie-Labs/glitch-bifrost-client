import { useEffect, useState } from 'react';
import Web3 from 'web3';

const ORACLE_MANAGER_ADDR = process.env.REACT_APP_ORACLE_BIFROST_MAINNET;
const ORACLE_MANAGER_ABI = [
  {
    constant: true,
    inputs: [{ name: 'oid', type: 'bytes32' }],
    name: 'last_oracle_data',
    outputs: [{ name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

export default function useOracle() {
  const [BFC, setBFC] = useState(0);
  const [BIFI, setBIFI] = useState(0);
  const [ETH, setETH] = useState(0);
  const [BNB, setBNB] = useState(0);
  const [MATIC, setMATIC] = useState(0);
//   const [USDC, setUSDC] = useState(0);
//   const [USDT, setUSDT] = useState(0);

  useEffect(() => {
    async function getLastPrice() {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          'https://public-01.mainnet.thebifrost.io/rpc',
        ),
      );
      const OracleManagerContract = new web3.eth.Contract(
        ORACLE_MANAGER_ABI,
        ORACLE_MANAGER_ADDR,
        { from: process.env.REACT_APP_ADMIN_ADDR },
      );

      async function lastOracleData(oid) {
        const price = await OracleManagerContract.methods
          .last_oracle_data(oid)
          .call({ from: process.env.REACT_APP_ADMIN_ADDR });

        return Number(web3.utils.hexToNumberString(price)) / 10 ** 18;
      }

      lastOracleData(
        '0x0100010000000000000000000000000000000000000000000000000000000001',
      ).then((definedPrice) => {
        setBFC(definedPrice.toFixed(2));
      });

      lastOracleData(
        '0x0100010000000000000000000000000000000000000000000000000000000002',
      ).then((definedPrice) => {
        setBIFI(definedPrice.toFixed(2));
      });

      lastOracleData(
        '0x0100010000000000000000000000000000000000000000000000000000000004',
      ).then((definedPrice) => {
        setETH(definedPrice.toFixed(2));
      });

      lastOracleData(
        '0x0100010000000000000000000000000000000000000000000000000000000005',
      ).then((definedPrice) => {
        setBNB(definedPrice.toFixed(2));
      });

      lastOracleData(
        '0x0100010000000000000000000000000000000000000000000000000000000006',
      ).then((definedPrice) => {
        setMATIC(definedPrice.toFixed(2));
      });

    //   lastOracleData(
    //     '0x0100010000000000000000000000000000000000000000000000000000000008',
    //   ).then((definedPrice) => {
    //     setUSDC(definedPrice.toFixed(2));
    //   });

    //   lastOracleData(
    //     '0x010001000000000000000000000000000000000000000000000000000000000a',
    //   ).then((definedPrice) => {
    //     setUSDT(definedPrice.toFixed(2));
    //   });
    }

    getLastPrice();
  }, []);

  return { BFC, BIFI, ETH, BNB, MATIC };
}
