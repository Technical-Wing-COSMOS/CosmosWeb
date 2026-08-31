import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "team"),
      (snapshot) => {
        const memberData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMembers(memberData);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading team:", error);
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
            The People
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Our Team
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Meet the people behind COSMOS — building, creating and
            exploring together.
          </p>

        </div>
      </section>

      {/* Team Members */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">

          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-500">
                Loading team...
              </p>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">
                No team members have been added yet.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {members.map((member) => (
                <div
                  key={member.id}
                  className="group rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-orange-500 transition duration-300"
                >

                  {/* Image */}
                  <div className="h-72 bg-zinc-800 flex items-center justify-center overflow-hidden">

                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <span className="text-6xl font-bold text-zinc-700 group-hover:text-orange-500 transition">
                        {member.name?.charAt(0)}
                      </span>
                    )}

                  </div>

                  {/* Content */}
                  <div className="p-7">

                    <p className="text-orange-500 text-sm font-medium mb-2">
                      {member.department}
                    </p>

                    <h2 className="text-2xl font-semibold mb-1">
                      {member.name}
                    </h2>

                    <p className="text-gray-400 mb-4">
                      {member.role}
                    </p>

                    {member.description && (
                      <p className="text-gray-500 leading-relaxed">
                        {member.description}
                      </p>
                    )}

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-orange-500 uppercase tracking-widest text-sm mb-4">
            Join Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Want to be part of COSMOS?
          </h2>

          <p className="text-gray-400 text-lg mb-8">
            Build, learn and create with us.
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