const fs = require('fs');
const path = require('path');
// const snarkjs = require('snarkjs');
const wasm_tester = require('circom_tester').wasm;
const crypto = require('crypto');
const { poseidon1, poseidon2 } = require('poseidon-lite');
const { ethers } = require("hardhat");


let ROUNDS = 10;


const dataDir = path.join(__dirname, 'data');

function generateRandom127Bits() {
    const buffer = crypto.randomBytes(16);
    buffer[0] = buffer[0] & 0x7F;
    return buffer.toString('hex');
}

function generateRandom80Bits() {
    const buffer = crypto.randomBytes(10);
    buffer[0] = buffer[0] & 0x50;
    return buffer.toString('hex');
}


async function processRound(round, prev_root, address_amount_pid, randnum) {
    const input = {
        "prev_root": prev_root,
        "address_amount_pid": address_amount_pid,
        "randnum": randnum
    };

    const dirName = round.toString().padStart(3, '0');
    const dirPath = path.join(dataDir, dirName);
    if (!fs.existsSync(dirPath)) { fs.mkdirSync(dirPath); }
    const filePath = path.join(dirPath, 'input.json');
    fs.writeFileSync(filePath, JSON.stringify({
        "prev_root": input.prev_root.toString(),
        "address_amount_pid": input.address_amount_pid.toString(),
        "randnum": input.randnum.toString()
    }));

    const root = poseidon2([
        poseidon2([input.address_amount_pid.toString(), input.randnum.toString()]),
        input.prev_root.toString()
    ]);

    return { input, root };
}


async function main() {
    const inputs = [];
    const roots = [];
    let prev_root = poseidon1(["0"]);

    // Generation
    try {
        for (let round = 0; round < ROUNDS; round++) {
            const rand = BigInt('0x' + generateRandom127Bits()).toString();
            const amount = generateRandom80Bits();
            const signer = (await ethers.getSigners())[round];
            const address_amount_pid = signer.address + amount.padStart(20, '0') + (round.toString(16)).padStart(4, '0');
            // console.log(address_amount_pid);
            if ((address_amount_pid.length - 2) * 4 !== 256) {
                throw Error(`Invalid length. Expected 256 but ${(address_amount_pid.length - 2) * 4}`);
            }
            const result = await processRound(round, prev_root, BigInt(address_amount_pid).toString(), rand);
            console.log(result);
            inputs.push(result.input);
            prev_root = result.root;
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

main().catch(console.error);
