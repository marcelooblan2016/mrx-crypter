"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const cryptr_1 = __importDefault(require("cryptr"));
const qrcode_1 = __importDefault(require("qrcode"));
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
        let content = parameters.content;
        if (content == null) {
            content = readline_sync_1.default.question('Type the string to be encrypted:');
        }
        let base64Content = Buffer.from(content).toString('base64');
        let passPhrase = readline_sync_1.default.question('Passphrase: ', {
            hideEchoBack: true,
            mask: '*'
        });
        // console.log(Buffer.from(base64Content, 'base64').toString('ascii'))
        // console.log(base64Content);
        // console.log(passPhrase);
        const cryptr = new cryptr_1.default(passPhrase);
        const encryptedString = cryptr.encrypt(content);
        // console.log(encryptedString);
        // let decryptedString = cryptr.decrypt(encryptedString);
        // console.log(decryptedString);
        let segs = [
            { data: 'ABCDEFG', mode: 'alphanumeric' },
            { data: '0123456', mode: 'numeric' }
        ];
        qrcode_1.default.toFile('encrypted.png', encryptedString, {}, function (err) { if (err)
            throw err; });
        // let decryptedString = cryptr.decrypt(qrCodeString);
        // console.log(decryptedString);
        return true;
    }
}
exports.default = new Encryption;
