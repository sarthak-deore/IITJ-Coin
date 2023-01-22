require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.4.22",
  networks: {
    hardhat: {},
    testnet: {
      url: process.env.URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
