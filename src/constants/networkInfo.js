import BifrostIcon from '@assets/icons/Bifrost_Icon.png';
import EthereumIcon from '@assets/icons/Ethereum_Icon.png';
import BSCIcon from '@assets/icons/BSC_Icon.png';
import KlaytnIcon from '@assets/icons/Klaytn_Icon.png';
import PolygonIcon from '@assets/icons/Polygon_Icon.png';
import AvalancheIcon from '@assets/icons/Avalanche_Icon.png';

export const networks = {
  bifrostMain: {
    chainId: `0x${Number(3068).toString(16)}`,
    rpcUrls: ['https://public-01.mainnet.thebifrost.io/rpc'],
    chainName: 'Bifrost Mainnet',
    nativeCurrency: {
      name: 'Bifrost',
      symbol: 'BFC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.mainnet.thebifrost.io/'],
  },
  bifrostTest: {
    chainId: `0x${Number(49088).toString(16)}`,
    rpcUrls: ['https://public-01.testnet.thebifrost.io/rpc'],
    chainName: 'Bifrost Testnet',
    nativeCurrency: {
      name: 'Bifrost',
      symbol: 'BFC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.testnet.thebifrost.io/'],
  },
  ethereumMain: {
    chainId: `0x${Number(1).toString(16)}`,
    rpcUrls: ['https://eth-mainnet.public.blastapi.io'],
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://etherscan.io/'],
  },
  ethereumTest: {
    chainId: `0x${Number(5).toString(16)}`,
    rpcUrls: ['https://eth-goerli.public.blastapi.io'],
    chainName: 'Goerli',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://goerli.etherscan.io/'],
  },
  bnbMain: {
    chainId: `0x${Number(56).toString(16)}`,
    rpcUrls: ['https://bsc-mainnet.public.blastapi.io'],
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'Binance',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  bnbTest: {
    chainId: `0x${Number(97).toString(16)}`,
    rpcUrls: ['https://bsc-testnet.public.blastapi.io'],
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'Binance',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
  },
  avalancheMain: {
    chainId: `0x${Number(43114).toString(16)}`,
    rpcUrls: ['https://avalanche.public-rpc.com'],
    chainName: 'Avalanche C-Chain',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
    blockExplorerUrls: ['https://avascan.info/'],
  },
  avalancheTest: {
    chainId: `0x${Number(43113).toString(16)}`,
    rpcUrls: ['https://rpc.ankr.com/avalanche_fuji'],
    chainName: 'Avalanche Fuji Testnet',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.avascan.info/'],
  },
  klaytnMain: {
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
  klaytnTest: {
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
  polygonMain: {
    chainId: `0x${Number(137).toString(16)}`,
    rpcUrls: ['https://polygon-mainnet.public.blastapi.io'],
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'Polygon',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  polygonTest: {
    chainId: `0x${Number(80001).toString(16)}`,
    rpcUrls: ['https://polygon-testnet.public.blastapi.io'],
    chainName: 'Mumbai',
    nativeCurrency: {
      name: 'Polygon',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  },
};

export const networksIcons = {
  bifrostMain: {
    icon: BifrostIcon,
  },
  bifrostTest: {
    icon: BifrostIcon,
  },
  ethereumMain: {
    icon: EthereumIcon,
  },
  ethereumTest: {
    icon: EthereumIcon,
  },
  bnbMain: {
    icon: BSCIcon,
  },
  bnbTest: {
    icon: BSCIcon,
  },
  avalancheMain: {
    icon: AvalancheIcon,
  },
  avalancheTest: {
    icon: AvalancheIcon,
  },
  klaytnMain: {
    icon: KlaytnIcon,
  },
  klaytnTest: {
    icon: KlaytnIcon,
  },
  polygonMain: {
    icon: PolygonIcon,
  },
  polygonTest: {
    icon: PolygonIcon,
  },
};