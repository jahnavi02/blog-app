import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const url = "https://blog-app-api-zu.onrender.com";

function ContentsList() {
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        fetch(`${url}/api/posts/titles`)
            .then(response => response.json())
            .then(data => setTitles(data))
            .catch(error => console.error('Error fetching titles:', error));
    }, []);

    return (
        <div>
            <h2>Contents</h2>
            <ul>
                {titles.map((post) => (
                    <li key={post._id}>
                        <Link to={`/posts/${post._id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContentsList;
