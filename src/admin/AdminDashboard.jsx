import { Link } from "react-router-dom";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

function AdminDashboard() {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white">

      {/* Header */}
      <header className="border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <p className="text-orange-500 text-xs uppercase tracking-[0.3em]">
              COSMOS • NSUT
            </p>

            <h1 className="text-2xl font-bold mt-1">
              Admin Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 dark:border-zinc-700 dark:text-gray-300 transition"
          >
            Logout
          </button>

        </div>
      </header>


      {/* Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        <div className="mb-10">

          <p className="text-gray-500 text-sm">
            Welcome back
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Manage COSMOS
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl">
            Manage website content, projects, team members, events,
            applications and more from one place.
          </p>

        </div>


        {/* Management Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <Link to="/admin/projects">
            <DashboardCard
              title="Projects"
              description="Manage COSMOS projects."
            />
          </Link>

          <Link to="/admin/team">
            <DashboardCard
              title="Team"
              description="Manage current team members and roles."
            />
          </Link>

          <Link to="/admin/blog">
            <DashboardCard
              title="Blog"
              description="Create and manage blog posts."
            />
          </Link>

          <Link to="/admin/gallery">
            <DashboardCard
              title="Gallery"
              description="Upload and manage gallery images."
            />
          </Link>

          <Link to="/admin/alumni">
            <DashboardCard
              title="Alumni"
              description="Manage alumni profiles and information."
            />
          </Link>

          <Link to="/admin/applications">
            <DashboardCard
              title="Applications"
              description="View applications submitted through Join Us."
            />
          </Link>

          <Link to="/admin/faq">
            <DashboardCard
              title="FAQ"
              description="Manage frequently asked questions."
            />
          </Link>

          <Link to="/admin/events">
            <DashboardCard
              title="Events"
              description="Create and manage upcoming COSMOS events."
            />
          </Link>

        </div>

      </main>

    </div>
  );
}


function DashboardCard({ title, description }) {
  return (
    <div className="group p-7 rounded-2xl bg-gray-100 border border-gray-200 hover:border-orange-500 dark:bg-zinc-900 dark:border-zinc-800 transition duration-300 cursor-pointer">

      <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-zinc-800 flex items-center justify-center mb-5 group-hover:bg-orange-500 transition">

        <span className="text-orange-500 group-hover:text-black font-bold">
          +
        </span>

      </div>

      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-500 leading-relaxed">
        {description}
      </p>

    </div>
  );
}

export default AdminDashboard;