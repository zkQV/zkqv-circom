#!/bin/bash

NUM_INPUTS=10

# Generate Inputs
npx hardhat run circuits/generate_inputs.js

# Compile the Circuit
cd circuits
circom zkqv.circom --r1cs --wasm --sym --c
snarkjs r1cs info zkqv.r1cs

# Setup
snarkjs groth16 setup zkqv.r1cs ../setup/powersOfTau28_hez_final_12.ptau ../setup/zkaa_final_12.zkey
snarkjs zkey export verificationkey ../setup/zkaa_final_12.zkey ../setup/verification_key.json
# snarkjs zkey verify zkqv.r1cs ../setup/powersOfTau28_hez_final_12.ptau ../setup/zkaa_final_12.zkey

# Create necessary directories if they do not exist
mkdir -p witnesses
mkdir -p proofs
mkdir -p ../test/data/zkqv
for i in $(seq -f "%03g" 0 $((NUM_INPUTS-1)))
do
    mkdir -p proofs/$i
done

# Iterate over all input files
for i in $(seq -f "%03g" 0 $((NUM_INPUTS-1)))
do
    # Calculate the witness
    cd zkqv_js
    node generate_witness.js zkqv.wasm ../data/$i/input.json ../witnesses/$i.wtns
    cd ..

    # Create the proof
    snarkjs groth16 prove ../setup/zkaa_final_12.zkey witnesses/$i.wtns proofs/$i/proof.json proofs/$i/public.json

    # Verify the proof
    # snarkjs groth16 verify ../setup/verification_key.json proofs/$i/public.json proofs/$i/proof.json

    echo $i done
done

# Export Solidity Verifier
snarkjs zkey export solidityverifier ../setup/zkaa_final_12.zkey ../contracts/verifier_zkqv.sol

# Iterate over all public and proof files
for i in $(seq -f "%03g" 0 $((NUM_INPUTS-1)))
do
    snarkjs zkey export soliditycalldata proofs/$i/public.json proofs/$i/proof.json > ../test/data/zkqv/$i.txt
done

# # Gas Test
# cd ..
# cat <<EOT > contracts/ZkqvGasHelper.sol
# // SPDX-License-Identifier: MIT

# pragma solidity >=0.5.0 <0.9.0;

# import {Groth16Verifier as Verifier} from "./verifier_zkqv.sol";

# contract ZkqvGasHelper is Verifier {
#     uint256 public gasUsed;

#     function verifyProofBenchmark(
#         uint[2] calldata _pA,
#         uint[2][2] calldata _pB,
#         uint[2] calldata _pC,
#         uint[2] calldata _pubSignals
#     ) external {
#         uint256 startGas = gasleft();
#         // bool res =
#         this.verifyProof(_pA, _pB, _pC, _pubSignals);
#         gasUsed = startGas - gasleft();

#         // require(res, "Fail to verify.");
#     }
# }
# EOT
# echo GAS_TEST
# npx hardhat test test/gas_test.js
