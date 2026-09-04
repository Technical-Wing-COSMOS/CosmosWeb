import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

function AdminProjects() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [image, setImage] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Load projects from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const projectData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(projectData);
        setLoadingProjects(false);
      },
      (error) => {
        console.error("Error loading projects:", error);
        setLoadingProjects(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Add or update project
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !category.trim() || !description.trim()) {
      alert("Please fill in the title, category and description.");
      return;
    }

    try {
      setLoading(true);

      const projectData = {
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        status,
        image: image.trim(),
      };

      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), projectData);

        alert("Project updated successfully!");
      } else {
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: serverTimestamp(),
        });

        alert("Project added successfully!");
      }

      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "projects", id));

      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project.");
    }
  };

  // Start editing
  const handleEdit = (project) => {
    setEditingId(project.id);
    setTitle(project.title || "");
    setCategory(project.category || "");
    setDescription(project.description || "");
    setStatus(project.status || "Ongoing");
    setImage(project.image || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Reset form
  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setCategory("");
    setDescription("");
    setStatus("Ongoing");
    setImage("");
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
            Manage Projects
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Add, edit and manage projects displayed on the COSMOS website.
          </p>
        </div>

        {/* Form */}
        <div className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-8 mb-12 transition-colors duration-300">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-semibold">
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 transition"
              >
                Cancel Edit
              </button>
            )}

          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Project Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
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
                placeholder="e.g. Web Development"
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
                placeholder="Enter project description"
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black dark:bg-black dark:border-zinc-700 dark:text-white outline-none focus:border-orange-500 transition"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
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
                Optional. You can leave this blank.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-400 transition disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Project"
                : "Add Project"}
            </button>

          </form>
        </div>

        {/* Existing Projects */}
        <div>

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-semibold">
              Existing Projects
            </h2>

            <span className="text-gray-500 text-sm">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </span>

          </div>

          {loadingProjects ? (
            <p className="text-gray-500">
              Loading projects...
            </p>
          ) : projects.length === 0 ? (
            <div className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-8 text-center transition-colors duration-300">
              <p className="text-gray-500">
                No projects have been added yet.
              </p>
            </div>
          ) : (

            <div className="space-y-4">

              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-6 transition-colors duration-300"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                    <div className="flex-1">

                      <div className="flex items-center gap-3 mb-2">

                        <h3 className="text-xl font-semibold">
                          {project.title}
                        </h3>

                        <span className="text-xs px-3 py-1 rounded-full border border-gray-300 text-gray-600 dark:border-zinc-700 dark:text-gray-400">
                          {project.status || "Ongoing"}
                        </span>

                      </div>

                      <p className="text-orange-500 text-sm mb-2">
                        {project.category || "COSMOS Project"}
                      </p>

                      <p className="text-gray-600 dark:text-gray-500">
                        {project.description}
                      </p>

                    </div>

                    <div className="flex gap-3">

                      <button
                        onClick={() => handleEdit(project)}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 dark:border-zinc-700 dark:text-gray-300 hover:border-orange-500 hover:text-orange-500 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-4 py-2 rounded-lg border border-red-300 text-red-500 dark:border-red-900 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950 transition"
                      >
                        Delete
                      </button>

                    </div>

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

export default AdminProjects;