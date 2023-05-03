import {SeedClipper} from "./seed-crypt";



describe('Encrypt', () => {

    it('should encrypt and decrypt', async () => {
        const clipper = new SeedClipper('AES-CBC',  new Crypto() );
        const pass="blabla";
        const protectText = "Hello, world!";
        const encrypted = await clipper.encryptText(protectText, pass);
        expect(encrypted).not.toBe(protectText);
        const decryptText =  await clipper.decryptText(encrypted, pass);
        expect(protectText).toBe(decryptText);
    });
})