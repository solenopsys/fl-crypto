import {sha256} from "@cosmjs/crypto";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as secp256k1 from 'secp256k1';



export function buf2hex(buffer:ArrayBuffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}

export function hex2buf(hex:string) {
    return new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
}

export function createToken(payload: { [key: string]: string }, privateKey: Uint8Array): string {
    const body = new TextEncoder().encode(JSON.stringify(payload));
    const hash = sha256(body);
    const signature = secp256k1.ecdsaSign(hash, privateKey);
    console.log("LEN", signature.signature.length)
    return buf2hex(signature.signature) + buf2hex(body);
}


export function readToken(token: string, publicKey: Uint8Array): any {


    const firstPart = token.slice(0, 128);
    const fromHexSignature: Uint8Array = hex2buf(firstPart);

    const secondPart = token.slice(128);
    const fronHexBody: Uint8Array = hex2buf(secondPart);

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