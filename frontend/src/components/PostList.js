import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const url = "https://blog-app-api-zu.onrender.com";

function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${url}/api/posts`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching posts:', error));
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Post List</h1>
            {posts.map(post => (
                <div key={post._id}>
                    <h2>
                        <Link to={`/posts/${post._id}`}>{post.title}</Link>
                    </h2>
                    <p>{post.content.substring(0, 100)}...</p>
                    {post.image && <img src={post.image} alt="Post" style={{ maxWidth: '100px' }} />}
                </div>
            ))}
        </div>
    );
}

export default PostList;
