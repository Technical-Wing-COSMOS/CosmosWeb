import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

function AdminProjects() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddProject = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please enter a title and description.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "projects"), {
        title: title.trim(),
        description: description.trim(),
        image: image.trim(),
        createdAt: serverTimestamp(),
      });

      alert("Project added successfully!");

      setTitle("");
      setDescription("");
      setImage("");
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="mb-10">
          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-3">
            COSMOS • Admin
          </p>

          <h1 className="text-4xl font-bold">
            Manage Projects
          </h1>

          <p className="text-gray-400 mt-3">
            Add projects that will appear on the COSMOS website.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6">
            Add New Project
          </h2>

          <form onSubmit={handleAddProject} className="space-y-6">

            <div>
              <label className="block text-gray-300 mb-2">
                Project Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Image URL
              </label>

              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-400 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Project"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default AdminProjects;