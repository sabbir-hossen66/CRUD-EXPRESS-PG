import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join(process.cwd(),".env")});
const config ={
    port: process.env.PORT || 8080,
    connectionString: process.env.CONNECTION_STR,
    jwtSecret: process.env.JWT_SECRET || 'default_secret' // Use a default secret if not set in environment variables
}
export default config;          
         