export const networks = {
  // cypress mainnet
  cypress: {
    chainId: `0x${Number(8217).toString(16)}`,
    rpcUrls: ['https://public-node-api.klaytnapi.com/v1/cypress'],
    chainName: 'Klaytn Cypress',
    nativeCurrency: {
      name: 'Klaytn',
      symbol: 'KLAY',
      decimals: 18,
    },
    blockExplorerUrls: ['https://scope.klaytn.com/'],
  },

  // baobob testnet
  baobab: {
    chainId: `0x${Number(1001).toString(16)}`,
    rpcUrls: ['https://api.baobab.klaytn.net:8651'],
    chainName: 'Klaytn Baobab',
    nativeCurrency: {
      name: 'Klaytn',
      symbol: 'KLAY',
      decimals: 18,
    },
    blockExplorerUrls: ['https://baobab.scope.klaytn.com/'],
  },
};
