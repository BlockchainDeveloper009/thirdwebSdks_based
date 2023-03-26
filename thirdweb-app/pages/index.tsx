
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
// import{ useWeb3 } from "@3rdweb/hooks"
// import { useWeb3 } from "@thirdweb-dev/auth";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  ConnectWallet,
  useAddress,
  useLogin,
  useLogout,
  useUser,
} from "@thirdweb-dev/react";

const sdk = new ThirdwebSDK("mumbai");
const Home: NextPage =  () => {
  // const { address, chainId } = useWeb3()
  const address = useAddress();
  const { logout } = useLogout();
  const { user } = useUser();
  const [authMessage, setAuthMessage] = useState("N/A");
  const [subscriptionMessage, setSubscriptionMessage] = useState("N/A");

  const checkout = async () => {
    const res = await fetch ("/api/stripe/checkout", {
      method: "POST",
    });
    const session = await res.json();
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      throw new Error("Stripe publishable key not set");
    }

    const stripe = await loadStripe(publishableKey as string, {
      apiVersion: "2020-08-27",
    });
    await stripe?.redirectToCheckout({
      sessionId: session.id,
    });
  };

  const checkSubscription = async () => {
    const res = await fetch("/api/stripe/subscription", {
      method: "POST",
    });
    const message = await res.json();
    setSubscriptionMessage(message);
  };

  const authenticatedRequest = async () => {
    try {
      const response = await fetch("/api/validate", {
        method: "POST",
      });

      const data = await response.json();
      try {
        
        JSON.parse(data);
        setAuthMessage(data.message);
    }
    catch (error) {
        console.log('Error parsing JSON:', error, data);
    }

      
    } catch (error) {
      console.error(error);
    }
  };



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
      
      <h2>Wallet Connection - Frontend</h2>

{user ? (
  <button className={styles.mainButton} onClick={() => logout()}>
    Logout
  </button>
) : (
  <ConnectWallet />
)}

<p>Connected Address: {address || "N/A"}</p>

<h2>Authentication - Backend</h2>

{address ? (
  <div>
    <button className={styles.mainButton} onClick={authenticatedRequest}>
      Authenticate
    </button>

    <p>Logged In Address: {user ? user.address : "N/A"}</p>
    <p>Authentication: {authMessage}</p>
  </div>
) : (
  <p>Connect your wallet to access authentication.</p>
)}

<h2>Payments - Stripe</h2>

<button className={styles.mainButton} onClick={checkout}>
  Subscribe
</button>
<button
  className={styles.mainButton}
  onClick={checkSubscription}
  style={{ marginTop: "10px" }}
>
  Check Subscription
</button>
<p>Subscription: {subscriptionMessage}</p>
      </main>
      
    </div>
  );
};

export default Home;


