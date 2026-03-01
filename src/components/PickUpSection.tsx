import { motion } from 'motion/react';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { Post } from '../types';

interface PickUpSectionProps {
  posts: Post[];
}

export default function PickUpSection({ posts }: PickUpSectionProps) {
  return (
    <section id="pick-up" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-2"
            >
              PICK UP
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 tracking-wide"
            >
              @keisuk_.eyoshikawa の科学新聞シリーズ
            </motion.p>
          </div>
          
          <motion.a
            href="https://www.instagram.com/keisuk_.eyoshikawa/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors"
          >
            <Instagram size={18} />
            <span>インスタグラムで見る</span>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/5] mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ArrowUpRight className="w-6 h-6 text-black" />
                    </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  {index === 0 && (
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase animate-pulse shadow-lg">
                      NEW
                    </span>
                  )}
                  <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase">
                      {post.category}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                    <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
            <a href="https://www.instagram.com/keisuk_.eyoshikawa/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium border border-gray-200 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                <Instagram size={18} />
                <span>インスタグラムで見る</span>
            </a>
        </div>
      </div>
    </section>
  );
}
