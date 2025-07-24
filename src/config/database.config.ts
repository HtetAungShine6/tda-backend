// MONGODB_URI=mongodb+srv://htetaungshine211299:gDjuJNG5yPjFq438@tdadevcluster.v2cujhk.mongodb.net/
// MONGODB_NAME=TDADatabase
// JWT_SECRET=secret
// JWT_TOKEN_AUDIENCE=localhost:3000
// JWT_TOKEN_ISSUER=localhost:3000
// JWT_ACCESS_TOKEN_TTL=86400

import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    mongouri: process.env.MONGODB_URI || 'localhost',
    mongoname: process.env.MONGODB_NAME || 'mongo',
    jwtsecret: process.env.JWT_SECRET || 'jwt',
    jwttokenaudience: process.env.JWT_TOKEN_AUDIENCE || 'jwtaudience',
    jwttokenissuer: process.env.JWT_TOKEN_ISSUER || 'jwtissuer',
    jwtaccesstokenttl: process.env.JWT_ACCESS_TOKEN_TTL || '1000',
}));