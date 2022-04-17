
import readlineSync from 'readline-sync';
import Cryptr from 'cryptr'
import qrcode from 'qrcode'

class Encryption implements EncryptionNS.encryptionInterface  {
    constructor(options? : any) {}
    /*
     * encrypt the given string
     * base64encode, encrypt with passphrase, convert encrypted string into qr
     * save it as a file image
     * @params: {content: *}
     * @returns <boolean>
     */
    public encryptNow(parameters: EncryptionNS.encryptNowParameters): boolean {
        let content = parameters.content;
        if (content == null) {
            content = readlineSync.question('Type the string to be encrypted:');
        }
        let base64Content = Buffer.from(content!).toString('base64');
        let passPhrase: string = readlineSync.question('Passphrase: ', {
            hideEchoBack: true,
            mask: '*'
        });
        // console.log(Buffer.from(base64Content, 'base64').toString('ascii'))
        // console.log(base64Content);
        // console.log(passPhrase);
        const cryptr = new Cryptr(passPhrase);
        const encryptedString = cryptr.encrypt(content);
        // console.log(encryptedString);
        // let decryptedString = cryptr.decrypt(encryptedString);
        // console.log(decryptedString);

        let segs = [
            { data: 'ABCDEFG', mode: 'alphanumeric' },
            { data: '0123456', mode: 'numeric' }
        ]
        
        qrcode.toFile(
            'encrypted.png', 
            encryptedString,
            {},
            function (err: any) {if (err) throw err;}
        );

        // let decryptedString = cryptr.decrypt(qrCodeString);
        // console.log(decryptedString);

        return true;
    }
}

export default new Encryption