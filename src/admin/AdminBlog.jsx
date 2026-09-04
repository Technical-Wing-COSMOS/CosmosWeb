import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

function AdminBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "blog"));

      const blogPosts = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setPosts(blogPosts);
    } catch (error) {
      console.error("Error loading blog posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = async (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !category.trim() ||
      !date.trim() ||
      !description.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "blog"), {
        title: title.trim(),
        category: category.trim(),
        date: date.trim(),
        description: description.trim(),
        image: image.trim(),
        createdAt: serverTimestamp(),
      });

      alert("Blog post added successfully!");

      setTitle("");
      setCategory("");
      setDate("");
      setDescription("");
      setImage("");

      fetchPosts();
    } catch (error) {
      console.error("Error adding blog post:", error);
      alert("Failed to add blog post.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog post?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "blog", id));

      alert("Blog post deleted.");

      fetchPosts();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      alert("Failed to delete blog post.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-6 py-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-3">
            COSMOS • Admin
          </p>

          <h1 className="text-4xl font-bold">
            Manage Blog
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Create and manage blog posts for the COSMOS website.
          </p>
        </div>

        {/* Add Blog Post */}
        <div className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-6">
            Add New Blog Post
          </h2>

          <form onSubmit={handleAddPost} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Community, Innovation, Events"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>

              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. August 2026"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter blog description"
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Image URL
              </label>

              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 outline-none focus:border-orange-500 transition"
              />

              <p className="text-gray-500 text-sm mt-2">
                Optional. Leave blank if you don't have an image.
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-400 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Blog Post"}
            </button>

          </form>
        </div>

        {/* Existing Posts */}
        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-6">
            Existing Posts
          </h2>

          <div className="space-y-4">

            {posts.length === 0 ? (
              <p className="text-gray-500">
                No blog posts yet.
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-xl p-6 flex items-center justify-between gap-6 transition-colors duration-300"
                >
                  <div>
                    <p className="text-orange-500 text-sm">
                      {post.category}
                    </p>

                    <h3 className="text-xl font-semibold mt-1">
                      {post.title}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      {post.date}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-4 py-2 rounded-lg border border-red-300 text-red-500 dark:border-red-900 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950 transition"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminBlog;