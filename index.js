const express = require('express');
const cors = require('cors');

const app = express();
const router = require('./routes');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log('JSON Server is running')
})
