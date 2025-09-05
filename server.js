const express = require('express');
const cors = require('cors');
const audioRoutes = require('./routes/audio');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/audio', audioRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
