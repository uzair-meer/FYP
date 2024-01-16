import PropTypes from "prop-types";

ChatSidebar.propTypes = {
  data: PropTypes.array,
  setSelectedUserId: PropTypes.func,
};

export default function ChatSidebar({ data, setSelectedUserId }) {
  const onClickHandler = (id) => {
    console.log(id);
    setSelectedUserId(id);
  };

  return (
    <>
      <div className="flex flex-col pl-6 pr-2 w-64 bg-white flex-shrink-0 overflow-y-auto">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div className="flex items-center justify-center rounded-2xl text-primary bg-indigo-100 h-10 w-10">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div className="ml-2 font-bold text-2xl">QuickChat</div>
        </div>

        <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">Active Conversations</span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
            {data?.map((item, index) => (
              <button
                onClick={() => onClickHandler(item._id)}
                key={`sidebar-chat-${index}`}
                className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              >
                <div className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full">
                  C
                </div>
                <div className="ml-2 text-sm font-semibold">{item.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
