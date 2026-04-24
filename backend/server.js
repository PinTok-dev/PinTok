const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Настройка подключения к Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Проверка подключения
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send('PinTok API работает и база подключена! 🚀 ' + result.rows[0].now);
  } catch (err) {
    res.status(500).send('Ошибка базы данных: ' + err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер PinTok на порту ${PORT}`);
});
