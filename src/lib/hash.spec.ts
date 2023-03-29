import {genHash} from "./hash";


describe('Encrypt', () => {

    it('should encrypt', async () => {
       const hash = await genHash("bla2", "bla1")
        expect(hash).toBe("e64938fc6124b4dfa8a2f225cc4998df473cbd6710c364684a1f42f6257d8f8c");
    });
})