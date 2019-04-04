const React = require('react');

const Message = (props) => {
        console.log("Message props user = " + props.currentUser + "props name = " + props.message.name);

        if(props.currentUser == props.message.name){
            return(
                <tr id={props._id}>
                     
                             <td>{props.index+1}</td>
                             <td>{props.message.name}</td>
                             <td>{props.message.msg}</td>
                             <button>click</button>
                 </tr>
            );
        }else{
            return(
                <tr id={props._id}>
                                <td>{props.index+1}</td>
                                <td>{props.message.name}</td>
                                <td>{props.message.msg}</td>
                    </tr>
            );
        }
}

module.exports = Message;