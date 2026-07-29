import { pool } from "../../config/db";

const createUser= async(name: string, email: string, age: number, phone: string)=> {
    return await pool.query(
      `INSERT INTO users (name, email, age, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, age, phone]
    );
    
}
export const userServices ={
    createUser
}