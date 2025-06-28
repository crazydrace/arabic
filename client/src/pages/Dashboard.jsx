import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiLogOut,
  FiTrash2,
  FiPlusCircle,
  FiUser,
  FiEye,
  FiHeart,
  FiEdit2,
} from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
        await fetchUserBlogs(currentUser.email);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchUserBlogs = async (email) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/blogs/user?email=${email}`
      );
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to load blogs:", err);
      setError("حدث خطأ أثناء تحميل المقالات");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm("هل أنت متأكد من حذف هذه المقالة؟")) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${blogId}`);
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      } catch (err) {
        console.error("Failed to delete blog:", err);
        setError("حدث خطأ أثناء حذف المقالة");
      }
    }
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-green-50 to-gray-50 py-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="bg-gradient-to-r from-green-100 to-green-200 p-3 rounded-full shadow-md"
            >
              {user.photoURL ? (
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  src={user.photoURL}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <FiUser className="text-green-700 text-2xl" />
              )}
            </motion.div>
            <div>
              <motion.h1
                whileHover={{ x: 5 }}
                className="text-2xl md:text-3xl font-bold text-green-800"
              >
                مرحباً، {user.displayName || user.email.split("@")[0]}
              </motion.h1>
              <motion.p whileHover={{ x: 5 }} className="text-gray-600">
                لوحة تحكم مدونة الطالب
              </motion.p>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(5, 150, 105, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/submit")}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md"
            >
              <FiPlusCircle className="text-lg" />
              <span>مقالة جديدة</span>
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(220, 38, 38, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all shadow-sm"
            >
              <FiLogOut className="text-lg" />
              <span>تسجيل الخروج</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
            <motion.h2
              whileHover={{ scale: 1.02 }}
              className="text-xl md:text-2xl font-semibold text-green-700 flex items-center gap-2"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaRegNewspaper className="text-green-600" />
              </motion.span>
              <span>مقالاتك المنشورة</span>
            </motion.h2>
          </div>

          {loading ? (
            <div className="p-8 flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"
              ></motion.div>
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 text-center text-red-500 bg-red-50 rounded-lg mx-4 my-4 flex items-center justify-center gap-2"
            >
              <FiAlertCircle className="text-xl" />
              <span>{error}</span>
            </motion.div>
          ) : blogs.length === 0 ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="p-8 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-4"
              >
                📭
              </motion.div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                لم تقم بنشر أي مقالات بعد
              </h3>
              <p className="text-gray-500 mb-6">
                ابدأ بمشاركة معرفتك مع المجتمع الأكاديمي
              </p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(5, 150, 105, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/submit")}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md"
              >
                ابدأ بنشر مقالتك الأولى
              </motion.button>
            </motion.div>
          ) : (
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="divide-y divide-gray-200"
            >
              {blogs.map((blog) => (
                <motion.li
                  key={blog._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ backgroundColor: "rgba(240, 253, 244, 0.5)" }}
                  className="p-6 transition-colors duration-300"
                >
                  <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <div className="flex-1">
                      <Link to={`/article/${blog.slug}`} className="group">
                        <motion.h3
                          whileHover={{ color: "#047857" }}
                          className="text-lg md:text-xl font-bold text-green-800 transition-colors duration-300 mb-2"
                        >
                          {blog.title}
                        </motion.h3>
                      </Link>

                      <div className="flex flex-wrap gap-3 mb-3 items-center">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full shadow-sm"
                        >
                          {blog.category}
                        </motion.span>
                        <span className="text-xs text-gray-500">
                          {new Date(blog.createdAt).toLocaleDateString("ar-EG")}
                        </span>
                        <span className="text-xs text-gray-600 flex items-center gap-1">
                          <FiEye className="text-green-600" />
                          {blog.views || 0} مشاهدة
                        </span>
                        <span className="text-xs text-pink-600 flex items-center gap-1">
                          <FiHeart className="text-pink-600" />
                          {blog.likes?.length || 0} إعجاب
                        </span>
                      </div>

                      <p className="text-gray-700 line-clamp-2 mb-4">
                        {blog.content}
                      </p>
                    </div>

                    <div className="flex gap-2 self-start md:self-center">
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(220, 38, 38, 0.1)",
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="p-2 text-red-600 rounded-lg transition-all"
                        title="حذف"
                      >
                        <FiTrash2 className="text-lg" />
                      </motion.button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
