import React, {Component} from 'react';
import CreateMessage from './CreateMessage';
import Moment from 'react-moment';

class MessageList extends Component{
    constructor(props){
        super(props);
        this.state ={messages: [],
            newMessage: "",
        };
        this.MessageRef = this.props.messageListFirebase.database().ref('messages');
    }
   
    componentDidMount(){
        this.MessageRef.on('child_added', snapshot =>
        {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({messages: this.state.messages.concat(message)})
        })
    }
   
    messageChanged(e){
        this.setState({newMessage: e.target.value})
    }
   
    createNewMessage(e){
        e.preventDefault();
        if(this.state.newMessage !== ""){
            return(
                this.MessageRef.push({
                    username: "User Name: ",
                    content: this.state.newMessage,
                    sentAt: this.props.messageListFirebase.database.ServerValue.TIMESTAMP,
                    roomId: this.props.currentRoom
                    }),
                    this.setState({newMessage: ""})        
            )};        
    }
    

    render(){
        return(
            <div>
                 
        <CreateMessage 
            renderNewMessageForm = {this.renderNewMessageForm}
            messageChanged={(e)=>this.messageChanged(e)} 
            createNewMessage={(e)=>this.createNewMessage(e)} 
            newMessage={this.state.newMessage}
                    />

       {this.props.currentRoom}

        {this.state.messages.map((message) =>
            {if(message.roomId === this.props.currentRoom){return(
                <div key = {message.key}>
                <Moment add={{hours: 12 }}>{message.sentAt}</Moment>
                <p>{message.username}</p>
                <p>{message.content}</p>
                </div>  
            )}}             
            )}
                        
            </div>
        )
    }
}

export default MessageList;