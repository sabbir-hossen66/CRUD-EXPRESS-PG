import { pool } from '../../config/db';
import bcrypt from 'bcryptjs';

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

    return user;
}

export const authServices ={
    loginUser
}