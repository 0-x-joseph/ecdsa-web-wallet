import * as secp from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true }); // allow Ctrl+C

function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}

async function main() {
  const privateKey = prompt("Enter your private key: ", { echo: "*" });
  const message = prompt("Enter your message: ");

  const [signature, recoveryBit] = await secp.sign(
    hashMessage(message),
    privateKey,
    { recovered: true },
  );

  console.log("\nSignature:", toHex(signature));
  console.log("Recovery Bit:", recoveryBit);
}

main();
