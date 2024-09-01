const REQUIRED_ENV_VARS = [
    'PORT', 'DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD',
    'DB_DATABASE', 'DB_SYNCHRONIZE', 'DB_LOGGING', 'ENTITIES_PATH', 'DB_TYPE'
];

export function validateEnvVars() {
    validateEnvVarsList(REQUIRED_ENV_VARS);
}

function validateEnvVarsList(envVarsList: string[]): void {
    envVarsList.forEach((envVar) => {
        validateEnvVar(envVar);
    });
}

function validateEnvVar(envVar: string): void {
    if (!process.env[envVar]) {
        throw new Error(`Environment variable ${envVar} is missing`); // ? TODO Logear
    }
}