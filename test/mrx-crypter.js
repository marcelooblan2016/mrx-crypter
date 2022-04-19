const {mrxCrypterEncryption, mrxCrypterDecryption} = require('../dist/index');
const readlineSync = require('readline-sync');

( async() => {

    /*
     * Encryption
     * >> base64encode
     * >>>>> encrypt with passphrase1
     * >>>>>>>>> convert into qr image
     */
    // mrxCrypterEncryption.encryptNow({content: null});

    /*
     * Decryption
     * >> provide the decoded qr from image
     * >>>>>>>>> decrypt decoded string with passphrase1
     * >>>>>>>>>>>>> base64decode
     */

    mrxCrypterDecryption.decryptNow({encryptedContent: null});
})();