import {sha256} from "@cosmjs/crypto";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as secp256k1 from 'secp256k1';

export function createToken(payload: { [key: string]: string }, privateKey: Uint8Array): string {
    const body = new TextEncoder().encode(JSON.stringify(payload));
    const hash = sha256(body);
    const signature = secp256k1.ecdsaSign(hash, privateKey);
    console.log("LEN", signature.signature.length)
    return Buffer.from(signature.signature).toString('hex') + Buffer.from(body).toString('hex');
}


export function readToken(token: string, publicKey: Uint8Array): any {

    const fromHexSignature: Uint8Array = Uint8Array.from(Buffer.from(token.slice(0, 128), 'hex'));
    const fronHexBody: Uint8Array = Uint8Array.from(Buffer.from(token.slice(128), 'hex'));

    const hash = sha256(fronHexBody);

    const verified = secp256k1.ecdsaVerify(fromHexSignature, hash, publicKey);

    if (verified) {
        const payload = JSON.parse(new TextDecoder().decode(fronHexBody));
        const exppiredInMils= parseInt(payload["expired"]);
        if (payload["expired"] &&   exppiredInMils> new Date().getMilliseconds()) {
            return {verified: true, payload: payload}
        } else {
            return {verified: false, error: "expired"};
        }
    } else {
        return {verified: false, error: "signature"};
    }
}