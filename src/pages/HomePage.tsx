import { motion } from 'motion/react';
import Hero from '../components/Hero';
import PickUpSection from '../components/PickUpSection';
import WorksSection from '../components/WorksSection';
import AboutSection from '../components/AboutSection';
import { Post } from '../types';

interface HomePageProps {
  posts: Post[];
}

export default function HomePage({ posts }: HomePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      <Hero />
      <PickUpSection posts={posts} />
      <WorksSection />
      <AboutSection />
      
      <footer className="bg-black text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Keisuke Yoshikawa. All rights reserved.
          </p>
        </div>
      </footer>
    </motion.div>
  );
}
