const Post = require('../models/Post');
const {uploadImage}=require('../utils/cloudinary');

// @desc    Get all posts
// @route   GET /posts
// @access  Public
exports.getPosts = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json(posts);
};

// @desc    Get single post
// @route   GET /posts/:id
// @access  Public
exports.getPost = async (req, res) => {
  const {id} = req.params;
  const post = await Post.findById(id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

// @desc    Create new post
// @route   POST /posts
// @access  Public
exports.createPost = async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const file = req.file;
  if (!title || !content) {
    res.status(400).json({ message: 'Please provide both title and content' });
    return;
  }

  let image = null;

  if (file) {
    try {
      image = await uploadImage(file);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to upload image' });
    }
  }
  const post = new Post({ title, content, image });
  const createdPost = await post.save();
  return res.status(201).json(createdPost);
  } catch(error) {
    console.error('Error creating post:', error);
    return res.json(500).json({ error: error.message })
  }
  
};

// @desc    Update a post
// @route   PUT /posts/:id
// @access  Public
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content, image }, { new: true });
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /posts/:id
// @access  Public
exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.remove();
    res.status(200).json({ message: 'Post removed' });
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

exports.getPostTitles = async (req, res) => {
  try {
    const posts = await Post.find({}, 'title'); // Fetch only titles
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching titles', error: error.message });
  }
};
