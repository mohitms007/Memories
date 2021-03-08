import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose'


export const getPosts = async (req, res) => {
       try {
              const postMessages = await PostMessage.find()
              res.status(200).json(postMessages)
       } catch (e) {
              res.status(404).json({
                     message: e.message
              })
       }

}


export const createPost = async (req, res) => {
       const post = req.body
       const newPost = new PostMessage(post)
       try {
              await newPost.save()
              res.status(200).json(newPost)

       } catch (e) {
              res.status(404).json({
                     message: e.message
              })
       }
}


export const updatePost = async (req, res) => {
       const {
              id
       } = req.params;
       const {
              title,
              message,
              creator,
              selectedFile,
              tags
       } = req.body;

       if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

       const updatedPost = {
              creator,
              title,
              message,
              tags,
              selectedFile,
              _id: id
       };
       await PostMessage.findByIdAndUpdate(id, updatedPost);

       res.json(updatedPost);
}




export  const deletePost = async (req, res) => {
       const {id } = req.params;
       if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
       await PostMessage.findByIdAndDelete(id)
       console.log('DELETED')
       res.json({
              message:"Post deleted."
       })
}

export const likePost = async (req, res) => {
       const { id } = req.params;
   
       if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
       
       const post = await PostMessage.findById(id);
   
       const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
       
       res.json(updatedPost);
   }