# 🔧 ZKQv Circuit Setup and Testing

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
