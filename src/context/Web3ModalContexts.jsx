import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { contractABI, contractAddress } from '../utils/constant'
import { networkParams } from "../utils/networks";
import { toHex, truncateAddress } from "../utils/utils";
import Web3Modal from "web3modal";
// import { providerOptions } from "../utils/providerOptions";

// import WalletConnect from "@walletconnect/web3-provider";
// import CoinbaseWalletSDK from "@coinbase/wallet-sdk";



// const providerOptions = {
//   walletlink: {
//     package: CoinbaseWalletSDK, // Required
//     options: {
//       appName: "Web 3 Modal Demo", // Required
//       infuraId: import.meta.env.INFURA_KEY // Required unless you provide a JSON RPC url; see `rpc` below
//     }
//   },
//   walletconnect: {
//     package: WalletConnect, // required
//     options: {
//       infuraId: import.meta.env.BASE_URL.INFURA_KEY // required
//     }
//   }
// };


export const Web3ModalContext = React.createContext();

// const { ethereum } = window;

// const web3Modal = new Web3Modal({
//   cacheProvider: true, // optional
//   providerOptions // required
// });


// const createEthereumContract = () => {
//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const signer = provider.getSigner();
//     const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
//     console.log(transactionsContract)
//     return transactionsContract;
// };

// const getEthereumContract = () => {
//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const signer = provider.getSigner();
//     const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

//     console.log({
//         provider,
//         signer,
//         transactionContract
//     })
// }


