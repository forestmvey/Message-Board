const mongoose = require('mongoose');
const messageModel = mongoose.model('message');


// GET Request Handler
const getAllMessagesOrderedByLastPosted = (req, res) => {
    messageModel.find()
    .sort( {'_id': -1} )
    .exec( (err, messages) => {
        if(err) {
            res.status(404).json(err);
        }else{
            res.status(200).json(messages);
        }
    });
};

// POST Reqeust Handler
const addNewMessage = (req, res) => {
    messageModel.create( req.body, (err, message) => {
        if (err) {     
            console.log(err);
            res.status(400).json(err);
       } else {   
           console.log("addNewMessage req.user = " + JSON.stringify(req.user));
           res.status(201).json({"message" : message, "user" : req.user});   
        } 
    });
};

module.exports = {
    getAllMessagesOrderedByLastPosted, addNewMessage
}