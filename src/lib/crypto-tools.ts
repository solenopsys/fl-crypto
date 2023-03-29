import * as bip39 from 'bip39'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as secp256k1 from 'secp256k1';
import {sha256} from "@cosmjs/crypto";


export class CryptoTools{
    encoder = new TextEncoder();
    constructor() {
    }

    async privateKeyFromSeed(seedPhrase: string): Promise<Uint8Array> {
        const hash:ArrayBuffer = await sha256( this.encoder.encode(seedPhrase) );
        const privateKey = new Uint8Array(hash.slice(0, 32));
        while (!secp256k1.privateKeyVerify(privateKey)) {
            const reHash = await sha256(new Uint8Array(hash));
            privateKey.set( new Uint8Array(reHash.slice(0, 32)));
        }
        return privateKey;
    }

    async publicKeyFromPrivateKey(privateKey: Uint8Array): Promise<Uint8Array> {
        return secp256k1.publicKeyCreate(privateKey);
    }
}
export function generateMnemonic() {
    return bip39.generateMnemonic();
}
