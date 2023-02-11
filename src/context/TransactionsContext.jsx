import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { contractABI, contractAddress } from '../utils/constant'

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log(transactionsContract)
    return transactionsContract;
};

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    })
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [transactionCount, settransactionCount] = useState(localStorage.getItem('transactionCount'));
     const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}))
    }

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract();
                console.log(ethereum)
                const availableTransactions = await transactionsContract.getAllTransactions();

                const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));

                console.log(structuredTransactions);

                setTransactions(structuredTransactions);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
        console.log(error);
        }
    };
    
    const checkIfWalletIsConnected = async () => {
        try {

            if (!ethereum) return alert("Please install metamask");
    
            const accounts = await ethereum.request({ method: 'eth_accounts' });
    
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log(accounts)
                getAllTransactions();
            
            } else {
                console.log('No account found')
            }
            
        } catch (err) {
            throw new Error("No ethereum object.")
        }
    }

    const checkIfTransactionsExists = async () => {
        try {
        if (ethereum) {
            const transactionsContract = createEthereumContract();
            const currentTransactionCount = await transactionsContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", currentTransactionCount);
        }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (err) {
            console.log(err);

            throw new Error("No ethereum object.")
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) console.log("No ethereum object")
                const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount)

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setLoading(true)

            console.log(`Loading - ${transactionContract.hash}`)
            await transactionHash.wait()
            setLoading(false)
            console.log(`Success - ${transactionHash.hash}`)
            setLoading(false)

            const transactionCount = await transactionContract.getTransactionCount();
            settransactionCount(transactionCount.toNumber())
            window.location.reload()
        } catch (err) {
            console.log(err)

            throw new Error("No ethereum object")
        }
    }


    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExists();
    }, []);
    
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, sendTransaction, handleChange, transactions, loading, transactionCount }}>
            {children}
        </TransactionContext.Provider>
    ) 
}