import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectsQuery = query(
      collection(db, "projects"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      projectsQuery,
      (snapshot) => {
        const projectData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(projectData);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading projects:", error);
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
            Our Work
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Projects
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Ideas become reality when people come together to build.
            Explore the projects created by the COSMOS community.
          </p>

        </div>
      </section>


      {/* Projects */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">

          {loading ? (
            <p className="text-gray-500 text-center">
              Loading projects...
            </p>
          ) : projects.length === 0 ? (
            <p className="text-gray-500 text-center">
              No projects have been added yet.
            </p>
          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-orange-500 transition duration-300"
                >

                  {/* Project Image */}
                  <div className="h-52 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center overflow-hidden">

                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl font-bold text-zinc-700 group-hover:text-orange-500 transition">
                        {project.title?.charAt(0)}
                      </span>
                    )}

                  </div>


                  {/* Project Content */}
                  <div className="p-7">

                    <div className="flex items-center justify-between mb-4">

                      <span className="text-orange-500 text-sm font-medium">
                        {project.category || "COSMOS Project"}
                      </span>

                      <span className="text-xs px-3 py-1 rounded-full border border-zinc-700 text-gray-400">
                        {project.status || "Ongoing"}
                      </span>

                    </div>


                    <h2 className="text-2xl font-semibold mb-4">
                      {project.title}
                    </h2>


                    <p className="text-gray-400 leading-relaxed">
                      {project.description}
                    </p>


                    <button className="mt-6 text-orange-500 font-medium hover:text-orange-400 transition">
                      View Project →
                    </button>

                  </div>

                </div>
              ))}

            </div>

          )}

        </div>
      </section>


      {/* Bottom CTA */}
      <section className="px-6 py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-orange-500 uppercase tracking-widest text-sm mb-4">
            Have an idea?
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's build something together.
          </h2>

          <p className="text-gray-400 text-lg mb-8">
            Join COSMOS and turn your ideas into real projects.
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

export default Projects;