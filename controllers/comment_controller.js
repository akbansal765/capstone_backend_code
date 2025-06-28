import VideoModel from "../Models/Video_Model.js"

export async function addComment(req, res){
   try{
    const videoId = req.params.videoId
    const video = await VideoModel.findById(videoId)
    if(!video){
      return res.status(404).json({message: "Video did not found"})
    }
    
    const {userName, text, internalUser} = req.body;
    if(!userName || !text){
      return res.status(500).json({message: "Kindly type something to add a comment!!"})
    }
    const newComment = {userName, text, internalUser};

    video.comments.unshift(newComment);

    await video.save();
    return res.status(201).json({message: "New Comment added successfully!!"});

   }catch(err){
    res.send(err.message)
   } 
}

export async function editComment(req, res){
  try{
    const commentId = req.params.id
    const video = await VideoModel.findOne({ "comments._id": commentId });
    if(!video){
      return res.status(404).json({message: "Video not found"})
    }
    const comment = video.comments.find(obj => obj._id == commentId);
    if(!comment){
      return res.status(404).json({message: "Comment not found!"})
    }

    const {text} = req.body;
    if(!text){
      return res.status(500).json({message: "Kindly type something to edit the comment!!"})
    }
    comment.text = text;

    await video.save();
    return res.status(200).json({message: 'Comment updated successfully'})

   }catch(err){
    res.send(err.message)
   } 
}


export async function deleteComment(req, res){
  try{
    const commentId = req.params.id
    const video = await VideoModel.findOne({ "comments._id": commentId });
    if(!video){
      return res.status(404).json({message: "Video not found"})
    }
    const commentIndex = video.comments.findIndex(obj => obj._id == commentId);
    
    if(commentIndex === -1){
      return res.status(404).json({message: "Comment not found!"})
    }

    video.comments.splice(commentIndex, 1);

    await video.save();
    return res.status(200).json({message: 'Comment deleted successfully'})

   }catch(err){
    res.send(err.message);
   } 

}