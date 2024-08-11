# zkQV

**zkQV** is a groundbreaking voting system designed to revolutionize blockchain governance by combining the power of Zero Knowledge Proofs (ZKP) with Quadratic Voting.

We aim to create a governance system that is secure, fair, and private, fostering trust and encouraging broader participation in blockchain communities.

- **Fairness:** Quadratic Voting ensures equal influence, limiting the dominance of wealthy individuals.
- **Privacy:** Zero Knowledge Proofs protect voter anonymity, making voting both secure and private.

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
