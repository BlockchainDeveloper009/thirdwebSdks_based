import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
// import{ useWeb3 } from "@3rdweb/hooks"
// import { useWeb3 } from "@thirdweb-dev/auth";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { useEffect, useState } from "react";
const sdk = new ThirdwebSDK("mumbai");
const Home: NextPage =  () => {
  // const { address, chainId } = useWeb3()
  const [hextcnt, setHexCnt] = useState("")



  async function loadContract(){
    
    const contract = await sdk.getContract("0x8FbA827f81786b73D65652E0294F5Af70f645123");
    const count = await contract.erc1155.totalCount();


    console.log(`Total Supply:-- ${count}`);
    setHexCnt(count.toString())
    
  }
  useEffect(() => {
    

    loadContract()
  
  },[hextcnt]);


  return (
    <div className={styles.container}>
      <main className={styles.main}>

      <h1>Krump Mint Engine</h1>
      {hextcnt && <p>Total Supply: "{hextcnt}"</p>}
      

      </main>
      
    </div>
  );
};

export default Home;


