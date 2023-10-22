import mongoose from "mongoose";

const Schema = mongoose.Schema;

const companySchema = new Schema({
  _id: {
    //this is basically company_id
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
