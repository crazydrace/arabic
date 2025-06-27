import { useState } from "react";
import axios from "axios";

const SubmitBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    email: "",
    category: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .replace(/[^\w]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        "http://localhost:5000/api/blogs",
        payload
      );
      if (response.status === 201) {
        alert("✅ شكراً لتقديم مقالتك! سيتم مراجعتها ونشرها قريباً.");
        setFormData({
          title: "",
          author: "",
          email: "",
          category: "",
          content: "",
        });
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        alert("⚠️ هناك مقالة بنفس العنوان منشورة بالفعل. يرجى تغيير العنوان.");
      } else {
        alert("❌ حدث خطأ أثناء إرسال المقال. حاول مرة أخرى.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-right">
      <div className="mb-8 bg-green-50 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">أضف مقالتك</h1>
        <p className="text-lg">
          شاركنا مقالتك المفيدة التي قد تفيد زملائك الطلاب
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            عنوان المقال *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="author"
              className="block text-gray-700 font-medium mb-2"
            >
              اسم الكاتب *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              البريد الإلكتروني *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-2"
          >
            التصنيف *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="">اختر تصنيف المقال</option>
            <option value="التعليم">التعليم</option>
            <option value="الصحة">الصحة</option>
            <option value="ثقافة">ثقافة</option>
            <option value="تنمية بشرية">تنمية بشرية</option>
            <option value="نفسية">نفسية</option>
            <option value="أخرى">أخرى</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-gray-700 font-medium mb-2"
          >
            محتوى المقال *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="10"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
          ></textarea>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="agree"
            required
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 ml-2"
          />
          <label htmlFor="agree" className="text-gray-700">
            أوافق على شروط النشر وسياسة الخصوصية
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-600 text-white py-3 rounded-lg font-medium transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
          }`}
        >
          {loading ? "جاري الإرسال..." : "إرسال المقال"}
        </button>
      </form>
    </div>
  );
};

export default SubmitBlog;
