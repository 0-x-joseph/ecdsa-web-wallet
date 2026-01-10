import * as secp from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";

const privateKey = secp.utils.randomPrivateKey();
console.log("Private Key:", toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
console.log("Public Key:", toHex(publicKey));

const address = toHex(keccak256(publicKey)).slice(-40);
console.log("Address: " + address);
