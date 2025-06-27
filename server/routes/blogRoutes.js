const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

router.get("/:slug", async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  blog ? res.json(blog) : res.status(404).json({ error: "Blog not found" });
});

router.post("/", async (req, res) => {
  const { title, author, content, email, category } = req.body;
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  try {
    const blog = new Blog({
      title,
      author,
      content,
      slug,
      email,
      category,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch {
    res.status(400).json({ error: "Failed to post blog" });
  }
  if (!title || !author || !content || !email || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }
});

module.exports = router;
