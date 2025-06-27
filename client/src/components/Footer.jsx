const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-xl font-bold mb-4">مدونة الطالب</h3>
        <p className="mb-4">
          منصة عربية لنشر المقالات والمواد التعليمية للطلاب
        </p>
        <div className="flex justify-center space-x-4 space-x-reverse mb-4">
          <a href="#" className="hover:text-green-200 transition">
            تواصل معنا
          </a>
          <a href="#" className="hover:text-green-200 transition">
            شروط الاستخدام
          </a>
          <a href="#" className="hover:text-green-200 transition">
            سياسة الخصوصية
          </a>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
};

export default Footer;
