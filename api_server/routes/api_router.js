const express = require('express');
const router = express.Router();
const userAPIController = require('../controllers/user-api');
const msgAPIController = require('../controllers/msg-api');
const passport = require('passport');

router.post('/users', userAPIController.registerNewUser);
router.get('/users/login',
passport.authenticate('basic', {session: false }),
 userAPIController.loginUser);

router.route('/msgs')
.get(msgAPIController.getAllMessagesOrderedByLastPosted)
.post(passport.authenticate('basic', { session: false }),
msgAPIController.addNewMessage);

// update a message
router.route("/msgs/:messageid")
.put(msgAPIController.editMessage);

// delete one message
router.route("/msgs/:messageid")
.delete(msgAPIController.deleteMessage);

// delete multiple messages
router.route("/msgs")
.delete(msgAPIController.deleteAllMessages);

module.exports = router;