
const { ethers } = require("hardhat");
const { smock } = require("@defi-wonderland/smock");
const { expect } = require("chai");

describe("Example test", function () {
	it("Should test the contract with smock", async function () {
		const erc20Fake = await smock.fake("IERC20");

		const amount100 = ethers.BigNumber.from("100");
		const amount150 = ethers.BigNumber.from("150");

		const Example = await ethers.getContractFactory("Example");
		const exampleInstance = await Example.deploy(erc20Fake.address);

		erc20Fake.transfer.whenCalledWith(ethers.constants.AddressZero, amount100).returns(true);
		await expect(exampleInstance.transferAsset(ethers.constants.AddressZero, amount100)).not.reverted;

		erc20Fake.transfer.whenCalledWith(ethers.constants.AddressZero, amount150).returns(false);
		await expect(exampleInstance.transferAsset(ethers.constants.AddressZero, amount150)).revertedWith("Example: transfer failed");
	})
})