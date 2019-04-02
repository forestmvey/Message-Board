const React = require('react');
const Message = require('./Message.jsx');

const MsgList = (props) => {
       return(
           <div>
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
                    // <tbody key={message._id}>
                     <Message key={message._id} message={props.message} email={props.email} index={index}/> 
                    // </tbody>
                    )}
                </tbody>
            </table> 
            </div>
       );
}

module.exports = MsgList;