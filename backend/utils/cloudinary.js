const cloudinary = require("cloudinary").v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// function to upload an image to Cloudinary
const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error.message);
    throw new Error("Error uploading image to Cloudinary");
  }
};

// Function to delete an image from Cloudinary using its URL
const deleteImage = async (url) => {
  try {
    const publicId = url.split('/').pop().split('.')[0];
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error("Error deleting image from Cloudinary");
  }
};

module.exports = { uploadImage, deleteImage };