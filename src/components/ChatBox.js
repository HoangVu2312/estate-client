import React, { useEffect, useRef, useState } from 'react'
import "../Style/ChatBox.css"
import { useSelector } from 'react-redux';
import ScrollToBottom from "react-scroll-to-bottom";





// receive socketio as a prop from App
function ChatBox({ socket }) {
  let user = useSelector((state) => state?.user); // loged-in user


  const [currentOnlineUsers, setCurrentOnlineUsers] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const socketRef = useRef();

  useEffect(() => {

    // Store the latest socket instance in the ref
    socketRef.current = socket;

    if (!user) {
      const randomUser = {_id: 'random123'}; // give non-logged in user an id
      socket.emit("addUser", randomUser._id);
    } else {
      socket.emit("addUser", user?._id);
    }
  

    socket.on("getUsers", (users) => {

      setCurrentOnlineUsers(users);
    });

    return () => {
      // Clean up the socket event subscriptions when the component unmounts
      socketRef.current.off("get_private_message");
    };
  }, [user, socket]);

  const sendPrivateMessage = async () => {
    if (currentMessage.trim() !== "" ) {
      
      // dynamic values since changing every time
      let senderId, receiverId;

      if (user) {
        senderId = user._id;
      } else {
        const randomUser = { _id: 'random123' };
        senderId = randomUser._id;
      }

      const adminUser = currentOnlineUsers.find((member) => member?.userId === "65a44b044c0a8389659cd564");


      if (senderId === adminUser?.userId) {
        // If the sender is the admin, set the receiver to the first user in the array
        receiverId = currentOnlineUsers.find((member) => member.userId !== adminUser?.userId)?.userId;
      } else {
        // If the sender is a regular user, set the receiver to the admin
        receiverId = adminUser?.userId;
      }

  
      const messageData = {
        senderId: senderId,
        receiverId: receiverId,
        message: currentMessage,
        time: new Date(Date.now()).toLocaleTimeString(),
      };
  
      await socket.emit("send_private_message", messageData);
      setCurrentMessage("");
      setMessageList((list) => [...list, messageData]);
    }
  };
  

  useEffect(() => {
    const handlePrivateMessage = ({ senderId, message, time }) => {
      setMessageList((list) => [...list, { senderId, message, time }]);
    };

    socketRef.current.on("get_private_message", handlePrivateMessage);

    return () => {
      // Clean up the socket event subscriptions when the component unmounts
      socketRef.current.off("get_private_message", handlePrivateMessage);
    };
  }, []);
  
  return ( 
    <div className="chat-window">
      
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => (
            <div key={index}>
              <div
                className="message"
                key={index}
                id={user?._id!== messageContent.senderId ? "you" : "other" }
              >
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              sendPrivateMessage();
            }
          }}
        />
        <button onClick={sendPrivateMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default ChatBox;
