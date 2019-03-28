const React = require('react');

const MsgList = (props) => {
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
                    <tr key={message._id}>
                        <td>{index+1}</td>
                        <td>{message.name}</td>
                        <td>{message.msg}</td>
                    </tr>
                    )}
                </tbody>
            </table> 
       );
}

module.exports = MsgList;