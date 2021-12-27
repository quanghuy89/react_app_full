import './App.css';
import io from 'socket.io-client';
import React, {  useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001"); // eslint-disable-next-line
// eslint-disable-next-line
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      
      socket.emit("join_room", room)
      setShowChat(true);
    }else{
      alert("Please enter a username")
    }
  }
  

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h1>Join Chat</h1>
          <input type="text" placeholder="Name....." onChange={(event) => { setUsername(event.target.value); }}
          />
          <input type="text" placeholder="RoomID....."
            onChange={(event) => { setRoom(event.target.value); }}
            onKeyPress={(event) => {
              event.key === "Enter" && joinRoom();
          }}
          />
          <button onClick={joinRoom}>Join Room</button>

        </div>
      ) : (


        <Chat socket={socket} username={username} room={room} />

      )}
    </div>
  );
}
//Test
export default App;
