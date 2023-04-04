const express = require('express');
const db = require('./config/connection'); // Holds the connection.
const routes = require('./routes');
const putUserThoughts = require('./utils/helper.js');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

db.once('open', () => {
    putUserThoughts(); // After the initialization, updates User's collections with its associated thoughts.
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});