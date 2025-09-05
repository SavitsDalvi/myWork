const express = require('express');
const multer = require('multer');
const { transcribeAudio } = require('../controllers/transcribeController');

const router = express.Router();
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/upload', upload.single('audio'), transcribeAudio);
module.exports = router;
