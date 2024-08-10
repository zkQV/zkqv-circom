pragma circom 2.1.9;

include "../node_modules/circomlib/circuits/poseidon.circom";

template ZKQV() {
    signal input prev_root;
    signal input address_amount_pid; // 160 || 80 || 16
    signal input randnum;

    signal node;    
    component node_poseidon = Poseidon(2);
    node_poseidon.inputs[0] <== address_amount_pid;
    node_poseidon.inputs[1] <== randnum;
    node <== node_poseidon.out;

    signal output root;
    component root_poseidon = Poseidon(2);
    root_poseidon.inputs[0] <== prev_root;
    root_poseidon.inputs[1] <== node;
    root <== root_poseidon.out;
}

component main {public [prev_root]} = ZKQV();
