
import readlineSync from 'readline-sync';
import Cryptr from 'cryptr'
import qrcode from 'qrcode'
import C from '../constants';

class Encryption implements EncryptionNS.encryptionInterface  {
    constructor(options? : any) {}
    /*
     * encrypt the given string
     * base64encode, encrypt with passphrase, convert encrypted string into qr
     * save it as a file image
     * @params: {content: *}
     * @returns <boolean>
     */
    public encryptNow(parameters: EncryptionNS.encryptNowParameters): string | boolean {
        try {
            let content = parameters.content;
            // ask user if content is not provided
            if (content == null) {
                content = this.askString();
            }
            // ask passphrase
            let passPhrase: string = this.askPassPhrase();
            // base64 encoding
            let base64Content: string = this.base64Content(content!);
            // apply layer1 encryption
            let encryptedLayer1Content: string = this.layer1Encryption(base64Content);
            // user encryption with passphrase
            const cryptr = new Cryptr(passPhrase);
            const encryptedString = cryptr.encrypt(encryptedLayer1Content);
            console.log(`Encrypted String: ${encryptedString}`);
            // qr saved to file
            this.saveFile(encryptedString);
            return true;
        } catch (error) {
            return false;
        }
    }
    /*
     * generate qr & save it as png file
     * @params: {encryptedString: *}
     * @returns <boolean>
     */
    public saveFile(encryptedString: string): boolean
    {
        let fileName = 'encrypted.png';
        qrcode.toFile(
            fileName, 
            encryptedString,
            {},
            function (err: any) {if (err) throw err;}
        );
        console.log(`file image saved into: ${fileName}`);
        return true;
    }
    /*
     * initial encryption
     * @params: {content: *}
     * @returns <string>
     */
    public layer1Encryption(content: string): string
    {
        let cryptrLayer1 = new Cryptr(C.mrx_crypter);
        return cryptrLayer1.encrypt(content);
    }
    /*
     * base64 encoding
     * @params: {content: *}
     * @returns <string>
     */
    public base64Content(content: string): string
    {
        return Buffer.from(content!).toString('base64');
    }
    /*
     * ask the user to input the string
     * @returns <string>
     */
    public askString(): string
    {
        return readlineSync.question('Type the string to be encrypted:');
    }
    /*
     * ask the user to input the passphrase
     * @returns <string>
     */
    public askPassPhrase(): string
    {
        return readlineSync.question('Passphrase: ', {
            hideEchoBack: true,
            mask: '*'
        });
    }
}

export default new Encryption