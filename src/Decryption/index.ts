import readlineSync from 'readline-sync';
import Cryptr from 'cryptr'
import C from '../constants';

class Decryption implements DecryptionNS.decryptionInterface {
    constructor(options? : any) {}
    
    public decryptNow(parameters: DecryptionNS.decryptNowParameters): string | boolean {
        try {
            let encryptedContent = parameters.encryptedContent;
            if (encryptedContent == null) {
                encryptedContent = this.askEncryptedString();
            }
            // ask passphrase
            let passPhrase: string = this.askPassPhrase();
            const cryptr = new Cryptr(passPhrase);
            // decrypt with passphrase
            let decryptedContent = cryptr.decrypt(encryptedContent);
            // apply layer1 decryption
            decryptedContent = this.layer1Decryption(decryptedContent);
            // base64 decode
            const buff = Buffer.from(decryptedContent, 'base64');
            const decodedBase64 = buff.toString('utf-8');
            console.log(`Decoded: ${decodedBase64}`);
            return decodedBase64;
        } catch (error) {
            console.log("Invalid combination");
            return false;
        }
    }
    /*
     * layer1 decryption
     * @params: {content: *}
     * @returns <string>
     */
    public layer1Decryption(content: string): string
    {
        let cryptrLayer1 = new Cryptr(C.mrx_crypter);
        return cryptrLayer1.decrypt(content);
    }

    public askEncryptedString(): string
    {
        return readlineSync.question('Type the encrypted string:');
    }

    public askPassPhrase(): string
    {
        return readlineSync.question('Passphrase: ', {
            hideEchoBack: true,
            mask: '*'
        });
    }
}
export default new Decryption