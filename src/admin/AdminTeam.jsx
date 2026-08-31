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

function AdminTeam() {
  const [members, setMembers] = useState([]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "team"),
      (snapshot) => {
        const memberData = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setMembers(memberData);
        setLoadingMembers(false);
      },
      (error) => {
        console.error("Error loading team:", error);
        setLoadingMembers(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !role.trim() || !department.trim()) {
      alert("Please fill in name, role and department.");
      return;
    }

    try {
      setLoading(true);

      const memberData = {
        name: name.trim(),
        role: role.trim(),
        department: department.trim(),
        description: description.trim(),
        image: image.trim(),
      };

      if (editingId) {
        await updateDoc(doc(db, "team", editingId), memberData);
        alert("Team member updated successfully!");
      } else {
        await addDoc(collection(db, "team"), {
          ...memberData,
          createdAt: serverTimestamp(),
        });

        alert("Team member added successfully!");
      }

      resetForm();
    } catch (error) {
      console.error("Error saving team member:", error);
      alert("Failed to save team member.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this team member?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "team", id));
      alert("Team member deleted successfully!");
    } catch (error) {
      console.error("Error deleting team member:", error);
      alert("Failed to delete team member.");
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setName(member.name || "");
    setRole(member.role || "");
    setDepartment(member.department || "");
    setDescription(member.description || "");
    setImage(member.image || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setRole("");
    setDepartment("");
    setDescription("");
    setImage("");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-3">
            COSMOS • Admin
          </p>

          <h1 className="text-4xl font-bold">
            Manage Team
          </h1>

          <p className="text-gray-400 mt-3">
            Add, edit and manage COSMOS team members.
          </p>
        </div>

        {/* Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {editingId ? "Edit Team Member" : "Add Team Member"}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-gray-400 hover:text-orange-500 transition"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-gray-300 mb-2">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter member name"
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-orange-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-300 mb-2">
                Role
              </label>

              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Department Head"
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-orange-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-gray-300 mb-2">
                Department
              </label>

              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Web Development"
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-orange-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-300 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description"
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-orange-500"
              />
            </div>

            {/* Image */}
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

              <p className="text-gray-500 text-sm mt-2">
                Optional. Leave blank if you don't have an image.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-400 transition disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Member"
                : "Add Member"}
            </button>

          </form>
        </div>

        {/* Existing Members */}
        <div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Existing Team Members
            </h2>

            <span className="text-gray-500 text-sm">
              {members.length} member{members.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loadingMembers ? (
            <p className="text-gray-500">
              Loading team members...
            </p>
          ) : members.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
              <p className="text-gray-500">
                No team members have been added yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">

              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                    <div className="flex-1">

                      <h3 className="text-xl font-semibold">
                        {member.name}
                      </h3>

                      <p className="text-orange-500 text-sm mt-1">
                        {member.role}
                      </p>

                      <p className="text-gray-500 text-sm mt-1">
                        {member.department}
                      </p>

                      {member.description && (
                        <p className="text-gray-500 mt-3">
                          {member.description}
                        </p>
                      )}

                    </div>

                    <div className="flex gap-3">

                      <button
                        onClick={() => handleEdit(member)}
                        className="px-4 py-2 rounded-lg border border-zinc-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(member.id)}
                        className="px-4 py-2 rounded-lg border border-red-900 text-red-400 hover:bg-red-950 transition"
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

export default AdminTeam;