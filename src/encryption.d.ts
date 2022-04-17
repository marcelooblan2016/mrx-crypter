export {};

declare global {
    namespace EncryptionNS {
        
        interface encryptionInterface {
            encryptNow(parameters: encryptNowParameters): boolean
        }
    
        interface encryptNowParameters {
            content: string | null,
        }
    }
    
}