import UserModel from "../Models/User_Model.js";
import dummyChannelVideos from "../dummyData/dummyChannelVideos.js";

export async function createChannel(req, res){
   try{
    const userEmail = req.params.userEmail;

    const {channelName, channelHandle} = req.body;
    if(!channelName || !channelHandle){
        return res.status(500).json({message: "Kindly Fill all the fields!"})
    }
    const user = await UserModel.findOne({email: userEmail});
    if(!user){
        return res.status(404).json({message: "User not found"})
    }

    user.channels.push({channelName, channelHandle});

    await user.save();
    return res.status(201).json({message: "New Channel has been added. Kindly go to My Channels in the Slider tab to view your Channel."});

   }catch(err){
    return res.json(err.message)
   }
}

export async function getAllChannels(req, res){
    try{
       const email = req.params.userEmail;

       const user = await UserModel.findOne({email});
       if(!user){
        return res.status(404).json({message: "User not found"});
       }

       return res.status(200).json(user.channels);
    }catch(err){
       return res.status(500).json({message: "Unable to fetch channels! Kindly try again letter!"});
    }
}

export async function getChannelById(req, res){
    try{
        const channelId = req.params.id;
        const user = await UserModel.findOne({"channels._id" : channelId});
        if(!user){
            return res.status(404).json({message: "User not found!"});
        }

        const channel = user.channels.find(channel => channel._id == channelId);
        if(!channel){
            return res.status(404).json({message: "Channel not found!"});
        }

        return res.status(200).json(channel);
    }catch(err){
        return res.status(500).json({message: "Unable to fetch channel! Kindly try again later!"});
    }
}

export async function addChannelVideos(req, res){
    try{
        const channelId = req.params.id;
        const user = await UserModel.findOne({"channels._id" : channelId});
        if(!user){
            return res.status(404).json({message: "User not found!"});
        }
        const channel = user.channels.find(channel => channel._id == channelId);
        if(!channel){
            return res.status(404).json({message: "Channel not found!"});
        }
        channel.channelVideos = dummyChannelVideos;

        await user.save();
        return res.status(201).json(channel.channelVideos);
    }catch(err){
        return res.status(500).json({message: "Unable to add videos, kindly try again later!!"})
    }
}

export async function deleteChannelVideo(req, res){
    try{
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
        channel.channelVideos.splice(videoIndex, 1);
        await user.save();
        return res.status(200).json({message: "Channel Video has been deleted!!", videoCount: channel.channelVideos.length})

    }catch(err){
        return res.status(500).json({message: "Unable to delete Channel video!"})
    }
}