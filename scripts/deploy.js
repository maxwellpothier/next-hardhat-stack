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
