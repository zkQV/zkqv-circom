
const { ethers } = require("hardhat");
const snarkjs = require("snarkjs");
const fs = require("fs");

const directory = "./test/data/zkqv/";

async function gasCalculation(gasUsed) {
  const numbers = gasUsed.map(Number);

  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  const sum = numbers.reduce((a, b) => a + b, 0);
  const avg = sum / numbers.length;

  numbers.sort((a, b) => a - b);
  // const mid = Math.floor(numbers.length / 2);
  // const median = numbers.length % 2 !== 0 ? numbers[mid] : (numbers[mid - 1] + numbers[mid]) / 2;
  const variance = numbers.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / numbers.length;
  const stdDev = Math.sqrt(variance);

  // Log the results
  console.log(`Min: ${min}`);
  console.log(`Max: ${max}`);
  console.log(`Average: ${avg}`);
  // console.log(`Median: ${medianBigInt}`);
  console.log(`Standard Deviation: ${stdDev} (sqrt(${variance}))`);
}

async function main() {
  const deployer = (await ethers.getSigners())[0];
  console.log(`Deployer: ${deployer.address}, ${await ethers.provider.getBalance(deployer.address)}`);

  const verifier = await ethers.getContractAt("ZkqvGasHelper",
    "0x9e18A4867873c9b4310cf9F786A1cd2ec7Aa09cF"
  );
  await verifier.waitForDeployment();
  console.log(`Verifier: ${await verifier.getAddress()}`);

  const proofs = [];
  const prooflist = fs.readdirSync(directory);
  prooflist.forEach(function (f) {
    const calldata = fs.readFileSync(directory + f, "utf-8");
    const validJson = `[${calldata}]`;
    const calldataArray = JSON.parse(validJson);
    proofs.push(calldataArray);
  });

  let gasUsed = [];
  for (let proof of proofs) {
    const [pA, pB, pC, pubSignals] = proof;

    const view = await verifier.verifyProof(pA, pB, pC, pubSignals);
    console.log(`Result: ${view}`);

    const tx = await verifier.verifyProofBenchmark(pA, pB, pC, pubSignals);
    const res = await tx.wait();
    // console.log(`Gas used: ${await verifier.gasUsed()}`);
    // console.log(res);

    gasUsed.push(await verifier.gasUsed());

    break; // Just 1
  }

  await gasCalculation(gasUsed);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).then(() => {
  process.exit();
});
