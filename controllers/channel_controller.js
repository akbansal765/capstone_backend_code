import UserModel from "../Models/User_Model.js";
import dummyChannelVideos from "../dummyData/dummyChannelVideos.js";

//function for creating a new channel with the help of logged in user email address
export async function createChannel(req, res){
   try{
    //getting user email
    const userEmail = req.params.userEmail;

    //getting channnel and handle name from the body
    const {channelName, channelHandle} = req.body;
    if(!channelName || !channelHandle){
        return res.status(500).json({message: "Kindly Fill all the fields!"})
    }
    const user = await UserModel.findOne({email: userEmail});
    if(!user){
        return res.status(404).json({message: "User not found"})
    }
    //pushing new channel data to channels array in the user document
    user.channels.push({channelName, channelHandle});

    await user.save();
    return res.status(201).json({message: "New Channel has been added. Kindly go to My Channels in the Slider tab to view your Channel."});

   }catch(err){
     return res.status(500).json({message: "Unable to create a new channel! Kindly try again letter!"});
   }
}

//function for diplaying all the channels in the slider bar (frontend component)
export async function getAllChannels(req, res){
    try{
       //finding the user using email address
       const email = req.params.userEmail;

       const user = await UserModel.findOne({email});
       if(!user){
        return res.status(404).json({message: "User not found"});
       }
       
       //sending channels as a response
       return res.status(200).json(user.channels);
    }catch(err){
       return res.status(500).json({message: "Unable to fetch channels! Kindly try again letter!"});
    }
}

//funciton for displaying the single channel in myChannel component
export async function getChannelById(req, res){
    try{
        //getting the channel id
        const channelId = req.params.id;
        //finding the user first using channel id
        const user = await UserModel.findOne({"channels._id" : channelId});
        if(!user){
            return res.status(404).json({message: "User not found!"});
        }
        //finding the specific channel in the channles array in user document
        const channel = user.channels.find(channel => channel._id == channelId);
        if(!channel){
            return res.status(404).json({message: "Channel not found!"});
        }
        
        return res.status(200).json(channel);
    }catch(err){
        return res.status(500).json({message: "Unable to fetch channel! Kindly try again later!"});
    }
}

//function to add static videos in myChannel component
export async function addChannelVideos(req, res){
    try{
        //finding the channel first using channel id
        const channelId = req.params.id;
        const user = await UserModel.findOne({"channels._id" : channelId});
        if(!user){
            return res.status(404).json({message: "User not found!"});
        }
        const channel = user.channels.find(channel => channel._id == channelId);
        if(!channel){
            return res.status(404).json({message: "Channel not found!"});
        }
        //setting the channelVidoes array to dummy data
        channel.channelVideos = dummyChannelVideos;

        await user.save();
        return res.status(201).json(channel.channelVideos);
    }catch(err){
        return res.status(500).json({message: "Unable to add videos, kindly try again later!!"})
    }
}

//function for deleting the channel video
export async function deleteChannelVideo(req, res){
    try{
        //finding the channel and video using channle and video id passed in the route parameters
        const {channelId, videoId} = req.params;
        const user = await UserModel.findOne({"channels._id" : channelId});
        if(!user){
            return res.status(404).json({message: "User not found!"});
        }
        const channel = user.channels.find(channel => channel._id == channelId);
        if(!channel){
            return res.status(404).json({message: "Channel not found!"});
        }
        const videoIndex = channel.channelVideos.findIndex(video => video.videoId == videoId);
        if(videoIndex == -1){
            return res.status(404).json({message: "Video not found"});
        }
        //deleting the video from channelVideos array using video index that find earlier
        channel.channelVideos.splice(videoIndex, 1);
        await user.save();
        // sending video count and successfully message to frontend
        return res.status(200).json({message: "Channel Video has been deleted!!"})

    }catch(err){
        return res.status(500).json({message: "Unable to delete Channel video!"})
    }
}