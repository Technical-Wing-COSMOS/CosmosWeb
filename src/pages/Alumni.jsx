import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

function Alumni() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "alumni"),
      (snapshot) => {
        const alumniData = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setAlumni(alumniData);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading alumni:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white">

      {/* Header */}
      <section className="px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">

          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-4">
            Our Legacy
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Alumni
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            The people who helped shape COSMOS and continue to carry
            its spirit beyond NSUT.
          </p>

        </div>
      </section>

      {/* Alumni Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">

          {loading ? (
            <div className="text-center text-gray-500 py-16">
              Loading alumni...
            </div>
          ) : alumni.length === 0 ? (
            <div className="text-center text-gray-500 py-16">
              No alumni profiles available yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {alumni.map((person) => (
                <div
                  key={person.id}
                  className="group rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden hover:border-orange-500 transition duration-300 dark:bg-zinc-900 dark:border-zinc-800"
                >

                  {/* Profile Image */}
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-zinc-800 dark:to-zinc-950 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-zinc-700 flex items-center justify-center group-hover:border-orange-500 transition">
                        <span className="text-3xl font-bold text-gray-400 dark:text-zinc-600 group-hover:text-orange-500 transition">
                          {person.name?.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}

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

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {person.description}
                    </p>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </section>

      {/* Legacy Section */}
      <section className="px-6 py-24 bg-gray-100 border-t border-gray-200 dark:bg-zinc-950 dark:border-zinc-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-orange-500 uppercase tracking-widest text-sm mb-4">
            Beyond NSUT
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Once COSMOS, always COSMOS.
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            Our alumni remain an important part of the COSMOS community.
            Their experiences, knowledge and achievements continue to
            inspire the next generation.
          </p>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-zinc-800 px-6 py-8 text-center text-gray-500">
        © {new Date().getFullYear()} COSMOS • NSUT
      </footer>

    </div>
  );
}

export default Alumni;