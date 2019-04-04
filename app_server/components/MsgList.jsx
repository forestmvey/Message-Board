const React = require('react');
const Message = require('./Message.jsx');

const MsgList = (props) => {
    console.log("MsgList currentUser = "+props.currentUser);
    
       return(
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col" className="w-25">
                        #(msg number)
                        </th>
                        <th scope="col" className="w-25">
                        Name
                        </th>
                        <th scope="col" className="w-50">
                        Message
                        </th>
                    </tr>
                </thead>
                <tbody>
                {props.messages.map( (message, index) =>
                     <Message key={message._id} message={message} currentUser={props.currentUser} index={index} editMsg={props.editMsgCallback} deleteMsg={props.deleteMsgCallback} />
                    // <tr key={message._id}>
                    //     <td>{index+1}</td>
                    //     <td>{message.owner}</td>
                    //     <td>{message.msg}</td>
                    // </tr>
                    )}
                </tbody>
            </table> 
       );
    }

module.exports = MsgList;