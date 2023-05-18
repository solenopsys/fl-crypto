import {CryptoTools} from "./crypto-tools";





import * as moment from "moment";
import {CryptoWrapper} from "./crypto-wrapper";
import {Tokens} from "./tokens";

describe('Tokens Tools', () => {

    it('sing and check', async () => {
        const cw = new CryptoWrapper(new Crypto());
        const tokens = new Tokens(cw);
        const ct = new CryptoTools(cw);
        const privateKey = await ct.privateKeyFromSeed("bachelor spy list giggle velvet adjust impulse weasel blush grant hole concert");
        const publicKey = await ct.publicKeyFromPrivateKey(privateKey)
        const dataExpired = moment().add(14, "day").valueOf();
        const token =await tokens.createToken({test: "test", expired: "" + dataExpired.valueOf()}, privateKey);
        const body = await tokens.readToken(token, publicKey);
        console.log("GENERATED", body);
    });

});