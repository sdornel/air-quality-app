const { Router } = require('express')

const router = Router();

router.get('/', (req, res) => res.send('App is running!'))

module.exports = router