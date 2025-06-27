import { Link } from "react-router-dom";

const BlogList = () => {
  const articles = [
    {
      id: 1,
      title: "نصائح للدراسة الفعالة",
      excerpt: "تعرف على أفضل الطرق لتحقيق أقصى استفادة من وقت الدراسة",
      category: "التعليم",
      date: "15 مايو 2023",
    },
    {
      id: 2,
      title: "كيفية إدارة الوقت للطلاب",
      excerpt: "استراتيجيات عملية لتنظيم وقتك بين الدراسة والحياة الشخصية",
      category: "تنمية بشرية",
      date: "10 مايو 2023",
    },
    {
      id: 3,
      title: "أهمية القراءة في حياة الطالب",
      excerpt: "كيف يمكن للقراءة أن توسع آفاقك وتطور مهاراتك الأكاديمية",
      category: "ثقافة",
      date: "5 مايو 2023",
    },
    {
      id: 4,
      title: "كيفية كتابة البحث العلمي",
      excerpt: "دليل شامل لكتابة الأبحاث العلمية باحترافية",
      category: "التعليم",
      date: "1 مايو 2023",
    },
    {
      id: 5,
      title: "التغذية السليمة للطلاب",
      excerpt: "أهم الأطعمة التي تعزز التركيز والذاكرة أثناء الدراسة",
      category: "الصحة",
      date: "28 أبريل 2023",
    },
    {
      id: 6,
      title: "التعامل مع ضغط الامتحانات",
      excerpt: "كيف تتغلب على التوتر والقلق أثناء فترة الامتحانات",
      category: "نفسية",
      date: "25 أبريل 2023",
    },
  ];

  return (
    <div className="text-right">
      <div className="mb-8 bg-green-50 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          المقالات التعليمية
        </h1>
        <p className="text-lg">
          تصفح مجموعة المقالات التعليمية والثقافية المفيدة للطلاب
        </p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2 space-x-reverse">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
            الكل
          </button>
          <button className="px-4 py-2 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition">
            التعليم
          </button>
          <button className="px-4 py-2 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition">
            الصحة
          </button>
          <button className="px-4 py-2 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition">
            ثقافة
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="ابحث عن مقالات..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-600 text-sm font-medium">
                  {article.category}
                </span>
                <span className="text-gray-500 text-sm">{article.date}</span>
              </div>
              <h3 className="text-xl font-bold my-2">{article.title}</h3>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <Link
                to={`/article/${article.id}`}
                className="text-green-600 hover:text-green-800 font-medium transition"
              >
                اقرأ المزيد →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition">
          تحميل المزيد
        </button>
      </div>
    </div>
  );
};

export default BlogList;
