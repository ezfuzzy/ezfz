const { Pool } = require("pg");
const bcrypt = require("bcrypt");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

// 데이터베이스 스키마 생성 함수
const createTables = async () => {
  const client = await pool.connect();
  try {
    // users 테이블
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(50) UNIQUE NOT NULL,
        email_verified BOOLEAN DEFAULT FALSE,
        password VARCHAR(100) NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    // scores 테이블
    await client.query(`
      CREATE TABLE IF NOT EXISTS scores (
        id SERIAL PRIMARY KEY,
        owner_id INTEGER NOT NULL REFERENCES users(id),
        opponent_id INTEGER NOT NULL REFERENCES users(id),
        game_id INTEGER NOT NULL,
        win_count INTEGER NOT NULL,
        lose_count INTEGER NOT NULL
      );
    `);

    // 초기 사용자 생성 (username: ezfz, password: gkdus0131)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("gkdus0131", salt);
    await client.query(
      "INSERT INTO users (username, email, password, email_verified) VALUES ($1, $2, $3, $4) ON CONFLICT (username) DO NOTHING",
      ["ezfz", "ezfz@ezfz.xyz", hashedPassword, false]
    );
  } finally {
    client.release();
  }
};

// 데이터베이스 초기화
createTables().catch((err) => console.error("Error creating tables", err));

module.exports = pool;
