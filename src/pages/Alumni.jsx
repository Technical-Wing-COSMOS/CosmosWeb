import React from "react";

const alumni = [
  {
    name: "Alumni Name",
    batch: "Batch 2024",
    role: "Former Departmental Head",
    description:
      "Former member of COSMOS who contributed to projects, initiatives and the growth of the community.",
  },
  {
    name: "Alumni Name",
    batch: "Batch 2025",
    role: "Former Technical Lead",
    description:
      "Former member who worked on technical projects and helped build the society's digital ecosystem.",
  },
  {
    name: "Alumni Name",
    batch: "Batch 2025",
    role: "Former Project Lead",
    description:
      "Former member who contributed to projects and collaborative initiatives within COSMOS.",
  },
];

function Alumni() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <section className="px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">

          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-4">
            Our Legacy
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Alumni
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            The people who helped shape COSMOS and continue to carry
            its spirit beyond NSUT.
          </p>

        </div>
      </section>


      {/* Alumni Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {alumni.map((person, index) => (
              <div
                key={`${person.name}-${index}`}
                className="group rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-orange-500 transition duration-300"
              >

                {/* Profile Placeholder */}
                <div className="h-64 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-2 border-zinc-700 flex items-center justify-center group-hover:border-orange-500 transition">
                    <span className="text-3xl font-bold text-zinc-600 group-hover:text-orange-500 transition">
                      {person.name.charAt(0)}
                    </span>
                  </div>
                </div>


                {/* Info */}
                <div className="p-7">

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-orange-500 text-sm">
                      {person.role}
                    </span>

                    <span className="text-xs text-gray-500">
                      {person.batch}
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold mb-4">
                    {person.name}
                  </h2>

                  <p className="text-gray-400 leading-relaxed">
                    {person.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* Legacy Section */}
      <section className="px-6 py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-orange-500 uppercase tracking-widest text-sm mb-4">
            Beyond NSUT
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Once COSMOS, always COSMOS.
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            Our alumni remain an important part of the COSMOS community.
            Their experiences, knowledge and achievements continue to
            inspire the next generation.
          </p>

        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-8 text-center text-gray-500">
        © {new Date().getFullYear()} COSMOS • NSUT
      </footer>

    </div>
  );
}

export default Alumni;