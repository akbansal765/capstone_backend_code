import VideoModel from "../Models/Video_Model.js"

//function for adding a comment in the video player component
export async function addComment(req, res){
   try{
    //finding the video first using video ID
    const videoId = req.params.videoId
    const video = await VideoModel.findById(videoId)
    if(!video){
      return res.status(404).json({message: "Video did not found"})
    }
    
    const {userName, userEmail, text, internalUser} = req.body;
    if(!userName || !text){
      return res.status(500).json({message: "Kindly type something to add a comment!!"})
    }
    const newComment = {userName, userEmail, text, internalUser};
    
    //pushing the new comment data to comments array in video document to the top
    video.comments.unshift(newComment);

    await video.save();
    return res.status(201).json({message: "New Comment added successfully!!"});

   }catch(err){
    res.status(500).json({message: "Unable to add comment! Kindly try again later!!"})
   } 
}

//function for editing the comment added by the logged in user
export async function editComment(req, res){
  try{
    //getting the video first then find the comment using comment ID
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
    //replacing the text of the comment with the updated comment text
    comment.text = text;

    await video.save();
    return res.status(200).json({message: 'Comment updated successfully'})

   }catch(err){
    res.status(500).json({message: "Unable to edit the comment! Kindly try again later!!"})
   } 
}

//function for deleting the comment added by the logged in user
export async function deleteComment(req, res){
  try{
    //finding the video then comment using comment ID
    const commentId = req.params.id
    const video = await VideoModel.findOne({ "comments._id": commentId });
    if(!video){
      return res.status(404).json({message: "Video not found"})
    }
    const commentIndex = video.comments.findIndex(obj => obj._id == commentId);
    
    if(commentIndex === -1){
      return res.status(404).json({message: "Comment not found!"})
    }

    //deleting the found comment from the comments array in video document
    video.comments.splice(commentIndex, 1);

    await video.save();
    return res.status(200).json({message: 'Comment deleted successfully'})

   }catch(err){
    res.status(500).json({message: "Unable to delete the comment! Kindly try again later!!"})
   } 

}