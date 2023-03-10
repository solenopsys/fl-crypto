import * as bip39 from 'bip39';
import * as jwt from 'jsonwebtoken';




export function generateMnemonic() {
    return bip39.generateMnemonic();
}

export function genJwt(payload:any) {
    const privateKey = 'your_private_key_here';
    const token = jwt.sign(payload, privateKey, {algorithm: 'RS256'});
}