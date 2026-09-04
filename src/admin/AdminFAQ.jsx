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

function AdminFAQ() {
  const [faqs, setFaqs] = useState([]);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch FAQs from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "faq"),
      (snapshot) => {
        const faqData = snapshot.docs.map((faq) => ({
          id: faq.id,
          ...faq.data(),
        }));

        setFaqs(faqData);
      },
      (error) => {
        console.error("Error fetching FAQs:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Add or update FAQ
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      alert("Please enter both a question and an answer.");
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        // Update existing FAQ
        await updateDoc(doc(db, "faq", editingId), {
          question: question.trim(),
          answer: answer.trim(),
          updatedAt: serverTimestamp(),
        });

        alert("FAQ updated successfully!");
      } else {
        // Add new FAQ
        await addDoc(collection(db, "faq"), {
          question: question.trim(),
          answer: answer.trim(),
          createdAt: serverTimestamp(),
        });

        alert("FAQ added successfully!");
      }

      // Reset form
      setQuestion("");
      setAnswer("");
      setEditingId(null);
    } catch (error) {
      console.error("Error saving FAQ:", error);
      alert("Something went wrong while saving the FAQ.");
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const handleEdit = (faq) => {
    setQuestion(faq.question || "");
    setAnswer(faq.answer || "");
    setEditingId(faq.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete FAQ
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this FAQ?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "faq", id));
      alert("FAQ deleted successfully!");
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("Something went wrong while deleting the FAQ.");
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setQuestion("");
    setAnswer("");
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-3">
            Admin Panel
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Manage FAQ
          </h1>

          <p className="text-gray-400 mt-3">
            Add, edit and delete frequently asked questions.
          </p>
        </div>

        {/* Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-12">

          <h2 className="text-2xl font-bold mb-6">
            {editingId ? "Edit FAQ" : "Add New FAQ"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Question */}
            <div>
              <label className="block text-gray-300 mb-2">
                Question
              </label>

              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. What is COSMOS?"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500"
              />
            </div>

            {/* Answer */}
            <div>
              <label className="block text-gray-300 mb-2">
                Answer
              </label>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter the answer..."
                rows="5"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">

              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update FAQ"
                  : "Add FAQ"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="border border-zinc-700 hover:border-zinc-500 px-6 py-3 rounded-lg transition"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </div>

        {/* Existing FAQs */}
        <div>

          <h2 className="text-2xl font-bold mb-6">
            Existing FAQs
          </h2>

          {faqs.length === 0 ? (
            <div className="border border-zinc-800 rounded-2xl p-8 text-center">
              <p className="text-gray-500">
                No FAQs added yet.
              </p>
            </div>
          ) : (
            <div className="space-y-5">

              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                >

                  <div className="flex justify-between gap-4">

                    <div className="flex-1">

                      <p className="text-orange-500 text-sm mb-2">
                        FAQ {index + 1}
                      </p>

                      <h3 className="text-xl font-semibold">
                        {faq.question}
                      </h3>

                      <p className="text-gray-400 mt-3 leading-relaxed">
                        {faq.answer}
                      </p>

                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 shrink-0">

                      <button
                        onClick={() => handleEdit(faq)}
                        className="text-orange-500 hover:text-orange-400 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="text-red-400 hover:text-red-300 transition"
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

export default AdminFAQ;