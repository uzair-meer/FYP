import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useAuth } from "src/context/AuthContext.jsx";
import { useSocket } from "../../hooks/useSocket";

ChatBox.propTypes = {
  messages: PropTypes.array,
  isUserSelected: PropTypes.bool,
  receiverId: PropTypes.string,
  onNewMessage: PropTypes.func,
};
export default function ChatBox({
  messages,
  isUserSelected,
  receiverId,
  onNewMessage,
}) {
  const messagesContainerRef = useRef(null);
  const { user } = useAuth();

  console.log(messages, "in chatbox");

  const [message, setMessage] = useState("");
  const socket = useSocket(user._id);

  const onChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      let newMessage = {
        message: message,
        role: user.role,
      };

      if (user.role === "company") {
        newMessage.clientId = receiverId;
        newMessage.companyId = user._id;
      } else if (user.role === "client") {
        newMessage.clientId = user._id;
        newMessage.companyId = receiverId;
      }

      socket.emit("sendMessage", newMessage);

      if (messagesContainerRef.current) {
        console.log("hello g");
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }

      onNewMessage(newMessage);
      // const response = await fetch('http://localhost:5000/chat/post/message', {
      // 	headers: {
      // 		'Content-Type': 'application/json',
      // 	},
      // 	method: 'POST',
      // 	body: JSON.stringify(newMessage),
      // })

      // const result = await response.json()

      // if (result.status !== 'ok') {
      // 	throw new Error('something wrong with api', result)
      // }
      //clear input
      setMessage("");
    } catch (error) {
      //FIXME: handle errors
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col pt-6 flex-auto px-6 overflow-y-auto">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          {isUserSelected > 0 ? (
            <>
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    {/* sender */}
                    {messages?.map((message, index) =>
                      user.role === message.sender ? (
                        <SenderMessage
                          key={`${message._id}-${index}`}
                          message={message.message}
                          date={message.createdAt}
                        />
                      ) : (
                        <ReceiverMessage
                          key={`${message._id}-${index}`}
                          message={message.message}
                          date={message.createdAt}
                        />
                      )
                    )}
                    <div ref={messagesContainerRef}></div>
                  </div>
                </div>
              </div>
              {/* Input */}
              <form
                onSubmit={submitHandler}
                method="POST"
                className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
              >
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      value={message}
                      onChange={onChangeHandler}
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-[#bc5f6f] hover:bg-primary rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="font-bold text-2xl text-center">
                Hey! Select Company to chat :{")"}
              </h2>
            </>
          )}
        </div>
      </div>
    </>
  );
}

SenderMessage.propTypes = {
  message: PropTypes.string,
  date: PropTypes.string,
};

ReceiverMessage.propTypes = {
  message: PropTypes.string,
  date: PropTypes.string,
};

function ReceiverMessage({ message, date }) {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          U
        </div>
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
}

function SenderMessage({ message, date }) {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 text-white rounded-full bg-primary flex-shrink-0">
          C
        </div>
        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
}
