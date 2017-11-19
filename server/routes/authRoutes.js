const express = require('express');

const router = express.Router();

const db = require('../queries');


router.get('/users', db.getAllUsers);
router.get('/users/:id', db.getSingleUser);
// router.post('/users', db.createUser);
// router.put('/users/:id', db.updateUser);
// router.delete('/users/:id', db.removeUser);

module.exports = router;

