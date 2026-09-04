import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";

function AdminApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "applications"),
      (snapshot) => {
        const applicationData = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setApplications(applicationData);
      },
      (error) => {
        console.error("Error loading applications:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "applications", id));
      alert("Application deleted successfully!");
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete application.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-6 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-3">
            COSMOS • Admin
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Applications
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-3">
            View applications submitted through Join COSMOS.
          </p>
        </div>

        {/* Applications */}
        {applications.length === 0 ? (
          <div className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-10 text-center transition-colors duration-300">
            <p className="text-gray-500">
              No applications received yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-6 md:p-8 transition-colors duration-300"
              >

                {/* Top */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                  <div>
                    <h2 className="text-2xl font-semibold">
                      {application.name}
                    </h2>

                    <p className="text-gray-500 dark:text-gray-500 mt-1">
                      {application.email}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(application.id)}
                    className="self-start md:self-auto px-4 py-2 rounded-lg border border-red-300 text-red-500 dark:border-red-900 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950 text-sm transition"
                  >
                    Delete
                  </button>

                </div>

                {/* Details */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                  <div className="bg-white border border-gray-200 dark:bg-black dark:border-zinc-800 rounded-xl p-4 transition-colors duration-300">
                    <p className="text-xs text-gray-500 mb-1">
                      Branch / Course
                    </p>

                    <p className="text-black dark:text-white">
                      {application.branch}
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 dark:bg-black dark:border-zinc-800 rounded-xl p-4 transition-colors duration-300">
                    <p className="text-xs text-gray-500 mb-1">
                      Year
                    </p>

                    <p className="text-black dark:text-white">
                      {application.year}
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 dark:bg-black dark:border-zinc-800 rounded-xl p-4 transition-colors duration-300">
                    <p className="text-xs text-gray-500 mb-1">
                      Area of Interest
                    </p>

                    <p className="text-black dark:text-white">
                      {application.interest}
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 dark:bg-black dark:border-zinc-800 rounded-xl p-4 transition-colors duration-300">
                    <p className="text-xs text-gray-500 mb-1">
                      Submitted
                    </p>

                    <p className="text-black dark:text-white text-sm">
                      {application.createdAt
                        ? application.createdAt.toDate().toLocaleString()
                        : "Recently"}
                    </p>
                  </div>

                </div>

                {/* About */}
                <div className="border-t border-gray-200 dark:border-zinc-800 pt-6">
                  <p className="text-xs text-gray-500 mb-2">
                    About
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {application.about}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default AdminApplications;