import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList/RoomList';

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
  render() {
    return (
    
      <div className="App">

        <RoomList  roomListFirebase={firebase}/>
        
      </div>
    );
  }
}

export default App;