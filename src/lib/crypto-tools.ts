import * as bip39 from 'bip39';
import * as jose from 'jose'





export function generateMnemonic() {
    return bip39.generateMnemonic();
}

export async function genJwt(payload:any): Promise<string> {
    const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    const alg = 'HS256'

    const jwt = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer('urn:example:issuer')
        .setAudience('urn:example:audience')
        .setExpirationTime('2h')
        .sign(secret)

    return jwt
}