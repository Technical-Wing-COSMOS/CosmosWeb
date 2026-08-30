import React from "react";

const posts = [
  {
    title: "Welcome to COSMOS",
    category: "Community",
    date: "August 2026",
    description:
      "Discover what COSMOS is, what we stand for, and how we're building a community around creativity, technology and innovation.",
  },
  {
    title: "Building Through Collaboration",
    category: "Innovation",
    date: "August 2026",
    description:
      "Great ideas become stronger when different people bring their skills and perspectives together.",
  },
  {
    title: "What's Happening at COSMOS",
    category: "Events",
    date: "August 2026",
    description:
      "Stay updated with the latest activities, events and opportunities happening within the COSMOS community.",
  },
];

function Blog() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <section className="px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">

          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-4">
            News & Stories
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Blog
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Stories, updates, ideas and insights from the COSMOS community.
          </p>

        </div>
      </section>


      {/* Blog Posts */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {posts.map((post) => (
              <article
                key={post.title}
                className="group rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-orange-500 transition duration-300"
              >

                {/* Image Placeholder */}
                <div className="h-56 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
                  <span className="text-5xl font-bold text-zinc-700 group-hover:text-orange-500 transition">
                    COSMOS
                  </span>
                </div>


                {/* Content */}
                <div className="p-7">

                  <div className="flex items-center justify-between mb-5">
                    <span className="text-orange-500 text-sm font-medium">
                      {post.category}
                    </span>

                    <span className="text-sm text-gray-500">
                      {post.date}
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold mb-4">
                    {post.title}
                  </h2>

                  <p className="text-gray-400 leading-relaxed">
                    {post.description}
                  </p>

                  <button className="mt-6 text-orange-500 font-medium hover:text-orange-400 transition">
                    Read More →
                  </button>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>


      {/* Newsletter / CTA */}
      <section className="px-6 py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-orange-500 uppercase tracking-widest text-sm mb-4">
            Stay Connected
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Don't miss what's next.
          </h2>

          <p className="text-gray-400 text-lg mb-8">
            Follow COSMOS for the latest projects, events and updates.
          </p>

          <a
            href="/join"
            className="inline-block px-8 py-3 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-400 transition"
          >
            Join COSMOS
          </a>

        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-8 text-center text-gray-500">
        © {new Date().getFullYear()} COSMOS • NSUT
      </footer>

    </div>
  );
}

export default Blog;