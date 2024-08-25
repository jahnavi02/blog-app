// src/pages/PostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5001/api/posts/${id}`)
            .then(response => response.json())
            .then(data => {
                setPost(data);
                setTitle(data.title);
                setContent(data.content);
                setImage(data.image);
            })
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    const handleDelete = () => {
        fetch(`http://localhost:5001/api/posts/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(() => navigate('/'))
            .catch(error => setError('Error deleting post: ' + error.message));
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); 
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); 
            };
            reader.readAsDataURL(file); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5001/api/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, image }),
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((updatedPost) => {
                setPost(updatedPost);
                setIsEditing(false);
            })
            .catch(error => setError('Error updating post: ' + error.message));
    };

    return (
        <div>
            {error && <p className="error">{error}</p>}
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <h2>Edit Post</h2>
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
                    <button type="submit">Update</button>
                    <button type="button" onClick={handleEdit}>Cancel</button>
                </form>
            ) : (
                <div>
                    {post && (
                        <>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            {post.image && <img src={post.image} alt="Post" style={{ maxWidth: '100px' }} />}
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default PostDetail;
