import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import useIsMounted from "./hooks/useIsMounted";

const Home = () => {
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

export default Home;