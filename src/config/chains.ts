import { CaipNetwork } from '@reown/appkit'
import { type Chain } from 'viem'

export const zamaDevnet = {
  id: 'eip155:9000',
  chainId: 9000,
  name: 'Zama Devnet',
  currency: 'ZAMA',
  rpcUrl: "https://devnet.zama.ai",
  explorerUrl: "https://explorer.devnet.zama.ai",
  chainNamespace: 'eip155',
} as const satisfies CaipNetwork

export const fhenixHelium = {
  id: 'eip155:8008135',
  chainId: 8008135,
  name: 'Fhenix Helium',
  currency: 'tFHE',
  rpcUrl: "https://api.helium.fhenix.zone",
  explorerUrl: "ttps://explorer.helium.fhenix.zone",
  chainNamespace: 'eip155',
} as const satisfies CaipNetwork