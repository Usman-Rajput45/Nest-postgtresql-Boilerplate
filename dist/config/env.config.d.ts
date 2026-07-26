export type EnvConfig = {
    nodeEnv: string;
    port: number;
    db: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    seed: {
        adminEmail: string;
        adminPassword: string;
    };
};
export declare function loadEnvConfig(env?: NodeJS.ProcessEnv): EnvConfig;
