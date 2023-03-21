import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
// import{ useWeb3 } from "@3rdweb/hooks"
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { useEffect, useState } from "react";
import { NFT } from "@thirdweb-dev/sdk";
const sdk = new ThirdwebSDK("mumbai");
  
const MyCollections: NextPage = () => {

  const [hextcnt, setHexCnt] = useState()

  async function loadContract(){
    const contract = await sdk.getContract("0x8FbA827f81786b73D65652E0294F5Af70f645123");
    //get metaData
// Address of the wallet to get the NFTs of
const address = 
["0x1d44EEDa66CFdD27189373d8B6d12eF9f549F3D5", 
"0xf821142CC270dAb63767cFAae15dC36D1b043348"];
const nfts = await contract.erc1155.getOwned(address[1]);
console.log(nfts)
//setHexCnt(nfts)


  }
  useEffect(() => {
        
    
    loadContract()
  
  },[hextcnt]);
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>

      <h1>test app</h1>
      {hextcnt && <p>Sales Recipient: "{hextcnt}"</p>}
      
      </main>
     
    </div>
  );
};



export default MyCollections;