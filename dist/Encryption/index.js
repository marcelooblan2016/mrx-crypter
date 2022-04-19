"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const cryptr_1 = __importDefault(require("cryptr"));
const qrcode_1 = __importDefault(require("qrcode"));
const constants_1 = __importDefault(require("../constants"));
class Encryption {
    constructor(options) { }
    /*
     * encrypt the given string
     * base64encode, encrypt with passphrase, convert encrypted string into qr
     * save it as a file image
     * @params: {content: *}
     * @returns <boolean>
     */
    encryptNow(parameters) {
        try {
            let content = parameters.content;
            // ask user if content is not provided
            if (content == null) {
                content = this.askString();
            }
            // ask passphrase
            let passPhrase = this.askPassPhrase();
            // base64 encoding
            let base64Content = this.base64Content(content);
            // apply layer1 encryption
            let encryptedLayer1Content = this.layer1Encryption(base64Content);
            // user encryption with passphrase
            const cryptr = new cryptr_1.default(passPhrase);
            const encryptedString = cryptr.encrypt(encryptedLayer1Content);
            console.log(`Encrypted String: ${encryptedString}`);
            // qr saved to file
            this.saveFile(encryptedString);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    /*
     * generate qr & save it as png file
     * @params: {encryptedString: *}
     * @returns <boolean>
     */
    saveFile(encryptedString) {
        let fileName = 'encrypted.png';
        qrcode_1.default.toFile(fileName, encryptedString, {}, function (err) { if (err)
            throw err; });
        console.log(`file image saved into: ${fileName}`);
        return true;
    }
    /*
     * initial encryption
     * @params: {content: *}
     * @returns <string>
     */
    layer1Encryption(content) {
        let cryptrLayer1 = new cryptr_1.default(constants_1.default.mrx_crypter);
        return cryptrLayer1.encrypt(content);
    }
    /*
     * base64 encoding
     * @params: {content: *}
     * @returns <string>
     */
    base64Content(content) {
        return Buffer.from(content).toString('base64');
    }
    /*
     * ask the user to input the string
     * @returns <string>
     */
    askString() {
        return readline_sync_1.default.question('Type the string to be encrypted:');
    }
    /*
     * ask the user to input the passphrase
     * @returns <string>
     */
    askPassPhrase() {
        return readline_sync_1.default.question('Passphrase: ', {
            hideEchoBack: true,
            mask: '*'
        });
    }
}
exports.default = new Encryption;
