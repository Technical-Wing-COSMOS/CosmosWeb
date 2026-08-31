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
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <header className="border-b border-zinc-800">
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
            className="px-5 py-2 rounded-xl border border-zinc-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 transition"
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

          <p className="text-gray-400 mt-3 max-w-2xl">
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

          <DashboardCard
            title="Alumni"
            description="Manage alumni profiles and information."
          />

          <DashboardCard
            title="Applications"
            description="View applications submitted through Join Us."
          />

          <DashboardCard
            title="Messages"
            description="View messages submitted through Contact Us."
          />

          <DashboardCard
            title="FAQ"
            description="Manage frequently asked questions."
          />

          <DashboardCard
            title="Events"
            description="Create and manage upcoming events."
          />

        </div>

      </main>

    </div>
  );
}


function DashboardCard({ title, description }) {
  return (
    <div className="group p-7 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-500 transition cursor-pointer">

      <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center mb-5 group-hover:bg-orange-500 transition">

        <span className="text-orange-500 group-hover:text-black font-bold">
          +
        </span>

      </div>

      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p className="text-gray-500 leading-relaxed">
        {description}
      </p>

    </div>
  );
}

export default AdminDashboard;