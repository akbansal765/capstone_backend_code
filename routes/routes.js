import { registerUser, loginUser } from "../controllers/user_controller.js";
import { fetchVideos, getVideo } from "../controllers/videos_controller.js";
import { addComment, editComment, deleteComment } from "../controllers/comment_controller.js";
import { createChannel, getAllChannels, getChannelById, addChannelVideos, deleteChannelVideo} from "../controllers/channel_controller.js";
import verifyToken from "../middlewares/verifyToken.js";

export function userRoutes(app){
   app.post("/register", registerUser); // api for registering the new user
   app.post("/login", loginUser); // api for handling login
}

export function videosRoutes(app){
   app.get("/videos", fetchVideos);
   app.get("/video/:id", getVideo);

   // app.post("/videos", addVidoes); //this api is just used to insert the dummy videos data to MonngoDb Atlas Database
}

export function commentRoutes(app){
   app.post("/comment/:videoId", verifyToken, addComment); // api for adding a new comment
   app.put("/comment/:id", editComment); // api for editing the comment added by the logged in user
   app.delete("/comment/:id", deleteComment); // api for deleting the comment added by the logged in user
}

export function channelRoutes(app){
   app.post("/channel/:userEmail", createChannel); //api for creating a new channel using user email
   app.get("/channels/:userEmail", getAllChannels); // api for fetching all the channels
   app.get("/channel/:id", getChannelById); // api for fetching the specific one channel
   app.post("/channelVideos/:id", addChannelVideos); // api for adding dummyVideos data to channel
   app.delete("/channelVideo/:channelId/:videoId", deleteChannelVideo); // api for deleting the channel video
}