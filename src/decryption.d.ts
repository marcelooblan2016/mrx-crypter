export {};

declare global {
    namespace DecryptionNS {

        interface decryptionInterface {
            decryptNow(parameters: decryptNowParameters): string | boolean
            layer1Decryption(content: string): string
            askEncryptedString(): string
            askPassPhrase(): string
        }
    
        interface decryptNowParameters {
            encryptedContent: string,
        }
    }
    
}