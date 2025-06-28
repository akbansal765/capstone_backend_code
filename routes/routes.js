import { registerUser, loginUser } from "../controllers/user_controller.js";
import { fetchVideos, getVideo } from "../controllers/videos_controller.js";
import { addComment, editComment, deleteComment } from "../controllers/comment_controller.js";
import { createChannel, getAllChannels, getChannelById, addChannelVideos, deleteChannelVideo} from "../controllers/channel_controller.js";

export function userRoutes(app){
   app.post("/register", registerUser);
   app.post("/login", loginUser);
}

export function videosRoutes(app){
   app.get("/videos", fetchVideos);
   app.get("/video/:id", getVideo);

   // app.post("/videos", addVidoes); //this api is just used to insert the dummy videos data to MonngoDb Atlas Database
}

export function commentRoutes(app){
   app.post("/comment/:videoId", addComment);
   app.put("/comment/:id", editComment);
   app.delete("/comment/:id", deleteComment);
}

export function channelRoutes(app){
   app.post("/channel/:userEmail", createChannel);
   app.get("/channels/:userEmail", getAllChannels);
   app.get("/channel/:id", getChannelById);
   app.post("/channelVideos/:id", addChannelVideos);
   app.delete("/channelVideo/:channelId/:videoId", deleteChannelVideo);
}