import mongoose from "mongoose";

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  inventory: [
    {
      name: {
        type: String,
        required: true,
      },
      movingPrice: {
        type: Number,
        required: true,
      },
      packingPrice: {
        type: Number,
        required: true,
      },
      unpackingPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

});

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
