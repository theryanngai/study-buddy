const express = require('express');
const router = express.Router();

/* GET api listing */
router.get('/', (req, res, next) => {
  res.send('api works dude');
});

module.exports = router;
