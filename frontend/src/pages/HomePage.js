// src/pages/HomePage.js
import React from 'react';
import ContentsList from '../components/Content';
import AllPosts from '../components/PostList';

function HomePage() {
    return (
        <div>
            <ContentsList />
            <AllPosts />
        </div>
    );
}

export default HomePage;
