const express = require('express');
const path = require('path');
const routes = require('./routes/routes.js');
const app = express();

const PORT = process.env.PORT || 3001;

// app.get('/', (req, res) => {
//     res.send('Hello, Express!');
// });

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 
               "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use(express.static(path.join(__dirname, './dist/angular-frontend')));

app.get('/api/angular-node-test', (req, res) => {
    res.json({ message: 
            'node / angular link test successful' });
});

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

