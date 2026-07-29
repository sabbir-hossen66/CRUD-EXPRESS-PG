import express from 'express';

import config from './config';
import initDB, { pool } from './config/db';
import loger from './config/logger';
import { userRoutes } from './modules/user/user.routes';



const app = express();
const port = config.port;



initDB();


//perser
app.use(express.json());


app.get('/',loger, (req, res) => {
  res.send('Hello World333!');
});


app.use("/users",userRoutes)

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

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    else{ res.status(200).json({
      success: true,
      data: result.rows[0],
      message: "User retrieved successfully",
    }) }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
const { name, email, age, phone } = req.body;
  try {
    const result = await pool.query
    (`UPDATE users SET name = $1, email = $2, age = $3, phone = $4 WHERE id = $5 RETURNING *`, 
      [name, email, age, phone, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    else{ res.status(200).json({
      success: true,
      data: result.rows[0],
      message: "User updated successfully",
    }) }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
   console.log('result:', result);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    else{ res.status(200).json({
      success: true,
      data: result.rows[0],
      message: "User deleted successfully",
    }) }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
});

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});