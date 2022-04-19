export {};

declare global {
    namespace EncryptionNS {
        
        interface encryptionInterface {
            encryptNow(parameters: encryptNowParameters): string | boolean
            saveFile(encryptedString: string): boolean
            layer1Encryption(content: string): string
            base64Content(content: string): string
            askString(): string
            askPassPhrase(): string
        }
    
        interface encryptNowParameters {
            content: string | null,
        }
    }
    
}