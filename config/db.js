const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test00",
  password: "sufuzzy",
  port: 5432,
});

// 데이터베이스 스키마 생성 함수
const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE,
        hashed_password BYTEA,
        salt BYTEA,
        name TEXT,
        email TEXT UNIQUE,
        email_verified BOOLEAN
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS federated_credentials (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        provider TEXT NOT NULL,
        subject TEXT NOT NULL,
        UNIQUE (provider, subject)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        owner_id INTEGER NOT NULL REFERENCES users(id),
        title TEXT NOT NULL,
        completed BOOLEAN
      );
    `);

    // 초기 사용자 생성 (username: ezfz, password: gkdus0131)
    const salt = crypto.randomBytes(16);
    const hashedPassword = crypto.pbkdf2Sync("gkdus0131", salt, 310000, 32, "sha256");
    await client.query(
      "INSERT INTO users (username, hashed_password, salt, email_verified) VALUES ($1, $2, $3, $4) ON CONFLICT (username) DO NOTHING",
      ["ezfz", hashedPassword, salt, false]
    );
  } finally {
    client.release();
  }
};

// 데이터베이스 초기화
createTables().catch((err) => console.error("Error creating tables", err));

module.exports = pool;
