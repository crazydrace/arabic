import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUpload, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { slugify } from "transliteration";

const SubmitBlog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    email: "",
    category: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const categories = [
    "الكل",
    "التعليم",
    "الأشعار",
    "قصص الأطفال",
    "قصص قصيرة",
    "المقالات",
    "أخرى",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setFormData((prev) => ({
          ...prev,
          email: currentUser.email,
          author: currentUser.displayName || currentUser.email.split("@")[0],
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // Autofill poem structure if empty and category is "الأشعار"
  useEffect(() => {
    if (formData.category === "الأشعار" && formData.content.trim() === "") {
      setFormData((prev) => ({
        ...prev,
        content: "بيت ١:\n...\nبيت ٢:\n...\nبيت ٣:\n...",
      }));
    }
  }, [formData.category]);

  const generateSlug = (text) => {
    const asciiSlug = slugify(text);
    const finalSlug = asciiSlug
      .toLowerCase()
      .replace(/[^\w]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return finalSlug || `blog-${Date.now()}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      slug: generateSlug(formData.title),
    };

    try {
      const response = await axios.post(
        "https://arabic-36zi.onrender.com/api/blogs",
        payload
      );

      if (response.status === 201) {
        showNotification("✅ تم إرسال المقال بنجاح!", "success");
        setTimeout(() => {
          setLoading(false);
          navigate("/blogs");
        }, 2000);
      } else {
        showNotification("❌ حدث خطأ غير متوقع أثناء الإرسال.", "error");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);

      if (err.response?.status === 409) {
        showNotification(
          "⚠️ هناك مقالة بنفس العنوان منشورة بالفعل. يرجى تغيير العنوان.",
          "error"
        );
      } else {
        showNotification(
          "❌ حدث خطأ أثناء إرسال المقال. يرجى المحاولة مرة أخرى.",
          "error"
        );
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-right max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-10 bg-gradient-to-r from-green-100 to-green-50 rounded-2xl p-8 shadow-lg border border-green-200"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">
          أضف مقالتك
        </h1>
        <p className="text-lg text-green-700">
          شاركنا مقالتك المفيدة التي قد تفيد زملائك الطلاب
        </p>
      </motion.div>

      {/* Notification */}
      {notification.message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 px-6 py-4 rounded-xl shadow-md flex items-start ${
            notification.type === "success"
              ? "bg-green-100 border border-green-300 text-green-800"
              : "bg-red-100 border border-red-300 text-red-800"
          }`}
        >
          {notification.type === "success" ? (
            <FiCheckCircle className="text-xl mt-1 ml-2 text-green-600" />
          ) : (
            <FiAlertCircle className="text-xl mt-1 ml-2 text-red-600" />
          )}
          <span className="text-lg">{notification.message}</span>
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="p-8 space-y-8">
          <InputField
            label="عنوان المقال *"
            name="title"
            value={formData.title}
            onChange={handleChange}
            loading={loading}
            placeholder="اكتب عنوان المقال هنا..."
          />

          <InputField
            label="اسم الكاتب *"
            name="author"
            value={formData.author}
            onChange={handleChange}
            loading={loading}
            placeholder="اسمك الكامل"
          />

          {/* Category */}
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-3">
              التصنيف *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-5 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition bg-white"
            >
              <option value="">اختر تصنيف المقال</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Content - Dynamic */}
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-3">
              محتوى {formData.category === "الأشعار" ? "القصيدة" : "المقال"} *
            </label>
            {formData.category === "الأشعار" ? (
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                disabled={loading}
                rows="12"
                placeholder={`مثال:\nيا دارَ عبلةَ بالجَواءِ تَكَلَّمي\nوعمي صباحاً دارَ عبلةَ واسلمي\n...`}
                className="w-full px-5 py-3 text-lg border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition font-[Amiri]"
              />
            ) : (
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                disabled={loading}
                rows="12"
                className="w-full px-5 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
                placeholder="اكتب محتوى المقال هنا..."
              />
            )}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            className={`w-full py-4 px-6 rounded-xl font-medium text-lg transition-all flex items-center justify-center ${
              loading
                ? "bg-green-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg text-white"
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                جاري الإرسال...
              </span>
            ) : (
              <span className="flex items-center">
                <FiUpload className="ml-2" />
                إرسال المقال
              </span>
            )}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange, placeholder, loading }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-lg font-medium text-gray-800 mb-3"
    >
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      disabled={loading}
      className="w-full px-5 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
      placeholder={placeholder}
    />
  </div>
);

export default SubmitBlog;
