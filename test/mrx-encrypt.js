const {mrxCrypterEncryption} = require('../dist/index');

( async() => {
    /*
     * Encryption
     * >> base64encode
     * >>>>> encrypt with passphrase1
     * >>>>>>>>> convert into qr image
     */
    mrxCrypterEncryption.encryptNow({content: null});
})();