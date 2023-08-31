const express = require('express');
const path = require('path');
const routes = require('./routes/routes.js');
const app = express();

const PORT = process.env.PORT || 3001;

// app.get('/', (req, res) => {
//     res.send('Hello, Express!');
// });

app.use(express.static(path.join(__dirname, './dist/angular-frontend')));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

