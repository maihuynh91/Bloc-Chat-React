import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList/RoomList';
import MessageList from './components/MessageList';



// Initialize Firebase
var config = {
  apiKey: "AIzaSyCor2IRKiybIhluVj0AZz2_ndWrDCnKZ1o",
  authDomain: "bloc-chat-room-876a7.firebaseapp.com",
  databaseURL: "https://bloc-chat-room-876a7.firebaseio.com",
  projectId: "bloc-chat-room-876a7",
  storageBucket: "bloc-chat-room-876a7.appspot.com",
  messagingSenderId: "623396380014"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {currentRoom: "",
                  roomId: ""
                 }
  }

  handleCurrentRoom(room){
    this.setState({currentRoom: room.name,
                  roomId: room.key
                 });
    console.log("This is room key: " + room.key)
  }

  render() {
    return (
    
      <div className="App">

        <RoomList  roomListFirebase={firebase} checkCurrentRoom={(room) => this.handleCurrentRoom(room)}/>
        <MessageList messageListFirebase ={firebase} currentRoom = {this.state.currentRoom} />
        
      
      </div>
    );
  }
}

export default App;