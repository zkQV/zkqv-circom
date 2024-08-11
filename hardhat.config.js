require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2 ** 32 - 1
      },
    },
  },

  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: 'https://sepolia.base.org',
        blockNumber: 13795621,
      },
      chainId: 84532,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },

    base: {
      url: 'https://base.llamarpc.com',
      chainId: 8453,
      accounts: [process.env.PRIVATE_KEY],
    },
    baseSepolia: {
      url: 'https://sepolia.base.org',
      chainId: 84532,
      accounts: [process.env.PRIVATE_KEY],
    },

    op: {
      url: 'https://optimism.llamarpc.com',
      chainId: 10,
      accounts: [process.env.PRIVATE_KEY],
    },
    opSepolia: {
      url: 'https://sepolia.optimism.io',
      chainId: 11155420,
      accounts: [process.env.PRIVATE_KEY],
    },

    metalTestnet: {
      url: 'https://testnet.rpc.metall2.com',
      chainId: 1740,
      accounts: [process.env.PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: {
      // Is not required by blockscout. Can be any non-empty string
      'opSepolia': "abc",
      'baseSepolia': "abc",
      'metalTestnet': "abc"
    },
    customChains: [
      {
        network: "opSepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://optimism-sepolia.blockscout.com/api",
          browserURL: "https://optimism-sepolia.blockscout.com/",
        }
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://base-sepolia.blockscout.com/api",
          browserURL: "https://base-sepolia.blockscout.com/",
        }
      },
      {
        network: "metalTestnet",
        chainId: 1740,
        urls: {
          apiURL: "https://testnet.explorer.metall2.com/api/",
          browserURL: "https://testnet.explorer.metall2.com/",
        }
      }
    ]
  },
  sourcify: {
    enabled: false
  },

  mocha: {
    timeout: 99999999,
  }
};
