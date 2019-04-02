const React = require('react');

const Message = (props) => {
       return(
           <tr id={props._id}>
                
                    {/* <tr> */}
                        <td>{props.index+1}</td>
                        <td>{props.name}</td>
                        <td>{props.msg}</td>
                    {/* </tr> */}
                   
                
            </tr>
       );
}

module.exports = Message;