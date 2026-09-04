import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "events"),
      (snapshot) => {
        const eventData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(eventData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching events:", error);
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
            What's Happening
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Events
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Stay updated with upcoming events, workshops, sessions and
            activities happening at COSMOS.
          </p>

        </div>
      </section>

      {/* Events */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">

          {loading ? (
            <p className="text-gray-500">
              Loading events...
            </p>
          ) : events.length === 0 ? (
            <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-10 text-center">
              <h2 className="text-2xl font-semibold mb-3">
                No upcoming events
              </h2>

              <p className="text-gray-500">
                Check back soon for upcoming COSMOS events.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">

              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl overflow-hidden transition-colors duration-300 hover:border-orange-500"
                >

                  {/* Image */}
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-56 object-cover"
                    />
                  )}

                  <div className="p-6">

                    <p className="text-orange-500 text-sm uppercase tracking-widest">
                      {event.date}
                    </p>

                    <h2 className="text-2xl font-bold mt-2">
                      {event.title}
                    </h2>

                    {event.time && (
                      <p className="text-gray-600 dark:text-gray-400 mt-3">
                        🕒 {event.time}
                      </p>
                    )}

                    {event.location && (
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        📍 {event.location}
                      </p>
                    )}

                    <p className="text-gray-600 dark:text-gray-500 mt-5 leading-relaxed">
                      {event.description}
                    </p>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-zinc-800 px-6 py-8 text-center text-gray-500">
        © {new Date().getFullYear()} COSMOS • NSUT
      </footer>

    </div>
  );
}

export default Events;