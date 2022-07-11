import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";

//conect to server
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const JoinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
    {!showChat ? (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h3 className="text-white text-5xl font-semibold">
        💻 Clone Chat App Twitter 💻
      </h3>
      <input
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        type="text"
        placeholder="User Name..."
        className="bg-gray-200 rounded focus:outline my-2 py-2 mt-10 focus:bg-gray-300 font-semibold pl-5"
      />
      <input
        onChange={(event) => {
          setRoom(event.target.value);
        }}
        type="text"
        placeholder="ID Room..."
        className="bg-gray-200 rounded focus:outline my-2 py-2 focus:bg-gray-300 font-semibold pl-5"
      />
      <button
        onClick={JoinRoom}
        className="p-3 bg-[#1C9AEF] rounded text-white font-medium mt-10 hover:bg-[#1A8CD8]"
      >
        Join A Room
      </button>
    </div>
    )
    : (
    <Chat socket={socket} username={username} room={room}/>
    )}
    </>
  );
}

export default App;
