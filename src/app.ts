import express from 'express';

import config from './config';
import initDB, { pool } from './config/db';
import loger from './middleware/logger';
import { userRoutes } from './modules/user/user.routes';
import { userServices } from './modules/user/user.service';
import { authRoutes } from './modules/auth/auth.routes';



const app = express();
initDB();


//perser
app.use(express.json());


app.get('/',loger, (req, res) => {
  res.send('Todo Backend get ready!');
});


app.use("/users",userRoutes)
app.use("/auth", authRoutes)

// app.post('/users', );

// app.get('/users', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM users');
//     return res.status(200).json({
//       success: true,
//       data: result.rows,
//       message: "Users retrieved successfully",
//     });
//   } catch (err: any) {
//     return res.status(500).json({
//       success: false,
//       message: err.message || "Internal Server Error",
//     });
//   }
// });

// app.get('/users/:id',);

// app.delete('/users/:id', );

// todos api'es
app.post('/todos', async (req, res) => {
  const { user_id, title } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO todos (user_id, title)
       VALUES ($1, $2)   RETURNING *`,
      [user_id, title]
    );

    return res.status(201).json({
      success: true,
      data: result.rows[0],
      message: "Todo created successfully",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos');
    return res.status(200).json({
      success: true,
      data: result.rows,
      message: "Todos retrieved successfully",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
});

app.use((req,res)=>{
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path
  })
})

export default app;