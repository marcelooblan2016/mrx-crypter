const {mrxCrypterDecryption} = require('../dist/index');

( async() => {
    /*
     * Decryption
     * >> provide the decoded qr from image
     * >>>>>>>>> decrypt decoded string with passphrase1
     * >>>>>>>>>>>>> base64decode
     */
    mrxCrypterDecryption.decryptNow({encryptedContent: null});
})();