export const Web3ModalProvider = ({ children }) => {

//     const [currentAccount, setCurrentAccount] = useState('')
//     const [loading, setLoading] = useState(false)
//     const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
//     const [transactionCount, settransactionCount] = useState(localStorage.getItem('transactionCount'));
//     const [transactions, setTransactions] = useState([]);

//     const [provider, setProvider] = useState();
//     const [library, setLibrary] = useState();
//     const [account, setAccount] = useState();
//     const [signature, setSignature] = useState("");
//     const [error, setError] = useState("");
//     const [chainId, setChainId] = useState();
//     const [network, setNetwork] = useState();
//     const [message, setMessage] = useState("");
//     const [signedMessage, setSignedMessage] = useState("");
//     const [verified, setVerified] = useState();

//     const handleChange = (e, name) => {
//         setFormData((prevState) => ({...prevState, [name]: e.target.value}))
//     }

//     const getAllTransactions = async () => {
//         try {
//             if (ethereum) {
//                 const transactionsContract = createEthereumContract();
//                 console.log(ethereum)
//                 const availableTransactions = await transactionsContract.getAllTransactions();

//                 const structuredTransactions = availableTransactions.map((transaction) => ({
//                 addressTo: transaction.receiver,
//                 addressFrom: transaction.sender,
//                 timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
//                 message: transaction.message,
//                 keyword: transaction.keyword,
//                 amount: parseInt(transaction.amount._hex) / (10 ** 18)
//             }));

//                 console.log(structuredTransactions);

//                 setTransactions(structuredTransactions);
//             } else {
//                 console.log("Ethereum is not present");
//             }
//         } catch (error) {
//         console.log(error);
//         }
//     };
    
//     const checkIfWalletIsConnected = async () => {

//         try {

//             if (!ethereum) return alert("Please install metamask");
    
//             const accounts = await ethereum.request({ method: 'eth_accounts' });
    
//             if (accounts.length) {
//                 setCurrentAccount(accounts[0]);
// console.log(accounts)
//                 getAllTransactions();
            
//             } else {
//                 console.log('No account found')
//             }
            
//         } catch (err) {
//             throw new Error("No ethereum object.")
//         }
//     }

//     const checkIfTransactionsExists = async () => {
//         try {
//         if (ethereum) {
//             const transactionsContract = createEthereumContract();
//             const currentTransactionCount = await transactionsContract.getTransactionCount();

//             window.localStorage.setItem("transactionCount", currentTransactionCount);
//         }
//         } catch (error) {
//             console.log(error);

//             throw new Error("No ethereum object");
//         }
//     };

//     const connectWallet = async () => {
//         try {
//             if (!ethereum) return alert("Please install metamask");

//             const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

//             setCurrentAccount(accounts[0]);
//             window.location.reload();
//         } catch (err) {
//             console.log(err);

//             throw new Error("No ethereum object.")
//         }
//     }

//       const connectToWallet = async () => {
//         try {
//             const provider = await web3Modal.connect();
//             const library = new ethers.providers.Web3Provider(provider);
//             const accounts = await library.listAccounts();
//             const network = await library.getNetwork();
//             setProvider(provider);
//             setLibrary(library);
//             if (accounts) setCurrentAccount(accounts[0]);
//             setChainId(network.chainId);
//         } catch (error) {
//             setError(error);
//         }
//     };

//      const handleNetwork = (e) => {
//         const id = e.target.value;
//         setNetwork(Number(id));
//     };

//     const handleInput = (e) => {
//         const msg = e.target.value;
//         setMessage(msg);
//     };

//     const switchNetwork = async () => {
//         try {
//             await library.provider.request({
//                 method: "wallet_switchEthereumChain",
//                 params: [{ chainId: toHex(network) }]
//             });
//         } catch (switchError) {
//             if (switchError.code === 4902) {
//                 try {
//                     await library.provider.request({
//                         method: "wallet_addEthereumChain",
//                         params: [networkParams[toHex(network)]]
//                     });
//                 } catch (error) {
//                     setError(error);
//                 }
//             }
//         }
//     };

//     const signMessage = async () => {
//         if (!library) return;
//         try {
//             const signature = await library.provider.request({
//                 method: "personal_sign",
//                 params: [message, account]
//             });
//             setSignedMessage(message);
//             setSignature(signature);
//         } catch (error) {
//             setError(error);
//         }
//     };

//     const verifyMessage = async () => {
//         if (!library) return;
//         try {
//             const verify = await library.provider.request({
//                 method: "personal_ecRecover",
//                 params: [signedMessage, signature]
//             });
//             setVerified(verify === account.toLowerCase());
//         } catch (error) {
//             setError(error);
//         }
//     };

//     const refreshState = () => {
//         setAccount();
//         setChainId();
//         setNetwork("");
//         setMessage("");
//         setSignature("");
//         setVerified(undefined);
//     };

//     const disconnect = async () => {
//         await web3Modal.clearCachedProvider();
//         refreshState();
//     };



//     const sendTransaction = async () => {
//         try {
//             if (!ethereum) console.log("No ethereum object")
//                 const { addressTo, amount, keyword, message } = formData;
//             const transactionContract = getEthereumContract();
//             const parsedAmount = ethers.utils.parseEther(amount)

//             await ethereum.request({
//                 method: 'eth_sendTransaction',
//                 params: [{
//                     from: currentAccount,
//                     to: addressTo,
//                     gas: '0x5208',
//                     value: parsedAmount._hex
//                 }]
//             });

//             const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
//             setLoading(true)

//             console.log(`Loading - ${transactionContract.hash}`)
//             await transactionHash.wait()
//             setLoading(false)
//             console.log(`Success - ${transactionHash.hash}`)
//             setLoading(false)

//             const transactionCount = await transactionContract.getTransactionCount();
//             settransactionCount(transactionCount.toNumber())
//             window.location.reload()
//         } catch (err) {
//             console.log(err)

//             throw new Error("No ethereum object")
//         }
//     }



//     useEffect(() => {
//         checkIfWalletIsConnected();
//         checkIfTransactionsExists();
//         //  if (web3Modal.cachedProvider) {
//         //     connectWallet();
//         // }
//     }, []);

    
    return (
        <Web3ModalContext.Provider value={{
            // connectWallet,
            // connectToWallet,
            // disconnect,
            // truncateAddress,
            // account,
            // handleNetwork,
            // network,
            // chainId,
            // switchNetwork,
            // message,
            // signMessage,
            // handleInput,
            // signature,
            // verifyMessage,
            // verified,
            // error,
            // currentAccount,
            // formData,
            // sendTransaction,
            // handleChange,
            // transactions,
            // loading,
            // transactionCount
        }}>
            {children}
        </Web3ModalContext.Provider>
    ) 
}