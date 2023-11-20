import mongoose from "mongoose";
const Schema = mongoose.Schema;
const chatSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.model("ChatMessage", chatSchema);
export default ChatMessage;
