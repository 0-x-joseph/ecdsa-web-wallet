import { useState } from "react";
import server from "./server";
import { MSG } from "./App.jsx";

import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes, hexToBytes } from "ethereum-cryptography/utils";

// Utility to hash a message
const hashMessage = (message) => keccak256(utf8ToBytes(message));

// Recover public key from signature + recovery bit
const recoverPublicKeyFromSignature = (message, signatureHex, recoveryBit) => {
  const messageHash = hashMessage(message);
  const signatureBytes = hexToBytes(signatureHex);
  return secp.recoverPublicKey(messageHash, signatureBytes, Number(recoveryBit));
};

function Wallet({ address, setAddress, balance, setBalance }) {
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");

  // Solve the address from signature
  const findAddress = async () => {
    try {
      if (!signature || recoveryBit === "") return;

      const pubKey = recoverPublicKeyFromSignature(MSG, signature, recoveryBit);
      const derivedAddress = toHex(pubKey).slice(-20);

      setAddress(derivedAddress);

      if (derivedAddress) {
        const {
          data: { balance: fetchedBalance },
        } = await server.get(`balance/${derivedAddress}`);
        setBalance(fetchedBalance);
      } else {
        setBalance(0);
      }
    } catch (err) {
      console.error("Failed to recover address:", err);
      setAddress("");
      setBalance(0);
    }
  };

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Signature
        <input
          placeholder="Type the signature of the message above"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
        />
      </label>

      <label>
        Recovery Bit
        <input
          placeholder="Type the recovery bit (0 or 1)"
          value={recoveryBit}
          onChange={(e) => setRecoveryBit(e.target.value)}
        />
      </label>

      <input
        type="button"
        className="button"
        value="Find Address"
        onClick={findAddress}
      />

      {address && (
        <label>
          Address: {address}
          <div className="balance">Balance: {balance}</div>
        </label>
      )}
    </div>
  );
}

export default Wallet;
