import React, {Component} from 'react';

class CreateMessage extends Component{
    constructor(props){
        super(props);
        this.state={
            isFormOpen: false,
        }
    }

    openNewMessageBox(){
        this.setState({isFormOpen: true})
    }
    
    cancelNewMessage(){
        this.setState({isFormOpen: false})
    }

    renderNewMessageForm(){
        if(this.state.isFormOpen=== true){
            return(
              <form onSubmit = {(e)=> this.props.createNewMessage(e)}>
                <textarea rows='5' cols='30' placeholder='New Messages' 
                          onChange={(e)=>this.props.messageChanged(e)}
                          value={this.props.newMessage} />
                 <input type="submit" value="Submit" />
                 <input type= "submit" onClick={() => this.cancelNewMessage()} value="Cancel" />

              </form>
            )
        }
    }

    render(){
        return(
            <div>

              <button onClick = {(e)=>this.openNewMessageBox(e)}>New Message</button>
              {this.renderNewMessageForm()}

            </div>
        );
    }
}

export default CreateMessage;