import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  text: { type: String, required: true },
  internalUser: {type: Boolean, default: false}
}, {timestamps: true});

const videoSchema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
  description: { type: String, required: true },
  uploader: { type: String, required: true },
  views: { type: Number, required: true },
  likes: { type: Number, required: true },
  uploadDate: { type: String, required: true },
  category: { type: String, required: true },
  channelIcon: { type: String },
  comments: [commentSchema]
});


const VideoModel = mongoose.model("videos", videoSchema);

export default VideoModel;