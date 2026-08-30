import React from "react";

const teamMembers = [
  {
    name: "Darsh Jain",
    role: "Departmental Head",
    department: "COSMOS • NSUT",
  },
  {
    name: "Team Member",
    role: "Technical Lead",
    department: "Software & Development",
  },
  {
    name: "Team Member",
    role: "Design Lead",
    department: "Design & Creative",
  },
  {
    name: "Team Member",
    role: "Project Lead",
    department: "Projects & Innovation",
  },
  {
    name: "Team Member",
    role: "Events Lead",
    department: "Events & Operations",
  },
  {
    name: "Team Member",
    role: "Content Lead",
    department: "Content & Media",
  },
];

function Team() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <section className="px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">

          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-4">
            The People
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Our Team
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Meet the people behind COSMOS — a community of students
            building, creating and exploring together.
          </p>

        </div>
      </section>


      {/* Team Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {teamMembers.map((member, index) => (
              <div
                key={`${member.name}-${index}`}
                className="group rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-orange-500 transition duration-300"
              >

                {/* Profile Image Placeholder */}
                <div className="h-72 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full border-2 border-zinc-700 flex items-center justify-center group-hover:border-orange-500 transition">
                    <span className="text-4xl font-bold text-zinc-600 group-hover:text-orange-500 transition">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                </div>


                {/* Member Info */}
                <div className="p-7">

                  <p className="text-orange-500 text-sm uppercase tracking-widest mb-2">
                    {member.role}
                  </p>

                  <h2 className="text-2xl font-semibold mb-2">
                    {member.name}
                  </h2>

                  <p className="text-gray-400">
                    {member.department}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* Join CTA */}
      <section className="px-6 py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-orange-500 uppercase tracking-widest text-sm mb-4">
            Become Part of COSMOS
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Want to build with us?
          </h2>

          <p className="text-gray-400 text-lg mb-8">
            We're always looking for people who are curious,
            creative and ready to make things happen.
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

export default Team;