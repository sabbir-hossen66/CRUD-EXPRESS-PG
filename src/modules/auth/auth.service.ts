import { pool } from '../../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser=async(email:string, password:string)=>{
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const secret = config.jwtSecret || 'default_secret'; // Use the secret from environment variables or a default
    const token = jwt.sign({name:user.name,email:user.email},secret,{
        expiresIn: '7d'
    })
    console.log("Token generated:", token); // Log the generated token for debugging purposes
    return {user, token};
}

export const authServices ={
    loginUser
}