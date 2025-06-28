import VideoModel from "../Models/Video_Model.js";

// callback function for the route '/videos' to fetch all the videos
export async function fetchVideos(req, res){
    try{
        //using find method on Model to fetch all the videos
        const allVideos = await VideoModel.find();
        //if the array is empty show empty database error
        if(allVideos.length > 0){
          return res.status(200).json(allVideos);
        }else{
            return res.status(404).json({message: 'Empty Collection!!!'})
        }
    }catch(err){
        return res.status(500).json({
            message: 'Unable to fetch videos, kindly try again later!',
            error: err.message
        })
    }
}

// callback function for the route '/video/:id' to fetch the video by its ID
export function getVideo(req, res){
    try{
        //getting the id from the request
        const productID = req.params.id;
        //finding the product by their id in database
        VideoModel.findById(productID)
        .then(video => {
            return res.status(200).json(video);
        }).catch(() => {
           return res.status(404).json({
                message: 'Video does not exist, kindly try with correct ID!',
            })
        })
    }catch(err){
        return res.status(500).json({
            message: 'Unable to fetch the Video, kindly try again later!',
            error: err.message
        })
    }
}

// callback function for the route /videos to add all the videos to DB
// export async function addVidoes(req, res){
//     try{
//         const dummyVideosList = await VideoModel.insertMany(dummyVideosData);
        
//         if(dummyVideosList.length > 0){
//             return res.status(200).json(dummyVideosList);
//         }else{
//             return res.status(404).json({message: 'List empty'})
//         }
//     }catch(err){
//         return res.status(500).json({
//             message: 'Unable to fetch the videos, kindly try again later!',
//             error: err.message
//         })
//     }
// }