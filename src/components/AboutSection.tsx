import { motion } from 'motion/react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                    src="https://picsum.photos/seed/portrait/800/1200" 
                    alt="Keisuke Yoshikawa" 
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-4 block">私について</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-8 leading-tight">
              Keisuke Yoshikawa<br />
              <span className="text-2xl text-gray-500 font-normal block mt-2">中学生 / 科学探究者</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg font-medium">
              石川から発信する、中学生サイエンティストの実験ノート。
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              石川県を拠点に、物理・化学から身近な科学現象まで、幅広い実験・検証活動を行っています。
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              専門的な知識を分かりやすく、そして「自分でもやってみたい」と思えるワクワク感を大切に。実験の手順や結果だけでなく、そこから得た気づきや考察を詳細に記録しています。地域の皆さんと科学の楽しさを共有し、共に成長していくコミュニティを目指しています。
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <h4 className="font-bold text-2xl mb-1">石川県</h4>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">拠点</p>
                </div>
                <div>
                    <h4 className="font-bold text-2xl mb-1">科学新聞</h4>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">メインプロジェクト</p>
                </div>
            </div>

            <a href="#contact" className="inline-block bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors">
              お問い合わせ
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
