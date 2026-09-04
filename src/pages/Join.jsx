import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

function Join() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
    interest: "",
    about: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addDoc(collection(db, "applications"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        branch: formData.branch.trim(),
        year: formData.year,
        interest: formData.interest,
        about: formData.about.trim(),
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        branch: "",
        year: "",
        interest: "",
        about: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white">

      {/* Header */}
      <section className="px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">

          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-4">
            Get Involved
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Join COSMOS
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
            Have an idea? Want to build something? Looking for a community
            that helps you learn and grow? We'd love to hear from you.
          </p>

        </div>
      </section>

      {/* Application Form */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-6 md:p-10 transition-colors duration-300"
            >

              {/* Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 focus:outline-none focus:border-orange-500 transition"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 focus:outline-none focus:border-orange-500 transition"
                />
              </div>

              {/* Branch */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Branch / Course
                </label>

                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                  placeholder="e.g. CSE, ECE, IT..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 focus:outline-none focus:border-orange-500 transition"
                />
              </div>

              {/* Year */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Year
                </label>

                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-black dark:bg-black dark:border-zinc-700 dark:text-white focus:outline-none focus:border-orange-500 transition"
                >
                  <option value="" disabled>
                    Select your year
                  </option>

                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              {/* Interests */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Area of Interest
                </label>

                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-black dark:bg-black dark:border-zinc-700 dark:text-white focus:outline-none focus:border-orange-500 transition"
                >
                  <option value="" disabled>
                    Select an area
                  </option>

                  <option value="development">Development</option>
                  <option value="design">Design</option>
                  <option value="research">Research</option>
                  <option value="events">Events</option>
                  <option value="content">Content</option>
                  <option value="management">Management</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* About */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">
                  Tell us about yourself
                </label>

                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us about your interests, skills, ideas or anything you'd like us to know..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 focus:outline-none focus:border-orange-500 transition resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 rounded-xl bg-orange-500 text-black font-semibold hover:bg-orange-400 disabled:opacity-50 transition"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>

            </form>
          ) : (

            /* Success Message */
            <div className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-10 md:p-16 text-center transition-colors duration-300">

              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-orange-500 flex items-center justify-center">
                <span className="text-black text-3xl">
                  ✓
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Application Received
              </h2>

              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                Thanks for your interest in COSMOS. We'll get back to you
                with the next steps.
              </p>

            </div>

          )}

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-zinc-800 px-6 py-8 text-center text-gray-500">
        © {new Date().getFullYear()} COSMOS • NSUT
      </footer>

    </div>
  );
}

export default Join;