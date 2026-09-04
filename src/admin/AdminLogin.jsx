import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      window.location.href = "/admin";
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex items-center justify-center px-6 transition-colors duration-300">

      <div className="w-full max-w-md">

        {/* Logo / Heading */}
        <div className="text-center mb-10">

          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-4">
            COSMOS • NSUT
          </p>

          <h1 className="text-4xl font-bold mb-3">
            Admin Login
          </h1>

          <p className="text-gray-600 dark:text-gray-500">
            Sign in to manage the COSMOS website.
          </p>

        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-8 transition-colors duration-300"
        >

          {/* Email */}
          <div className="mb-6">

            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 focus:outline-none focus:border-orange-500 transition"
            />

          </div>

          {/* Password */}
          <div className="mb-6">

            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 focus:outline-none focus:border-orange-500 transition"
            />

          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-100 border border-red-200 text-red-600 dark:bg-red-950 dark:border-red-900 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-3 rounded-xl bg-orange-500 text-black font-semibold hover:bg-orange-400 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* Back */}
        <div className="text-center mt-6">

          <a
            href="/"
            className="text-gray-500 hover:text-orange-500 transition text-sm"
          >
            ← Back to COSMOS
          </a>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;