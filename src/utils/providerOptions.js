import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

export const providerOptions = {
    walletlink: {
        package: CoinbaseWalletSDK, // Required
        options: {
            appName: "Web 3 Modal Demo", // Required
            infuraId: import.meta.env.INFURA_KEY // Required unless you provide a JSON RPC url; see `rpc` below
        }
    },
    
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: import.meta.env.INFURA_KEY // required
        }
    }
};
