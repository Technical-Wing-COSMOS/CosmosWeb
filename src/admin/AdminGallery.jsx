import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

function AdminGallery() {
  const [images, setImages] = useState([]);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "gallery"),
      (snapshot) => {
        const galleryData = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setImages(galleryData);
      },
      (error) => {
        console.error("Error loading gallery:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAddImage = async (e) => {
    e.preventDefault();

    if (!title.trim() || !image.trim()) {
      alert("Please enter a title and image URL.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "gallery"), {
        title: title.trim(),
        image: image.trim(),
        category: category.trim(),
        createdAt: serverTimestamp(),
      });

      alert("Gallery image added successfully!");

      setTitle("");
      setImage("");
      setCategory("");
    } catch (error) {
      console.error("Error adding gallery image:", error);
      alert("Failed to add gallery image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "gallery", id));

      alert("Gallery image deleted successfully!");
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      alert("Failed to delete gallery image.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-6 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-3">
            COSMOS • Admin
          </p>

          <h1 className="text-4xl font-bold">
            Manage Gallery
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Add and manage images displayed in the COSMOS gallery.
          </p>
        </div>

        {/* Add Image */}
        <div className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-8 mb-12 transition-colors duration-300">

          <h2 className="text-2xl font-semibold mb-6">
            Add Gallery Image
          </h2>

          <form onSubmit={handleAddImage} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. COSMOS Orientation 2026"
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
                placeholder="e.g. Events"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Image URL */}
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
                Use an externally hosted image URL. Firebase Storage is not
                required.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-400 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Image"}
            </button>

          </form>
        </div>

        {/* Existing Images */}
        <div>

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-semibold">
              Existing Images
            </h2>

            <span className="text-gray-500 text-sm">
              {images.length} image{images.length !== 1 ? "s" : ""}
            </span>

          </div>

          {images.length === 0 ? (
            <div className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-8 text-center transition-colors duration-300">
              <p className="text-gray-500">
                No gallery images have been added yet.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {images.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl overflow-hidden transition-colors duration-300"
                >

                  <div className="h-56 bg-gray-200 dark:bg-zinc-800">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                  </div>

                  <div className="p-5">

                    <p className="text-orange-500 text-sm mb-1">
                      {item.category || "Gallery"}
                    </p>

                    <h3 className="text-lg font-semibold mb-4">
                      {item.title}
                    </h3>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 rounded-lg border border-red-300 text-red-500 dark:border-red-900 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950 transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminGallery;