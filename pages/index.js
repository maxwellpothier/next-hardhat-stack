import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { contractAddress } from "../config";
import HelloWorld from "../artifacts/contracts/HelloWorld.sol/HelloWorld.json";
import useIsMounted from "./hooks/useIsMounted";

const Home = (props) => {
	const contractMessage = props.currMessage;

	const {address} = useAccount();
	const mounted = useIsMounted();

	const changeMessage = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, HelloWorld.abi, signer);

		try {
			console.log(address);
			await contract.setMessage("This is the new message");
		} catch (err) {
			console.log("ERROR OCCURRED: ", err);
		}

	};

	return (
		<div>
			<ConnectButton/>
			{mounted ?
				address &&
					<p>My address is {address}</p> :
					null
			}
			{contractMessage}
			<button onClick={changeMessage}>change message</button>
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