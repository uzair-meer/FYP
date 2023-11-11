import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeId: {
    //this is basically employeeId
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "free",
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
