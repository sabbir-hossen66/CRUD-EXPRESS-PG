import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUser= async(payload:Record<string, unknown>)=> {
    const { name, email, password, age, phone } = payload;

    const hashedPassword = await bcrypt.hash(password as string, 10); // Hash the password

    return await pool.query(
      `INSERT INTO users (name, email, password, age, phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, email, hashedPassword, age, phone]
    );
    
}

const getUser = async () => {
    return await pool.query(`SELECT * FROM users`);
}

const getSingleUser = async ( id:string) =>{
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result;
}

const updateUser = async (id: string, name: string, email: string, age: number, phone: string) => {
    return await pool.query
        (`UPDATE users SET name = $1, email = $2, age = $3, phone = $4 WHERE id = $5 RETURNING *`, 
          [name, email, age, phone, id]);
};

const deleteUser = async(id:string) =>{
    return await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
}

export const userServices ={
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}
