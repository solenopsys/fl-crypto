import * as jose from 'jose'
import * as bip39 from 'bip39'
import * as secp256k1 from "secp256k1";
import { sha256 } from "crypto-hash";


export function generateMnemonic() {
    return bip39.generateMnemonic();
}





export async function generatePrivateKeyFromSeed(seedPhrase: string): Promise<Uint8Array> {
    const hash:ArrayBuffer = await sha256(seedPhrase, {outputFormat: 'buffer'});
    const privateKey = new Uint8Array(hash.slice(0, 32));
    while (!secp256k1.privateKeyVerify(privateKey)) {
        const reHash = await sha256(hash,{outputFormat: 'buffer'});
        privateKey.set( new Uint8Array(reHash.slice(0, 32)));
    }
    return privateKey;
}

export async function generatePublicKeyPrivate(privateKey: Uint8Array): Promise<Uint8Array> {
    return secp256k1.publicKeyCreate(privateKey);
}


export async function  genHash(password: string, login: string){
    const hash = crypto.subtle.digest('SHA-256', new TextEncoder().encode(password + login));
    const hexHash = Array.from(new Uint8Array(await hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    return hexHash;
}



export async function genJwt(payload: any, secret: Uint8Array,expTime:string): Promise<string> {
    const alg = 'HS256'

    const jwt = await new jose.SignJWT(payload)
        .setProtectedHeader({alg})
        .setIssuedAt()
        .setIssuer('urn:solenopsys:issuer')
        .setAudience('urn:solenopsys:audience')
        .setExpirationTime(expTime)//'2h'
        .sign(secret)

    return jwt
}

