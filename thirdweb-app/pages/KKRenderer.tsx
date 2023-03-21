import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
// import{ useWeb3 } from "@3rdweb/hooks"
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { useEffect, useState } from "react";
const sdk = new ThirdwebSDK("mumbai");
  
const KKRenderer: NextPage = () => {
  
    const [hextcnt, setHexCnt] = useState("")

    
    async function loadContract(){
    
        const contract = await sdk.getContract("0x8FbA827f81786b73D65652E0294F5Af70f645123");
        //get metaData
        const metadata = await contract.metadata.get();
        console.log(metadata);
    
        
        const salesRecipient = await contract.sales.getRecipient();
            console.log(`salesRecipient = ${salesRecipient}`);
            //get a nft
            const tokenId = 3;
            const nft = await contract.erc1155.get(tokenId);
            console.log(nft)
      }
      useEffect(() => {
        
    
        loadContract()
      
      },[hextcnt]);

      

  return (
    <div className={styles.container}>
      <main className={styles.main}>

      
      {hextcnt && <p>Sales Recipient: "{hextcnt}"</p>}
      </main>
      
    </div>
  );
};


export default KKRenderer;