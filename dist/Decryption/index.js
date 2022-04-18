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
                encryptedContent = readline_sync_1.default.question('Type the encrypted string:');
            }
            let passPhrase = readline_sync_1.default.question('Passphrase: ', {
                hideEchoBack: true,
                mask: '*'
            });
            const cryptr = new cryptr_1.default(passPhrase);
            const decryptedContent = cryptr.decrypt(encryptedContent);
            const buff = Buffer.from(decryptedContent, 'base64');
            const decodedBase64 = buff.toString('utf-8');
            return decodedBase64;
        }
        catch (error) {
            return false;
        }
    }
    layer1Decryption(content) {
        let cryptrLayer1 = new cryptr_1.default(constants_1.default.mrx_crypter);
        return cryptrLayer1.decrypt(content);
    }
}
exports.default = new Decryption;
