import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  services: [
    {
      type: String,
      enum: ["local", "longDistance", "packingUnpacking", "loadingUnloading"],
    },
  ],
});
// model
const CompanyModel = mongoose.model("Company", CompanySchema);

export default CompanyModel;

// rest of fields
// address: {
//   street: {
//     type: String,
//     required: true
//   },
//   city: {
//     type: String,
//     required: true
//   },
//   state: {
//     type: String,
//     required: true
//   },
//   zip: {
//     type: String,
//     required: true
//   }
// },
// license: {
//   type: String,
//   required: true
// },

// trucks:{
//   type: String,
//   required:true,
// },
// loaders:{
//   type: String,
//   required:true,
// },
