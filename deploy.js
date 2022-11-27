const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const { abi, evm } = require("./compile");

const dotenv = require("dotenv");
dotenv.config();

const provider = new HDWalletProvider(process.env.MNE, process.env.INFURA);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[2]);

    const result = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
      .send({ gas: "1000000", from: accounts[2] });

    console.log("Contract deployed to", result.options.address);
  } catch (err) {
    console.log(err);
  }

  provider.engine.stop();
};

deploy();
