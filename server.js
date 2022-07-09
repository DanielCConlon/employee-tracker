const express = require('express');
const db = require('./db/connection');


const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use api routes


// default response for any other request(Not found)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if(err) throw err;
    console.log('Database Connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});