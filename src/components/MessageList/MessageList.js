import React, { Component } from 'react';
import CreateMessage from './../CreateMessage/CreateMessage';
import Moment from 'react-moment';
import './MessageList.css';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: "",
        };
        this.MessageRef = this.props.messageListFirebase.database().ref('messages');
    }

    componentDidMount() {
        this.MessageRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat(message) })
        })
    }

    messageChanged(e) {
        this.setState({ newMessage: e.target.value })
    }

    createNewMessage(e) {
        e.preventDefault();
        if (this.state.newMessage !== "") {
            return (
                this.MessageRef.push({
                    username: this.props.user.displayName,
                    content: this.state.newMessage,
                    sentAt: this.props.messageListFirebase.database.ServerValue.TIMESTAMP,
                    roomId: this.props.currentRoom.key
                }),
                this.setState({ newMessage: "" })
            )
        };
    }

    render() {
        return (

            this.props.currentRoom ?
                <div>
                    <CreateMessage
                        renderNewMessageForm={this.renderNewMessageForm}
                        messageChanged={(e) => this.messageChanged(e)}
                        createNewMessage={(e) => this.createNewMessage(e)}
                        newMessage={this.state.newMessage}
                    />

                    <p className="chat-room">{this.props.currentRoom.name}</p>

                    {this.state.messages.map((message) => {
                        if (message.roomId === this.props.currentRoom.key) {
                            return (
                                <div key={message.key} className="message">
                                     <div className="message-main">
                                        <div className="bold">{message.username}</div>
                                        <div>{message.content}</div>
                                    </div>
                                    <div className="message-time">
                                        <span><Moment interval={0}>{message.sentAt}</Moment></span>
                                    </div>
                                </div>
                            )
                        }
                    }
                    )}

                </div> : null

        )
    }
}

export default MessageList;
