import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import LoginForm from './components/LoginForm';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/" element={<PostList />} />
                        <Route path="/new" element={<PostForm />} />
                        <Route path="/posts/:id" element={<PostDetail />} />
                        <Route path="/login" element={<LoginForm />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
