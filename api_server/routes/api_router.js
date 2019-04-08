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

router.route('/msgs/:messageid')
.get(msgAPIController.getSingleMessage)
.put(msgAPIController.editMessage)
.delete(msgAPIController.deleteMessage);

// delete all messages
router.route("/msgs")
.delete(msgAPIController.deleteAllMessages);

module.exports = router;