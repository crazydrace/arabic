import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${slug}`);
        setArticle(res.data);

        // Fetch related articles by category, excluding current
        const relatedRes = await axios.get(
          `http://localhost:5000/api/blogs?category=${res.data.category}`
        );
        const filteredRelated = relatedRes.data.filter((a) => a.slug !== slug);
        setRelated(filteredRelated.slice(0, 3));
      } catch (err) {
        console.error("Blog not found", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <div className="text-center py-12">جاري التحميل...</div>;
  if (!article)
    return <div className="text-center py-12">المقال غير موجود</div>;

  return (
    <div className="text-right px-4 md:px-8 lg:px-12 py-8">
      {/* Header */}
      <div className="mb-8">
        <span className="text-green-600 font-medium">{article.category}</span>
        <h1 className="text-3xl font-bold text-green-800 my-2">
          {article.title}
        </h1>
        <div className="text-gray-600 text-sm">
          بقلم <span className="font-semibold">{article.author}</span> •{" "}
          {article.date}
        </div>
      </div>

      {/* Blog Content */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12 leading-relaxed prose max-w-none prose-p:mb-4 prose-h3:text-green-800 prose-h3:font-bold prose-h3:text-xl prose-ul:pr-6 prose-ul:list-disc">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      {/* Author Info */}
      <div className="bg-green-50 rounded-lg p-6 mb-12 flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-2xl">
          {article.author.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold">{article.author}</h4>
          <p className="text-gray-600 text-sm">
            كاتب مهتم بتقديم محتوى تعليمي وثقافي هادف للطلاب والمجتمع.
          </p>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-green-800 mb-4 border-b-2 border-green-200 pb-2">
            مقالات ذات صلة
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <Link
                  to={`/blog/${item.slug}`}
                  className="text-green-600 hover:text-green-800 font-medium transition"
                >
                  اقرأ المزيد →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
