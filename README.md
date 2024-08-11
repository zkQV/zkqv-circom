# zkQV

**zkQV** is a groundbreaking voting system designed to revolutionize blockchain governance by combining the power of Zero Knowledge Proofs (ZKP) with Quadratic Voting.

We aim to create a governance system that is secure, fair, and private, fostering trust and encouraging broader participation in blockchain communities.

- **Fairness:** Quadratic Voting ensures equal influence, limiting the dominance of wealthy individuals.
- **Privacy:** Zero Knowledge Proofs protect voter anonymity, making voting both secure and private.

## Contracts

- **Optimism**: [`0x134F801e50B24728b6301E4eAF0d905aBFef20bA`](https://optimism-sepolia.blockscout.com/address/0x134F801e50B24728b6301E4eAF0d905aBFef20bA)
- **Base**: [`0x4F6fD04df4f5C372b7B5A095e46fD908C02FC6D9`](https://base-sepolia.blockscout.com/address/0x4F6fD04df4f5C372b7B5A095e46fD908C02FC6D9)
- **Metal L2**: [`0x9e18A4867873c9b4310cf9F786A1cd2ec7Aa09cF`](https://testnet.explorer.metall2.com/address/0x9e18A4867873c9b4310cf9F786A1cd2ec7Aa09cF)

## Verify Examples

- **Optimism**: [`verify`](https://optimism-sepolia.blockscout.com/tx/0xba7edc37c7f03753d4fde8c805b535b96d2334425aef35d3d039d6ee54856d50)
- **Base**: [`verify`](https://base-sepolia.blockscout.com/tx/0x9cea0b5d6a4787ff6a77510207b133178a985dabd9ffe39ed4af79552619037d)
- **Metal L2**: [`verify`](https://testnet.explorer.metall2.com/tx/0x88ed8dc872256192082df1edea9a6901b6e0d6498a65a7a3593981c1e24386b9)

---

# 🔧 zkQV Circuit Setup and Testing

This repository contains a script for setting up and testing zk-SNARKs circuits using the Hardhat framework and SnarkJS.

## 🚀 Getting Started

Simply:

```bash
$ sh test.sh
```

Or,

1. **Generate Inputs**
   ```bash
   npx hardhat run circuits/generate_inputs.js
   ```

2. **Compile the Circuit**
   ```bash
   cd circuits
   circom zkqv.circom --r1cs --wasm --sym --c
   snarkjs r1cs info zkqv.r1cs
   ```

3. **Export Solidity Verifier**
   ```bash
   snarkjs zkey export solidityverifier ../setup/zkaa_final_12.zkey ../contracts/verifier_zkqv.sol
   ```
