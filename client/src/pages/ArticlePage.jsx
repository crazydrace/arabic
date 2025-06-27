import { useParams } from "react-router-dom";

const ArticlePage = () => {
  const { id } = useParams();

  // In a real app, you would fetch the article data based on the id
  const article = {
    id: 1,
    title: "نصائح للدراسة الفعالة",
    author: "أحمد محمد",
    date: "15 مايو 2023",
    category: "التعليم",
    content: `
      <p class="mb-4">الدراسة الفعالة هي مفتاح النجاح الأكاديمي، ولكن الكثير من الطلاب يجدون صعوبة في تحقيق أقصى استفادة من وقت الدراسة. في هذا المقال، سنستعرض بعض النصائح العملية لتحسين جودة وفعالية دراستك.</p>
      
      <h3 class="text-xl font-bold text-green-800 my-4">1. تنظيم الوقت</h3>
      <p class="mb-4">إن تنظيم الوقت هو الأساس لأي دراسة فعالة. قم بإنشاء جدول دراسي واقعي يأخذ في الاعتبار جميع المواد التي تحتاج إلى دراستها، مع تخصيص فترات راحة كافية. تذكر أن الجودة أهم من الكمية - ساعة من الدراسة المركزة أفضل من ثلاث ساعات من الدراسة المشتتة.</p>
      
      <h3 class="text-xl font-bold text-green-800 my-4">2. اختيار البيئة المناسبة</h3>
      <p class="mb-4">ابحث عن مكان هادئ خالٍ من المشتتات للدراسة. تأكد من أن الإضاءة جيدة وأن الكرسي مريح. تجنب الدراسة في السرير لأن هذا قد يجعلك تشعر بالنعاس. إذا كنت تفضل الدراسة مع بعض الضوضاء الخلفية، يمكنك تجربة الموسيقى الكلاسيكية أو أصوات الطبيعة.</p>
      
      <h3 class="text-xl font-bold text-green-800 my-4">3. استخدام تقنيات الدراسة الفعالة</h3>
      <p class="mb-4">هناك العديد من التقنيات التي يمكن أن تحسن من فعالية دراستك:</p>
      <ul class="list-disc pr-6 mb-4 space-y-2">
        <li>تقنية بومودورو: الدراسة لمدة 25 دقيقة ثم أخذ استراحة لمدة 5 دقائق</li>
        <li>التلخيص: كتابة الملاحظات بكلماتك الخاصة</li>
        <li>التدريس الوهمي: حاول شرح المادة لشخص وهمي</li>
        <li>الخرائط الذهنية: لتنظيم المعلومات بطريقة بصرية</li>
      </ul>
      
      <h3 class="text-xl font-bold text-green-800 my-4">4. الرعاية الذاتية</h3>
      <p class="mb-4">لا تهمل صحتك الجسدية والعقلية أثناء الدراسة. احصل على قسط كافٍ من النوم، تناول طعامًا صحيًا، ومارس الرياضة بانتظام. هذه العوامل قد تبدو غير مرتبطة بالدراسة مباشرة، ولكنها في الواقع تؤثر بشكل كبير على قدرتك على التركيز والاستيعاب.</p>
      
      <p class="mb-4">تذكر أن الدراسة الفعالة هي مهارة يمكن تطويرها مع الوقت والممارسة. جرب تقنيات مختلفة حتى تجد ما يناسبك، ولا تتردد في تعديل أسلوبك حسب احتياجاتك.</p>
    `,
    relatedArticles: [
      { id: 2, title: "كيفية إدارة الوقت للطلاب" },
      { id: 4, title: "كيفية كتابة البحث العلمي" },
      { id: 6, title: "التعامل مع ضغط الامتحانات" },
    ],
  };

  return (
    <div className="text-right">
      <div className="mb-8">
        <span className="text-green-600 font-medium">{article.category}</span>
        <h1 className="text-3xl font-bold text-green-800 my-2">
          {article.title}
        </h1>
        <div className="flex items-center text-gray-600">
          <span>بواسطة {article.author}</span>
          <span className="mx-2">•</span>
          <span>{article.date}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></div>
      </div>

      <div className="bg-green-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-green-800 mb-4">عن الكاتب</h3>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-2xl">
            {article.author.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold">{article.author}</h4>
            <p className="text-gray-600">
              كاتب ومتخصص في المجال التعليمي، يهتم بتقديم نصائح عملية للطلاب
              لتحسين أدائهم الأكاديمي.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-green-800 mb-4 border-b-2 border-green-200 pb-2">
          مقالات ذات صلة
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {article.relatedArticles.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <h4 className="font-bold text-lg mb-2">{item.title}</h4>
              <a
                href={`/article/${item.id}`}
                className="text-green-600 hover:text-green-800 font-medium transition"
              >
                اقرأ المزيد →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
