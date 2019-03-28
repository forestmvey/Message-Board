const express = require('express');
const router = express.Router();
const msgController = require('../controllers/msg');

router.get('/', msgController.getMessages);

module.exports = router;