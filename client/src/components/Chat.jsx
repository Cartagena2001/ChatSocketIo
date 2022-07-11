import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  //funcion seender message
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  // Listen for new message
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="container mx-auto py-5">
      <div className="px-10">
        <ScrollToBottom className="w-full h-[45rem] overflow-x-hidden">
        {messageList.map((messageContent) => {
          return (
            <div className={username === messageContent.author ? "grid justify-items-end mr-2" : "grid justify-items-start other"}>
              <div className="flex w-auto h-auto min-w-min max-w-sm break-all">
                <h1 className="text-white bg-[#1C9AEF] rounded px-2 py-1">
                {messageContent.message}
                </h1>
              </div>
              <div className="text-gray-300 text-xs mb-5 flex gap-2">
                <span>{messageContent.time} - {messageContent.author}</span>
              </div>
            </div>
          );
        })}
        </ScrollToBottom>
      </div>
      <div className="flex w-full absolute bottom-0 left-0 px-10 mb-10">
        <input
          type="text"
          value={currentMessage}
          className="bg-black rounded-lg border-2 border-gray-800 px-2 w-full py-1 focus:outline focus:border-gray-600 text-white"
          placeholder="Start writing"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {event.key === "Enter" && sendMessage();
            }}
        />
        <button onClick={sendMessage} className="">
          <IoIosSend className="text-white font-normal text-2xl ml-4 hover:text-[#1A8CD8]" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
