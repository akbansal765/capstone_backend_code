import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    channelName: String,
    channelHandle: String,
    channelVideos: {
        type: Array,
        default: []
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    channels : {
        type: [channelSchema],
        default: []
    }
}, {timestamps: true});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;