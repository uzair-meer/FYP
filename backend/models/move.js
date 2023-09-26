import mongoose from "mongoose";
const moveschema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    date:{
        type:Date,
        required: true,

    }
})

const MoveModel = mongoose.model('move', moveschema);

export default MoveModel