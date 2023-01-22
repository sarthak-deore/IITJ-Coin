const hre = require("hardhat");

async function main() {
  const EIP20 = await hre.ethers.getContractFactory("EIP20");
  const hybrid1 = await EIP20.deploy();

  await hybrid1.deployed();

  console.log("Deployed to: ", hybrid1.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
