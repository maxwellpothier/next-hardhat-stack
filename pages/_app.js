import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import {infuraProvider} from "wagmi/providers/infura";
import {publicProvider} from "wagmi/providers/public";

const {chains, provider} = configureChains(
	[chain.goerli],
	[
		infuraProvider({
			apiKey: process.env.RPC_URL,
		}),
		publicProvider(),
	],
);

const {connectors} = getDefaultWallets({
	appName: "Hello World Messaging",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
})

const App = ({Component, pageProps}) => {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<Component {...pageProps}/>
			</RainbowKitProvider>
		</WagmiConfig>
	);
};

export default App;