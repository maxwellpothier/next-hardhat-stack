const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("HelloWorld", async () => {
	const deployHelloWorldFixture = async () => {
		const [owner, otherAccount] = await ethers.getSigners();

		const HelloWorld = await ethers.getContractFactory("HelloWorld");
		const helloWorld = await HelloWorld.deploy("Initial message");

		return {helloWorld, owner, otherAccount};
	};

	describe("Deployment", async () => {
		it("successfully deploys the contract", async () => {
			const {helloWorld} = await loadFixture(deployHelloWorldFixture);

			const expectedMessage = "Initial message";
			const actualMessage = await helloWorld.getMessage();
			
			assert(expectedMessage === actualMessage, "Initial deploy failed");
		});
	});

	describe("set message", async () => {
		describe("success", async () => {
			it("changes the message", async () => {
				const {helloWorld} = await loadFixture(deployHelloWorldFixture);

				await helloWorld.setMessage("Setting new message");
				const expectedMessage = "Setting new message";
				const currMessage = await helloWorld.getMessage();

				assert(expectedMessage === currMessage, "Messages did not match");
			});
			it("emits the MessageChanged event", async () => {
				const {helloWorld} = await loadFixture(deployHelloWorldFixture);

				await expect(helloWorld.setMessage("Setting new message")).to.emit(helloWorld, "MessageChanged").withArgs("Setting new message");
			});
		});

		describe("failure", async () => {
			it("reverts when non sender tries to change message", async () => {
				const {helloWorld, otherAccount} = await loadFixture(deployHelloWorldFixture);

				await expect(helloWorld.connect(otherAccount).setMessage("Setting new message")).to.be.revertedWith("Caller must be the owner");
			});
			it("reverts when sender sends an empty string", async () => {
				const {helloWorld} = await loadFixture(deployHelloWorldFixture);

				await expect(helloWorld.setMessage("")).to.be.revertedWith("Empty string not allowed");
			});
		});
	});
});