import React from "react";

const galleryItems = [
  {
    title: "COSMOS Events",
    category: "Events",
  },
  {
    title: "Our Community",
    category: "Community",
  },
  {
    title: "Workshops",
    category: "Workshops",
  },
  {
    title: "Projects",
    category: "Projects",
  },
  {
    title: "Team",
    category: "Team",
  },
  {
    title: "Moments",
    category: "Activities",
  },
];

function Gallery() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <section className="px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">

          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-4">
            Moments
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Gallery
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            A glimpse into the people, projects, events and moments
            that make COSMOS what it is.
          </p>

        </div>
      </section>


      {/* Gallery Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {galleryItems.map((item, index) => (
              <div
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 ${
                  index === 0 || index === 3
                    ? "lg:row-span-2 min-h-[400px]"
                    : "min-h-[240px]"
                } hover:border-orange-500 transition duration-300`}
              >

                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex items-center justify-center">
                  <span className="text-4xl font-bold text-zinc-700 group-hover:text-orange-500 transition duration-300">
                    {index + 1}
                  </span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">

                  <p className="text-orange-500 text-sm uppercase tracking-widest mb-2">
                    {item.category}
                  </p>

                  <h2 className="text-2xl font-semibold">
                    {item.title}
                  </h2>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="px-6 py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-orange-500 uppercase tracking-widest text-sm mb-4">
            Be Part of the Story
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Create the next moment with us.
          </h2>

          <p className="text-gray-400 text-lg mb-8">
            Join COSMOS and become part of the community.
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

export default Gallery;