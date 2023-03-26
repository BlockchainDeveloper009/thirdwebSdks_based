import { ConnectWallet, ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
// import{ useWeb3 } from "@3rdweb/hooks"
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { useEffect, useState } from "react";
import { NFT } from "@thirdweb-dev/sdk";
import {saveAs} from "file-saver";

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
  const contractaddress = ["0x8FbA827f81786b73D65652E0294F5Af70f645123", ""]
  const { contract } = useContract(
    "0xb413df01580659F671471956e9D2fAe989d1dcd3"
  );
  const { data: nft, isLoading, error } = useNFT(contract, "0");
  if (isLoading) return <div>Loading...</div>;
  if (error || !nft) return <div>NFT not found</div>;

  return <ThirdwebNftMedia metadata={nft.metadata} />;
  useEffect(() => {
        
    
    loadContract()
  
  },[hextcnt]);
  let imageUrl:any = ''
  let imageName:any = 'name'
  // const handleClick = (imageUrl, imageName)=>{
  //   let url = imageUrl
  //   saveAs(url, imageName);
  //  }
  // function buildSingleNftCard(nft:any) {
  //   return <span onClick={() => handleClick(nft?.metadata.image, nft?.metadata.name)}>Download</span>
  // }
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