require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

/** @type {import('hardhat/config').HardhatUserConfig} */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    robinhood: {
      url: process.env.ROBINHOOD_MAINNET_RPC || "https://rpc.mainnet.chain.robinhood.com",
      chainId: 4663,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    robinhoodTestnet: {
      url: process.env.ROBINHOOD_TESTNET_RPC || "https://rpc.testnet.chain.robinhood.com",
      chainId: 46630,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    // Robinhood Chain uses Blockscout, not Etherscan — verification goes
    // through the Blockscout API but hardhat-toolbox's `verify` task can
    // still target it via a custom chain entry.
    apiKey: {
      robinhood: "not-needed-for-blockscout",
      robinhoodTestnet: "not-needed-for-blockscout",
    },
    customChains: [
      {
        network: "robinhood",
        chainId: 4663,
        urls: {
          apiURL: "https://robinhoodchain.blockscout.com/api",
          browserURL: "https://robinhoodchain.blockscout.com",
        },
      },
      {
        network: "robinhoodTestnet",
        chainId: 46630,
        urls: {
          apiURL: "https://explorer.testnet.chain.robinhood.com/api",
          browserURL: "https://explorer.testnet.chain.robinhood.com",
        },
      },
    ],
  },
};
