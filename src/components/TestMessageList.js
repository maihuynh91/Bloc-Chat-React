import React , {Component} from 'react';

class TestMessageList extends Component{
    constructor(props){
        super(props);
        this.state={
            messages: []
        }
        this.refMessage = this.props.messageListFirebase.database().ref('messages')
    }

    componentDidMount(){
        this.refMessage.on('child_added', snapshot => {
            const msg = snapshot.val();
            msg.key = snapshot.key;
            console.log("msg key: " + msg.key);
            this.setState({messages: this.state.messages.concat(msg)})
        })
    }
   
    render(){
        return(
            <div>
                  {this.props.showCurrentRoom}

            {this.state.messages.map((message) =>{
                if(this.props.showCurrentRoom === message.roomId){
                    return(
                        <div key = {message.key}>
                        <h1>{message.content}</h1>
                        <h1>{message.username}</h1>
                        <h1>{message.sentAt}</h1>
                      </div>
                    )
                }
            }
                )} 
            </div>
        )
    }
}

export default TestMessageList;