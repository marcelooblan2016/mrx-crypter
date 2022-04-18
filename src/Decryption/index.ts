import readlineSync from 'readline-sync';
import Cryptr from 'cryptr'
import C from '../constants';

class Decryption implements DecryptionNS.decryptionInterface {
    constructor(options? : any) {}
    
    public decryptNow(parameters: DecryptionNS.decryptNowParameters): string | boolean {
        try {
            let encryptedContent = parameters.encryptedContent;
            if (encryptedContent == null) {
                encryptedContent = readlineSync.question('Type the encrypted string:');
            }
    
            let passPhrase: string = readlineSync.question('Passphrase: ', {
                hideEchoBack: true,
                mask: '*'
            });
    
            const cryptr = new Cryptr(passPhrase);
            const decryptedContent = cryptr.decrypt(encryptedContent);
            const buff = Buffer.from(decryptedContent, 'base64');
            const decodedBase64 = buff.toString('utf-8');

            return decodedBase64;
        } catch (error) {
            return false;
        }
    }

    public layer1Decryption(content: string): string
    {
        let cryptrLayer1 = new Cryptr(C.mrx_crypter);
        return cryptrLayer1.decrypt(content);
    }
}
export default new Decryption