require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    goerly: {
      url: 'https://eth-goerli.alchemyapi.io/v2/tMa46UHUgdarfLImx6jrhT3ty7x4IbJ7' ,
      accounts: ['8fb8fd8072a471e8999616e01fecb637af7b890e8544cff7fc36187f6959b618']
    },
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/tMa46UHUgdarfLImx6jrhT3ty7x4IbJ7' ,
      accounts: ['8fb8fd8072a471e8999616e01fecb637af7b890e8544cff7fc36187f6959b618']
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: {
        mnemonic: "verify sense output trigger team capital digital one wife lyrics loop weird"
      }
    },
    ethereum: {
      url: "https://eth-mainnet.alchemyapi.io/v2/tMa46UHUgdarfLImx6jrhT3ty7x4IbJ7",
      accounts: ['8fb8fd8072a471e8999616e01fecb637af7b890e8544cff7fc36187f6959b618']
    }


  },
  paths: {
    sources: './src/hardhat-ethereum/contracts',
    tests:  './src/hardhat-ethereum/test',
    cache:  './src/hardhat-ethereum/cache',
    artifacts:  './src/hardhat-ethereum/artifacts'

  }
};
