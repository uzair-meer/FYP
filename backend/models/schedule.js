import mongoose from "mongoose";

const MoveScheduleSchema = new mongoose.Schema({
  // moveType: {
  //   type: String,
  //   enum: [
  //     "local",
  //     "long-distance",
  //     "packing and unpacking",
  //     "loading and unloading",
  //   ],
  //   required: true,
  // },

  originAddress: {
    type: String,
    required: true,
  },
  destinationAddress: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },

  customerPhone: {
    type: String,
    required: true,
  },
  moveDate: {
    type: Date,
    required: true,
  },
});

const ScheduleModel = mongoose.model("MoveSchedule", MoveScheduleSchema);
export default ScheduleModel;
// moveDate: {
//   type: Date,
//   required: true,
// },
