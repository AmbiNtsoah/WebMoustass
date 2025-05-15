const db = require('../../db/mysql');

exports.create = async (username, hashedPassword) => {
  const sql = 'INSERT INTO users (username, password_hash) VALUES ( ?, ?)';
  await db.execute(sql, [username, hashedPassword]);
};

exports.findByEmail = async (username) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

exports.findAll = async () => {
  const [rows] = await db.execute('SELECT id, username, password_hash FROM users');
  return rows;
};