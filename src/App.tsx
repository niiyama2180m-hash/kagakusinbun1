/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PickUpSection from './components/PickUpSection';
import AboutSection from './components/AboutSection';
import WorksSection from './components/WorksSection';
import Footer from './components/Footer';
import AdminPage from './pages/AdminPage';
import { Post } from './types';

// 初期データ
const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    image: 'https://picsum.photos/seed/science1/800/1000',
    title: '科学新聞 Vol.6',
    category: '科学',
    date: '2023.11.15',
    content: '',
    outline: ''
  },
  {
    id: '2',
    image: 'https://picsum.photos/seed/science2/800/1000',
    title: '科学新聞 Vol.5',
    category: '科学',
    date: '2023.11.08',
    content: '',
    outline: ''
  },
  {
    id: '3',
    image: 'https://picsum.photos/seed/science3/800/1000',
    title: '科学新聞 Vol.4',
    category: '科学',
    date: '2023.11.01',
    content: '',
    outline: ''
  },
  {
    id: '4',
    image: 'https://picsum.photos/seed/science4/800/1000',
    title: '科学新聞 Vol.3',
    category: '科学',
    date: '2023.10.25',
    content: '',
    outline: ''
  },
  {
    id: '5',
    image: 'https://picsum.photos/seed/science5/800/1000',
    title: '科学新聞 Vol.2',
    category: '科学',
    date: '2023.10.18',
    content: '',
    outline: ''
  },
  {
    id: '6',
    image: 'https://picsum.photos/seed/science6/800/1000',
    title: '科学新聞 Vol.1',
    category: '科学',
    date: '2023.10.11',
    content: '',
    outline: ''
  }
];

export default function App() {
  const [posts, setPosts] = useState<Post[]>(() => {
    // ローカルストレージからデータを読み込む
    const saved = localStorage.getItem('science_newspaper_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  useEffect(() => {
    // データが変更されたらローカルストレージに保存
    localStorage.setItem('science_newspaper_posts', JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={
          <AdminPage 
            posts={posts} 
            onAddPost={handleAddPost} 
            onUpdatePost={handleUpdatePost}
            onDeletePost={handleDeletePost}
          />
        } />
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Navigation />
            <Hero />
            <main>
              <AboutSection />
              <WorksSection />
              <PickUpSection posts={posts} />
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

