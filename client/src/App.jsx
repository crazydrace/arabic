import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import SubmitBlog from "./pages/SubmitBlog";
import ArticlePage from "./pages/ArticlePage";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email || "");
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="">
      <BrowserRouter>
        <Navbar userEmail={userEmail} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList userEmail={userEmail} />} />
          <Route
            path="/submit"
            element={<SubmitBlog userEmail={userEmail} />}
          />
          <Route
            path="/blog/:slug"
            element={<ArticlePage userEmail={userEmail} />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<Dashboard userEmail={userEmail} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
