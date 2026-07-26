export declare function hashPassword(plainText: string): Promise<string>;
export declare function comparePassword(plainText: string, passwordHash: string): Promise<boolean>;
