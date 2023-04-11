import {CryptoTools, generateMnemonic} from "./crypto-tools";

import * as paseto from 'paseto';
import {sha256} from "@cosmjs/crypto";
import {createToken, readToken} from "./tokens";
import * as moment from "moment";

describe('Tokens Tools', () => {




    it('sing and check', async () => {
        const ct = new CryptoTools();
        const privateKey = await ct.privateKeyFromSeed("bachelor spy list giggle velvet adjust impulse weasel blush grant hole concert");
        const publicKey = await ct.publicKeyFromPrivateKey(privateKey)
        const dataExpired = moment().add(14, "day").valueOf();
        const token = createToken({test: "test", expired: "" + dataExpired.valueOf()}, privateKey);
        const body = readToken(token, publicKey);
        console.log("GENERATED", body);
    });

});