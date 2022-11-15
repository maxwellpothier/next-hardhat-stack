const fs = require("fs");
const hre = require("hardhat");

const sleep = async (ms) => {
	return new Promise((res) => {
		setTimeout(() => {
			res();
		}, ms);
	});
}

const main = async () => {
	const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
	const helloWorld = await HelloWorld.deploy("Initial message here");

	console.log(`HelloWorld contract deployed to ${helloWorld.address}`);

	fs.writeFileSync("./config.js", `
export const contractAddress = "${helloWorld.address}"
export const ownerAddress = "${helloWorld.signer.address}"
	`);

	await sleep(45 * 1000);

	await hre.run("verify:verify", {
		address: helloWorld.address,
		constructorArguments: ["Initial message here"],
	});
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
