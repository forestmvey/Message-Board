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
           res.status(201).json({"message" : message });   
        } 
    });
};

// Edit request handler
const editMessage = (req, res) => {
    if(req.params && req.params.messageid){
        messageModel.findById(req.params.messageid).exec((err, message) => {
            if(err) {
                res.status(400).json(err);
                return;
            }else if(!message){
                    res.status(404).json({
                    "message" : "error finding message"
                });
            }else{
                message.updateOne({msg:req.body.msg}, err=>{
                    if(err){
                        return res.status(400).json(err);
                    }else{
                        res.status(200).json(message);
                    }
                });
            }
        });
    }else{
        res.status(400).json({
            "message" : "error updating message"
        });
    }
};

// Delete Message Handler
const deleteMessage = (req, res) => {
    if(req.params && req.params.messageid){
    messageModel.findById(req.params.messageid).exec((err, message) => {
        if(err) {
            res.status(400).json(err);
            return;
        }else if(!message){
                res.status(404).json({
                "message" : "no message found"
            });
        }else{
            message.remove(err => {
                if(err){
                    return res.status(400).json(err);
                }
                res.status(200).json(message);
            });
        }
    });
}else{
    res.status(400).json({
        "message" : "no message found"
    });
}
};

// Delete all messages handler
const deleteAllMessages = (req, res) => {
        messageModel.find().exec((err, message) => {
            if(err) {
                res.status(400).json(err);
                return;
            }else if(!message || message.length == 0){
                    res.status(404).json({
                    "message" : "no messages found"
                });
            }else{

                message.forEach(element => {
                    element.remove(err => {
                        if(err){
                            return res.status(400).json(err);
                        }
                });
                });
                res.status(200).json("All Messages Deleted");
            }
        });
};

module.exports = {
    getAllMessagesOrderedByLastPosted, addNewMessage, deleteMessage, editMessage, deleteAllMessages
}