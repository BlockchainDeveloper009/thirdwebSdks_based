import type { AppProps } from "next/app";
import { ThirdwebProvider,ChainId, WalletConnector } from "@thirdweb-dev/react";
import { MagicConnector } from "@thirdweb-dev/react/evm/connectors/magic";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = ChainId.Mumbai;
// // Our Magic Link Wallet Connector configuration
// const magicLinkConnector = new MagicConnector({
//   options: {
//     apiKey: process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY as string,
//     rpcUrls: {
//       [ChainId.Mumbai]: "https://rpc-mumbai.maticvigil.com",
//     },
//   },
// });
// // Array of wallet connectors you want to use for your dApp.
// const connectors = [magicLinkConnector];
// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <ThirdwebProvider activeChain={activeChain}
//     authConfig={{
//       authUrl: "/api/auth",
//       domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
      
//     }}
//     walletConnectors={connectors}
//     >

    
//       <Component {...pageProps} />
//     </ThirdwebProvider>
//   );
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
    activeChain={activeChain}
      authConfig={{
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
        authUrl: "/api/auth",
      }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
