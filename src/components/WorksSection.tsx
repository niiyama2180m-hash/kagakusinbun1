import { motion } from 'motion/react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Post } from '../types';

interface WorksSectionProps {
  posts: Post[];
}

export default function WorksSection({ posts }: WorksSectionProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <section id="works" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-2"
          >
            制作実績
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 tracking-wide"
          >
            過去に発行した科学新聞のアーカイブ
          </motion.p>
        </div>

        <div className="space-y-4">
          {posts.length === 0 ? (
             <div className="text-center py-12 text-gray-400">
               アーカイブはまだありません。
             </div>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedPost(post)}
                className={`group border-b border-gray-100 py-8 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-colors px-4 rounded-lg hover:bg-gray-50`}
              >
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-mono text-blue-600 font-bold">{post.category}</span>
                  </div>
                  <div>
                    <h3 className="font-bold group-hover:text-blue-600 transition-colors text-xl">{post.title}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-1">{post.outline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400 group-hover:text-blue-600 transition-colors">
                  <span className="text-sm font-medium">{post.date}</span>
                  <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Newspaper Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <BookOpen className="text-blue-600" />
                <span className="font-bold text-lg">{selectedPost.title}</span>
              </div>
              <button 
                onClick={() => setSelectedPost(null)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                  <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-4 block">科学新聞 アーカイブ</span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">{selectedPost.title}</h1>
                  <p className="text-gray-500">{selectedPost.date} 発行</p>
                </div>

                <div className="aspect-video bg-gray-100 rounded-xl mb-12 overflow-hidden flex items-center justify-center text-gray-400 italic">
                  {selectedPost.image ? (
                    <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-contain" />
                  ) : (
                    <span>[ 画像なし ]</span>
                  )}
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <h2 className="text-2xl font-bold text-black mb-4">今号のトピック</h2>
                  <p className="mb-8">{selectedPost.outline}</p>
                  
                  <h2 className="text-2xl font-bold text-black mb-4">本文</h2>
                  <p className="whitespace-pre-wrap">{selectedPost.content}</p>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center">
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                  >
                    アーカイブ一覧に戻る
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
