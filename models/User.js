const pool = require("../config/db");
const bcrypt = require("bcrypt");

// 사용자 생성
const createUser = async (email, username, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const query = `
    INSERT INTO users (email, email_verified, password, username)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [email, false, hashedPassword, username];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// 이메일로 사용자 조회
const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1;";
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

// 사용자 ID로 사용자 조회
const getUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id = $1;";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
