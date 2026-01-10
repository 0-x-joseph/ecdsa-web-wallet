# ECDSA Secure Web Wallet

A **secure client-server web application** demonstrating the use of **Elliptic Curve Digital Signatures (ECDSA)** for authorizing cryptocurrency-like transfers between accounts. This project shows how to implement **public key cryptography** in a practical web application to ensure that only the rightful owner of an account can move funds.

This project was completed as part of the **Alchemy University Blockchain Developer Bootcamp**. It is a **centralized simulation** and does **not implement a blockchain**, but it demonstrates cryptography, signing, and secure transaction validation in a web app.

---

## 🔑 Features

* **Secure transactions:** Users can only transfer funds if they control the private key corresponding to their account.
* **Digital signatures:** Transactions are signed with ECDSA and verified by the server.
* **Ethereum-style addresses:** Account addresses are derived from public keys, similar to Ethereum.
* **Real-time balance updates:** Transfers update balances on the server in real time.
* **Client-server architecture:** React frontend and Node.js backend using Express.

---

## 📂 Project Structure

```
/client     -> React + Vite frontend
/server     -> Node.js + Express backend
```

---

## 🚀 Demo

![demo](demo.png)
*(Optional: Add a screenshot of your app here)*

---

## 🛠 Installation

### Clone the repository

```bash
git clone https://github.com/0-x-joseph/ecdsa-web-wallet.git
cd ecdsa-web-wallet
```

---

### Client

```bash
cd client
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

### Server

```bash
cd ../server
npm install
node index
# or, for auto-reloading:
# npm i -g nodemon
# nodemon index
```

Server runs on **port 3042** by default.

---

## 💡 How It Works

1. **Private keys** are generated for each account. From these, **public keys** and **addresses** are derived.
2. When a user wants to transfer funds:

   * The client signs the transaction with their private key.
   * The server receives the signed transaction.
   * The server **recovers the public key** from the signature.
   * The server validates that the recovered public key matches an account with sufficient balance.
3. Funds are transferred only if the signature is valid.

---

## ⚡ Key Scripts

### Generate a new account

```js
import * as secp from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";

const privateKey = secp.utils.randomPrivateKey();
console.log("Private Key:", toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
console.log("Public Key:", toHex(publicKey));

const address = toHex(keccak256(publicKey.slice(1))).slice(-40);
console.log("Address: 0x" + address);
```

---

### Sign a transaction

```js
import * as secp from "ethereum-cryptography/secp256k1.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";

function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}

const privateKey = "<your_private_key_here>";
const message = "Send 5 coins to 0xabc...";

const [signature, recoveryBit] = await secp.sign(hashMessage(message), privateKey, { recovered: true });

console.log("Signature:", toHex(signature));
console.log("Recovery Bit:", recoveryBit);
```

---

## 🔐 Security Notes

* Never store or expose private keys in the frontend in a production environment.
* This project **simulates** secure transactions using digital signatures, but it is **not a real cryptocurrency**.
* Replay attacks are possible if you send the same signed message twice; in production, you would need **nonces** or **timestamps** to prevent this.

---

## 🎯 What I Learned

* Implementing **ECDSA signing and verification** in a web app
* Using **Ethereum-style addresses** derived from public keys
* Handling client-server **signed transactions**
* Basics of **secure cryptocurrency-like systems**
* Practical experience from **Alchemy University Blockchain Developer Bootcamp**

---

## 📌 Extra Credit / Next Steps

* Implement a **nonce system** to prevent replay attacks
* Add a **user-friendly wallet generator** in the frontend
* Explore **multi-signature transactions**
* Extend to a **real blockchain-backed application**

---

## 🔗 References

* [Alchemy University Blockchain Developer Bootcamp](https://university.alchemy.com/)
* [Noble secp256k1 library](https://github.com/paulmillr/noble-secp256k1)
* [Ethereum Cryptography Library](https://www.npmjs.com/package/ethereum-cryptography)
* [ECDSA Overview](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)
