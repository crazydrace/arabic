import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

const BlogList = () => {
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "الكل",
    "التعليم",
    "الصحة",
    "ثقافة",
    "نفسية",
    "تنمية بشرية",
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setArticles(res.data.reverse()); // Latest first
      } catch (err) {
        console.error("Error fetching articles:", err);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "الكل" || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="text-right px-4 md:px-8 lg:px-12 py-8 font-[sans-serif] bg-gradient-to-b from-green-50 to-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-8 md:p-10 shadow-lg"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">
          المقالات التعليمية
        </h1>
        <p className="text-lg md:text-xl text-green-700 max-w-2xl">
          تصفح مجموعة المقالات التعليمية والثقافية المفيدة للطلاب
        </p>
        <div className="mt-6">
          <Link
            to="/submit"
            className="inline-block bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            أضف مقالتك ✍️
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-10 bg-white p-5 rounded-xl shadow-md sticky top-2 z-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-green-600 border border-green-200 hover:bg-green-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن مقالات..."
              className="w-full md:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>
      </motion.div>

      {filteredArticles.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      article.category === "التعليم"
                        ? "bg-blue-100 text-blue-800"
                        : article.category === "الصحة"
                        ? "bg-green-100 text-green-800"
                        : article.category === "ثقافة"
                        ? "bg-purple-100 text-purple-800"
                        : article.category === "نفسية"
                        ? "bg-pink-100 text-pink-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {article.category}
                  </span>
                  <span className="text-2xl">📝</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold my-2 text-gray-800 group-hover:text-green-700 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {article.content.slice(0, 60)}...
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-gray-500 text-sm">
                    {new Date(article.createdAt).toLocaleDateString("ar-EG")}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {Math.ceil(article.content.split(" ").length / 150)} دقائق
                  </span>
                </div>
                <Link
                  to={`/blog/${article.slug}`}
                  className="mt-4 text-green-600 hover:text-green-800 font-medium transition flex items-center justify-end group-hover:underline"
                >
                  اقرأ المزيد
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow p-8 text-center"
        >
          <div className="text-5xl mb-4">😕</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            لا توجد مقالات متاحة
          </h3>
          <p className="text-gray-600">
            لم يتم العثور على مقالات تطابق معايير البحث الخاصة بك
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BlogList;
