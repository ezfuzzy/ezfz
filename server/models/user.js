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

// 사용자 ID로 사용자 조회
const getUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id = $1;";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// 이메일로 사용자 조회
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const query = "SELECT * FROM users WHERE email = $1;";
    const { rows } = await pool.query(query, [email]);

    if (rows.length > 0) {
      return res.status(200).json({ available: false });
    } else {
      return res.status(200).json({ available: true });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// 사용자 이름으로 사용자 조회
const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const query = "SELECT * FROM users WHERE username = $1;";
    const { rows } = await pool.query(query, [username]);

    if (rows.length > 0) {
      return res.status(200).json({ available: false });
    } else {
      return res.status(200).json({ available: true });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getUserByUsername,
};
