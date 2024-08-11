const { ethers } = require("hardhat");

async function main() {
  const deployer = (await ethers.getSigners())[0];
  console.log(`Deployer: ${deployer.address}, ${await ethers.provider.getBalance(deployer.address)}`);

  const verifier = await ethers.deployContract("ZkqvGasHelper");
  await verifier.waitForDeployment();
  console.log(`Verifier: ${await verifier.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).then(() => {
  process.exit();
});
