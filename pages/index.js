import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { contractAddress } from "../config";
import HelloWorld from "../artifacts/contracts/HelloWorld.sol/HelloWorld.json";
import useIsMounted from "./hooks/useIsMounted";

const Home = (props) => {
	console.log(props);

	const {address} = useAccount();
	const mounted = useIsMounted();

	return (
		<div>
			<ConnectButton/>
			{mounted ?
				address &&
					<p>My address is {address}</p> :
					null
			}
		</div>
	);
};

export const getServerSideProps = async () => {
	const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
	const contract = new ethers.Contract(contractAddress, HelloWorld.abi, provider);

	const message = await contract.getMessage();

	return {
		props: {
			currMessage: message,
		}
	}
};

export default Home;