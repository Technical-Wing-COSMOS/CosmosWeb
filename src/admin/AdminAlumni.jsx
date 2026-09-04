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

function AdminAlumni() {
  const [alumni, setAlumni] = useState([]);

  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  // Load alumni from Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "alumni"),
      (snapshot) => {
        const alumniData = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setAlumni(alumniData);
      },
      (error) => {
        console.error("Error loading alumni:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Add alumni
  const handleAddAlumni = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !batch.trim() ||
      !role.trim() ||
      !description.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "alumni"), {
        name: name.trim(),
        batch: batch.trim(),
        role: role.trim(),
        description: description.trim(),
        image: image.trim(),
        createdAt: serverTimestamp(),
      });

      alert("Alumni added successfully!");

      setName("");
      setBatch("");
      setRole("");
      setDescription("");
      setImage("");
    } catch (error) {
      console.error("Error adding alumni:", error);
      alert("Failed to add alumni.");
    } finally {
      setLoading(false);
    }
  };

  // Delete alumni
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this alumni?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "alumni", id));

      alert("Alumni deleted successfully!");
    } catch (error) {
      console.error("Error deleting alumni:", error);
      alert("Failed to delete alumni.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-6 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-3">
            COSMOS • Admin
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Manage Alumni
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Add and manage COSMOS alumni profiles.
          </p>
        </div>

        {/* Add Alumni Form */}
        <div className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-6 md:p-8 mb-12 transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-6">
            Add Alumni
          </h2>

          <form onSubmit={handleAddAlumni} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aryan Sharma"
                className="w-full bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Batch */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Batch
              </label>

              <input
                type="text"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                placeholder="e.g. Batch 2025"
                className="w-full bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>

              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Former Technical Lead"
                className="w-full bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a short description..."
                rows="4"
                className="w-full bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 rounded-xl px-4 py-3 outline-none focus:border-orange-500 resize-none transition"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Profile Image URL
                <span className="text-gray-500 dark:text-gray-600 ml-2">
                  (optional)
                </span>
              </label>

              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-black font-semibold px-6 py-3 rounded-xl transition"
            >
              {loading ? "Adding..." : "Add Alumni"}
            </button>

          </form>
        </div>

        {/* Existing Alumni */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Existing Alumni
          </h2>

          {alumni.length === 0 ? (
            <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 text-center text-gray-500 dark:text-gray-500">
              No alumni added yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {alumni.map((person) => (
                <div
                  key={person.id}
                  className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl overflow-hidden transition-colors duration-300"
                >

                  {/* Image */}
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-56 object-cover"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-200 dark:bg-gradient-to-br dark:from-zinc-800 dark:to-zinc-950 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border-2 border-gray-300 dark:border-zinc-700 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-400 dark:text-zinc-600">
                          {person.name?.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-6">

                    <div className="flex justify-between items-center mb-3 gap-3">
                      <span className="text-orange-500 text-sm">
                        {person.role}
                      </span>

                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {person.batch}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-3">
                      {person.name}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                      {person.description}
                    </p>

                    <button
                      onClick={() => handleDelete(person.id)}
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

export default AdminAlumni;