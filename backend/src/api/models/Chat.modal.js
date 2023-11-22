import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: {
    type: String, //client or company
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  messages: [messageSchema],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
