const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const formRoutes = require('./routes/forum');
const replyRoutes = require('./routes/reply');
const docRoutes = require('./routes/docs');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/forums', formRoutes);
app.use('/api/forums', replyRoutes);
app.get('/',  docRoutes);

const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app
