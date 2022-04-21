# Mrx Crypter
A tool that helps encrypts/decrypts(passphrase required) data with precision and generate a qr code image

![image](https://drive.google.com/uc?export=view&id=1dDutNKqZtfIfIA9D5Fm5AK0He_a_aOuF)

## Usage
npm i mrx-crypter

## Encrypt Data
- The string to be encrypted will be asked
- Passphrase will be asked (Note: Do not forget as it will serve as a key to unlock/decrypt the encrypted string)
- Qr code image will be generated and saved within the {root -> encrypted.png} folder
```js
const {mrxCrypterEncryption} = require('mrx-crypter');

( async() => {
    mrxCrypterEncryption.encryptNow({content: null});
})();
```
## Decryp Data
- The encrypted data will be asked
- Passphrase will be asked
- Decrypted data will be displayed
```js
const {mrxCrypterDecryption} = require('mrx-crypter');

(async function() {
    mrxCrypterDecryption.decryptNow({encryptedContent: null});
})();
```
