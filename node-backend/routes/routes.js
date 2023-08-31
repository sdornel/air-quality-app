const { Router } = require('express')

const router = Router();

router.get('/', (req, res) => res.send('App is running!'))

router.get('/node-angular-test', (req, res) => res.send('node / angular link test successful'));

module.exports = router