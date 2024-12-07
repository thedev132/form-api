const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const formRoutes = require('./routes/form');
const replyRoutes = require('./routes/reply');
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require("./swaggerConfig");
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/forms', formRoutes);
app.use('/api/forms', replyRoutes);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerConfig, { customCssUrl: CSS_URL })
);

const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app
