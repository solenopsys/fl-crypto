// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as secp256k1 from 'secp256k1';
import {sha256} from "@cosmjs/crypto";
import {entropyToMnemonic} from "@cosmjs/crypto/build/bip39";
import {buf2hex} from "./tokens";


export class CryptoTools {
    encoder = new TextEncoder();

    async privateKeyFromSeed(seedPhrase: string): Promise<Uint8Array> {
        const hash: ArrayBuffer = await sha256(this.encoder.encode(seedPhrase));
        const privateKey = new Uint8Array(hash.slice(0, 32));
        const hexHash = buf2hex(new Uint8Array(hash));
        console.log("HASH", hexHash)
        while (!secp256k1.privateKeyVerify(privateKey)) {
            const reHash = await sha256(new Uint8Array(hash));
            privateKey.set(new Uint8Array(reHash.slice(0, 32)));
        }
        return privateKey;
    }

    async publicKeyFromPrivateKey(privateKey: Uint8Array): Promise<Uint8Array> {
        return secp256k1.publicKeyCreate(privateKey);
    }
}

export function generateMnemonic() {
    const entropy = new Uint8Array(32)
    window.crypto.getRandomValues(entropy);
    return entropyToMnemonic(entropy)
}
