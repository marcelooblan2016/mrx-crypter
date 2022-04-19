"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const cryptr_1 = __importDefault(require("cryptr"));
const constants_1 = __importDefault(require("../constants"));
class Decryption {
    constructor(options) { }
    decryptNow(parameters) {
        try {
            let encryptedContent = parameters.encryptedContent;
            if (encryptedContent == null) {
                encryptedContent = this.askEncryptedString();
            }
            // ask passphrase
            let passPhrase = this.askPassPhrase();
            const cryptr = new cryptr_1.default(passPhrase);
            // decrypt with passphrase
            let decryptedContent = cryptr.decrypt(encryptedContent);
            // apply layer1 decryption
            decryptedContent = this.layer1Decryption(decryptedContent);
            // base64 decode
            const buff = Buffer.from(decryptedContent, 'base64');
            const decodedBase64 = buff.toString('utf-8');
            console.log(`Decoded: ${decodedBase64}`);
            return decodedBase64;
        }
        catch (error) {
            console.log("Invalid combination");
            return false;
        }
    }
    /*
     * layer1 decryption
     * @params: {content: *}
     * @returns <string>
     */
    layer1Decryption(content) {
        let cryptrLayer1 = new cryptr_1.default(constants_1.default.mrx_crypter);
        return cryptrLayer1.decrypt(content);
    }
    askEncryptedString() {
        return readline_sync_1.default.question('Type the encrypted string:');
    }
    askPassPhrase() {
        return readline_sync_1.default.question('Passphrase: ', {
            hideEchoBack: true,
            mask: '*'
        });
    }
}
exports.default = new Decryption;
