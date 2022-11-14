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

			});
			it("emits the MessageChanged event", async () => {

			});
		});

		describe("failure", async () => {
			it("reverts when non sender tries to change message", async () => {

			});
			it("reverts when sender sends an empty string", async () => {

			});
		});
	});
});