const { transcribeWithWhisper } = require('../utils/whisperClient');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE
});

exports.transcribeAudio = async (req, res) => {
  try {
    const filePath = req.file.path;
    const transcript = await transcribeWithWhisper(filePath);

    db.query(
      'INSERT INTO transcripts (filename, transcript) VALUES (?, ?)',
      [req.file.filename, transcript],
      (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ transcript });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Transcription failed' });
  }
};
