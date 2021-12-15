import './App.css';
import io from 'socket.io-client';
import React, { useEffect, useState } from "react";
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
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Chat</h3>
          <input type="text" placeholder="Huy...." onChange={(event) => { setUsername(event.target.value); }}
          />
          <input type="text" placeholder="RoomID....."
            onChange={(event) => { setRoom(event.target.value); }}
            onKeyPress={(event) => {
              event.key === "Enter" && joinRoom();
          }}
          />
          <button onClick={joinRoom}>Join a Room</button>

        </div>
      ) : (


        <Chat socket={socket} username={username} room={room} />

      )}
    </div>
  );
}

export default App;
