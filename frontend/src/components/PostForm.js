import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const url = "https://blog-app-api-zu.onrender.com";

function PostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !content) {
            setError('Title and content are required');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        fetch(`${url}/api/posts/new`, {
            method: 'POST',
            body: formData, // Use formData for file uploads
        })
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(() => navigate('/'))
            .catch((error) => setError('Error creating post: ' + error.message));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Save file for submission
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Post</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <div>
                <label htmlFor="image">Upload Image</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>
            {image && <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '100px' }} />}
            <button type="submit">Submit</button>
        </form>
    );
}

export default PostForm;
