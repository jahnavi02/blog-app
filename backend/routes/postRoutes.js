const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPostTitles
} = require('../controllers/postController');
const upload = require('../middleware/imageUploader');

;

router.route('/').get(getPosts);
router.get('/titles', getPostTitles);

router.route('/new').post(upload.single('image'),createPost);

router.route('/:id').get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
