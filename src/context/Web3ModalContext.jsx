import React, { useEffect, useState } from "react";

import { ethers } from 'ethers'

import { contractABI, contractAddress } from '../utils/constant'
import { networkParams } from "../utils/networks";
import { toHex, truncateAddress } from "../utils/utils";
import Web3Modal from "web3modal";
import { providerOptions } from "../utils/providerOptions";

export const Web3ModalContext = React.createContext();




export const Web3ModalProvider = ({ children }) => {
    
    
    return (
        <Web3ModalContext.Provider value="this">
            {children}
        </Web3ModalContext.Provider>
    )
}

//   return (
//     <>
//       <Text position="absolute" top={0} right="15px">
//         If you're in the sandbox, first "Open in New Window" ⬆️
//       </Text>
//       <VStack justifyContent="center" alignItems="center" h="100vh">
//         <HStack marginBottom="10px">
//           <Text
//             margin="0"
//             lineHeight="1.15"
//             fontSize={["1.5em", "2em", "3em", "4em"]}
//             fontWeight="600"
//           >
//             Let's connect with
//           </Text>
//           <Text
//             margin="0"
//             lineHeight="1.15"
//             fontSize={["1.5em", "2em", "3em", "4em"]}
//             fontWeight="600"
//             sx={{
//               background: "linear-gradient(90deg, #1652f0 0%, #b9cbfb 70.35%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent"
//             }}
//           >
//             Web3Modal
//           </Text>
//         </HStack>
//         <HStack>
//           {!account ? (
//             <Button onClick={connectWallet}>Connect Wallet</Button>
//           ) : (
//             <Button onClick={disconnect}>Disconnect</Button>
//           )}
//         </HStack>
//         <VStack justifyContent="center" alignItems="center" padding="10px 0">
//           <HStack>
//             <Text>{`Connection Status: `}</Text>
//             {account ? (
//               <CheckCircleIcon color="green" />
//             ) : (
//               <WarningIcon color="#cd5700" />
//             )}
//           </HStack>

//           <Tooltip label={account} placement="right">
//             <Text>{`Account: ${truncateAddress(account)}`}</Text>
//           </Tooltip>
//           <Text>{`Network ID: ${chainId ? chainId : "No Network"}`}</Text>
//         </VStack>
//         {account && (
//           <HStack justifyContent="flex-start" alignItems="flex-start">
//             <Box
//               maxW="sm"
//               borderWidth="1px"
//               borderRadius="lg"
//               overflow="hidden"
//               padding="10px"
//             >
//               <VStack>
//                 <Button onClick={switchNetwork} isDisabled={!network}>
//                   Switch Network
//                 </Button>
//                 <Select placeholder="Select network" onChange={handleNetwork}>
//                   <option value="3">Ropsten</option>
//                   <option value="4">Rinkeby</option>
//                   <option value="42">Kovan</option>
//                   <option value="1666600000">Harmony</option>
//                   <option value="42220">Celo</option>
//                 </Select>
//               </VStack>
//             </Box>
//             <Box
//               maxW="sm"
//               borderWidth="1px"
//               borderRadius="lg"
//               overflow="hidden"
//               padding="10px"
//             >
//               <VStack>
//                 <Button onClick={signMessage} isDisabled={!message}>
//                   Sign Message
//                 </Button>
//                 <Input
//                   placeholder="Set Message"
//                   maxLength={20}
//                   onChange={handleInput}
//                   w="140px"
//                 />
//                 {signature ? (
//                   <Tooltip label={signature} placement="bottom">
//                     <Text>{`Signature: ${truncateAddress(signature)}`}</Text>
//                   </Tooltip>
//                 ) : null}
//               </VStack>
//             </Box>
//             <Box
//               maxW="sm"
//               borderWidth="1px"
//               borderRadius="lg"
//               overflow="hidden"
//               padding="10px"
//             >
//               <VStack>
//                 <Button onClick={verifyMessage} isDisabled={!signature}>
//                   Verify Message
//                 </Button>
//                 {verified !== undefined ? (
//                   verified === true ? (
//                     <VStack>
//                       <CheckCircleIcon color="green" />
//                       <Text>Signature Verified!</Text>
//                     </VStack>
//                   ) : (
//                     <VStack>
//                       <WarningIcon color="red" />
//                       <Text>Signature Denied!</Text>
//                     </VStack>
//                   )
//                 ) : null}
//               </VStack>
//             </Box>
//           </HStack>
//         )}
//         <Text>{error ? error.message : null}</Text>
//       </VStack>
//     </>
//   );

