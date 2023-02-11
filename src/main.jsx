import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TransactionProvider } from './context/TransactionsContext'
import { Web3ModalProvider } from './context/Web3ModalContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
   
  <React.StrictMode> 
    <Web3ModalProvider>
      <TransactionProvider>
      
        <App />    
      </TransactionProvider>
    
    </Web3ModalProvider>
  </React.StrictMode> 
)
