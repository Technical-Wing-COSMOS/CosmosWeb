import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "blog"),
      (snapshot) => {
        const blogPosts = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setPosts(blogPosts);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading blog posts:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

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

          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-500">
                Loading posts...
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">
                No blog posts have been published yet.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-orange-500 transition duration-300"
                >

                  {/* Image */}
                  <div className="h-56 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center overflow-hidden">

                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <span className="text-4xl font-bold text-zinc-700 group-hover:text-orange-500 transition">
                        COSMOS
                      </span>
                    )}

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
          )}

        </div>
      </section>

      {/* CTA */}
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