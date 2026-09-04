import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white">

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">

          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-6">
            NSUT • Student Society
          </p>

          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            COSMOS
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10">
            Exploring ideas. Building the future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            {/* Go to Projects */}
            <Link
              to="/projects"
              className="px-8 py-3 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-400 transition"
            >
              Explore Our Work
            </Link>

            {/* Go to Join Us */}
            <Link
              to="/join"
              className="px-8 py-3 rounded-full border border-gray-300 hover:border-orange-500 dark:border-gray-600 transition"
            >
              Join Us
            </Link>

          </div>
        </div>
      </section>


      {/* About Section */}
      <section className="px-6 py-24 bg-gray-100 dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">

          <p className="text-orange-500 uppercase tracking-widest text-sm mb-3">
            About Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            More than a society.
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
            COSMOS is a student-driven community at NSUT bringing together
            creativity, technology, collaboration and innovation. We create,
            learn and work together to turn ideas into meaningful projects.
          </p>

        </div>
      </section>


      {/* Highlights */}
      <section className="px-6 py-24 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">

          <p className="text-orange-500 uppercase tracking-widest text-sm mb-3">
            What We Do
          </p>

          <h2 className="text-4xl font-bold mb-12">
            Explore COSMOS
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: "Projects",
                text: "Discover the projects and work created by our members.",
                link: "/projects",
              },
              {
                title: "Our Team",
                text: "Meet the people who make COSMOS what it is.",
                link: "/team",
              },
              {
                title: "Events",
                text: "Stay updated with our latest events and activities.",
                link: "/events",
              },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.link}
                className="block p-8 rounded-2xl bg-gray-100 border border-gray-200 hover:border-orange-500 transition dark:bg-zinc-900 dark:border-zinc-800"
              >
                <h3 className="text-2xl font-semibold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400">
                  {item.text}
                </p>

                <span className="inline-block mt-6 text-orange-500">
                  Explore →
                </span>
              </Link>
            ))}

          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-zinc-800 px-6 py-8 text-center text-gray-500 dark:text-gray-500">
        © {new Date().getFullYear()} COSMOS • NSUT
      </footer>

    </div>
  );
}

export default Home;