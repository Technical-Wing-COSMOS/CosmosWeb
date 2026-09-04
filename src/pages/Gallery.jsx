import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "gallery"),
      (snapshot) => {
        const galleryData = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setImages(galleryData);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading gallery:", error);
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
            Moments
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Gallery
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            A collection of moments, events and experiences from the
            COSMOS community.
          </p>

        </div>
      </section>


      {/* Gallery */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">

          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-500">
                Loading gallery...
              </p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">
                No gallery images have been added yet.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {images.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden hover:border-orange-500 transition duration-300 dark:bg-zinc-900 dark:border-zinc-800"
                >

                  <div className="h-72 bg-gray-200 dark:bg-zinc-800 overflow-hidden">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                  </div>

                  <div className="p-6">

                    <p className="text-orange-500 text-sm font-medium mb-2">
                      {item.category || "COSMOS"}
                    </p>

                    <h2 className="text-xl font-semibold">
                      {item.title}
                    </h2>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </section>


      {/* CTA */}
      <section className="px-6 py-24 bg-gray-100 border-t border-gray-200 dark:bg-zinc-950 dark:border-zinc-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-orange-500 uppercase tracking-widest text-sm mb-4">
            COSMOS
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            More moments to come.
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Follow COSMOS as we continue building, learning and creating
            together.
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
      <footer className="border-t border-gray-200 dark:border-zinc-800 px-6 py-8 text-center text-gray-500">
        © {new Date().getFullYear()} COSMOS • NSUT
      </footer>

    </div>
  );
}

export default Gallery;