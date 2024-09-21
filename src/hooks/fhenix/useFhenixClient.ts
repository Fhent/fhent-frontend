import { FhenixClient, } from 'fhenixjs';
import { useEthersProvider } from '../ethers/useEthersProvider';
import { fhenixHelium } from '@/config/chains';

const useFhenixClient = () => {
  const provider = useEthersProvider({ chainId: fhenixHelium.chainId });
  // @ts-expect-error - provider is not null
  const client = new FhenixClient({ provider });
  return client;
}

export default useFhenixClient;