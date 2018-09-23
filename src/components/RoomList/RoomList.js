import React, {Component} from 'react';
import './RoomList.css';


class RoomList extends Component{
  constructor(props){
    super(props);
    this.state = {
      rooms: []
    }
  this.roomsRef = this.props.roomListFirebase.database().ref(); //firebase reference
  }


  componentDidMount(){
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat(room) });
    });
  }

  render(){
    return(

      <div className="sidenav"> 
        <h1>Bloc Chat</h1>
        {this.state.rooms.map((room, index) => {
          return (
            <a key={index}>{room.name}</a>
                 )}
                )}
      </div> 
    ) }
    }

export default RoomList;