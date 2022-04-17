export {};

declare global {
    namespace DecryptionNS {

        interface decryptionInterface {
            decryptNow(parameters: decryptNowParameters): string | boolean
        }
    
        interface decryptNowParameters {
            encryptedContent: string,
        }
    }
    
}