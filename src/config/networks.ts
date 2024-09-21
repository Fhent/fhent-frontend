import { Network } from "@/types";

const networks: Network[] = [
  {
    name: 'Fhenix',
    icon: 'fhenix-logo.svg',
    color: '#ffffff',
    supported: true,
    tokens: [
      {
        symbol: 'FHEUSDC',
        icon: 'usdc-logo.svg',
      },
      { symbol: 'FHEWETH', icon: 'ethereum-logo.svg' },
    ],
  },
  {
    name: 'Zama',
    icon: 'zama-logo.png',
    color: '#ffd209',
    supported: true,
    tokens: [
      {
        symbol: 'FHEUSDC',
        icon: 'usdc-logo.svg',
      },
      { symbol: 'FHEWETH', icon: 'ethereum-logo.svg' },
    ],
  },
  {
    name: 'Optimism',
    icon: 'optimism-logo.svg',
    color: '#ff0420',
    supported: false,
    tokens: [
      { symbol: 'FHEWETH', icon: 'ethereum-logo.svg' },
      {
        symbol: 'FHEUSDC',
        icon: 'usdc-logo.svg',
      },
    ],
  },
  {
    name: 'Ethereum',
    icon: 'ethereum-logo.svg',
    color: '#ffffff',
    supported: false,
    tokens: [
      { symbol: 'FHEWETH', icon: 'ethereum-logo.svg' },
      {
        symbol: 'FHEUSDC',
        icon: 'usdc-logo.svg',
      },
    ],
  },
  {
    name: 'Arbitrum',
    icon: 'arbitrum-logo.svg',
    color: '#ffffff',
    supported: false,
    tokens: [
      { symbol: 'FHEWETH', icon: 'ethereum-logo.svg' },
      {
        symbol: 'FHEUSDC',
        icon: 'usdc-logo.svg',
      },
    ],
  },
  {
    name: 'Avax',
    icon: 'avax-logo.svg',
    color: '#e84142',
    supported: false,
    tokens: [
      { symbol: 'FHEWETH', icon: 'ethereum-logo.svg' },
      {
        symbol: 'FHEUSDC',
        icon: 'usdc-logo.svg',
      },
    ],
  },
];

export default networks;
