import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      value: "",
      openedForm: false,
      isPageLoaded: false, 
     
    }

    this.roomsRef = this.props.roomListFirebase.database().ref('rooms'); //firebase reference
  }

  handleDownloadedData = (snapshot) => {
    {
      console.log("data downloaded from firebase");
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({
        isPageLoaded: true,
        rooms: this.state.rooms.concat(room)
      });
    }
  }
  //subscribe, asynchronous
  componentDidMount() {
    this.roomsRef.on('child_added', this.handleDownloadedData);
    console.log("child_added subscibed");
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.value!==""){
      this.roomsRef.push({
        name: this.state.value
      })
      this.setState({openedForm:false})
    }
    this.setState({ value: "" })
  }

  handleDelete(e, key){
    e.preventDefault();
    console.log(e)
    this.roomsRef.child(key).remove();
    const rooms = this.state.rooms.filter((room)=>room.key !== key )
    this.setState({rooms: rooms})
   /* this.props.roomListFirebase.database().ref('/rooms/' + key).once('value') // pull specific room object
    .then((snapshot)=> {
      let room = snapshot.val()
      console.log(room)
      room.remove()})*/

  }

  handleCancel() {
    this.setState({
      openedForm: false,
      value: ""
    })
  }

  createRoom() {
    this.setState({ openedForm: true })
  }


  checkPageLoaded() {
    if (this.state.isPageLoaded === true) {
      return (
        <div className="sidenav">
          <h1>Bloc Chat</h1>
          <button onClick={() => this.createRoom()} >Create Room</button>
          {this.state.rooms.map((room) => {
            return (  
              <div key={room.key}>     
             <a onClick={()=>this.props.checkCurrentRoom(room)}>{room.name}</a>  
             <p onClick = {(e) => this.handleDelete(e, room.key)}>X</p>
              </div>   
            )
          })}
        </div>
      )
    }
     }

  renderAddRoomForm() {
    if (this.state.openedForm === true) {
      return (
        <div className="card card-container">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-title">Add A New Room</div>

          <input className="input" type="text" value={this.state.value} onChange={(e) => this.handleChange(e)} />

          <div>
            <input type="submit" value="Submit" />
            <button onClick={() => this.handleCancel()}>Cancel</button>
          </div>
        </form>
        </div>
      )
    }
  }


  render() {
    return (
      <div>
 
        {this.checkPageLoaded()}
        {this.renderAddRoomForm()}
        
      </div>

    )
  }
}

export default RoomList;