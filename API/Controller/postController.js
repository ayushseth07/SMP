const client = require("../Database/connection.js");
const { addPost } = require("../Services/addPost.js")
const { getPost } = require("../Services/getPost.js")
const { deletePost } = require("../Services/deletePost.js")
const { updatePost } = require("../Services/updatePost.js")
const path = require('path');
const jwt = require('jsonwebtoken');
const { hashPassword } = require("../Services/hashPassword.js");
const { checkNotLiked } = require('../Services/checkNotLiked.js')
const dbQuery = require('../Database/dbqueries.js');



async function savePost(req, res) {
  try {
    const blogData = req.body;
    blogData.email = req.email;
    const result = await addPost(blogData);
    if (result) {
      res.status(200).json({ message: 'Post saved successfully', postId: result.rows[0].post_id });
    } else {
      res.status(500).json({ message: 'Error saving post', error: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error saving post', error: error.message });
  }
}



async function displayPost(req, res) {
  try {
    const retrievedPost = await getPost(req.email);
    if (retrievedPost.length > 0) {
      res.status(200).json({
        message: 'Post saved and retrieved successfully',
        post: retrievedPost,
      });
    } else {
      res.status(500).json({ message: 'No post for this user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving post' });
  }
}


async function removePost(req, res) {
  try {
    const postId = req.query.postid;
    const email = req.email;
    if (postId == null) {
      return res.status(400).json({ message: 'Invalid postId' });
    }
    const result = await deletePost(postId, email);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
}

async function getAllPost(req, res) {
  try {
    const loggedInUser = req.email;
    const result = await client.query(dbQuery.selectAllBlogPosts);
    const posts = result.rows;
    res.status(200).json({
      message: 'Post saved and retrieved successfully',
      post: posts,
      loggedInUser:loggedInUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
}


async function editPost(req, res) {
  try {
    const email = req.email;
    const data = req.body;
    const result = await updatePost(email, data);

    if (result.length > 0) {
      res.status(200).json({ message: 'Post updated successfully', updatedPost: result[0] });
    } else {
      res.status(404).json({ message: 'Post not found or unauthorized to update' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
}

async function likePost(req, res) {
  const { post_id } = req.params;
  const alreadyLiked = await checkNotLiked(post_id, req.email)

  if (alreadyLiked) {
    try {

      const result = await client.query(dbQuery.updateLikesQuery, [post_id]);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.status(201).json({ message: 'Post liked successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  else {
    const result = await client.query(dbQuery.updateUnLikeQuery, [post_id]);
    return res.status(200).json({ error: 'already liked' });
  }
}


async function displayPostComment(req, res) {

  const { post_id } = req.params;
  const receiver = req.query.receiver;
    try {

      const result = await client.query(dbQuery.retrievedComment, [post_id,receiver]);
      if (result.rowCount === 0) {
        return res.status(204).send()
      }

      res.status(201).json({ data:result.rows });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  

}

async function checkLikedPost(req,res){
  const { post_id } = req.params;
  const alreadyLiked = await checkNotLiked(post_id, req.email)
  if(!alreadyLiked){
    res.status(201).json({ message: 'Post liked' });
  }else{
    res.status(201).json({ message: 'Post not liked' });
  }

}

module.exports = { savePost, displayPost, removePost, getAllPost, editPost, likePost ,displayPostComment,checkLikedPost}