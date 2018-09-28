import React, {Component} from 'react';
import './User.css';

class User extends Component{
    
    componentDidMount(){
        this.props.firebase.auth().onAuthStateChanged( firebaseUser => {
            if(!firebaseUser){
                firebaseUser={displayName:"Guest"}
            };
            this.props.setUser(firebaseUser);
            console.log(`Current user:  ${this.props.user?this.props.user.displayName:null}`)
        })
    }

    signIn(){
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider);
        console.log("Sign in");
    }

    signOut(){
        this.props.firebase.auth().signOut();
        console.log("sign out user: " + this.props.user.displayName)
    }


    
    render(){
        let button;
        if (this.props.user.displayName !== "Guest" ){
            button = <button  className="btn" onClick={()=> this.signOut()}>Sign Out</button>
        }else{
            button = <button  className="btn" onClick={()=> this.signIn()}> Sign In </button>
        }
        return(
           <div className="fixed">

                 {button}
            
            </div>
        )
    }
}

export default User;
