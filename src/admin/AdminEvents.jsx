import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

function AdminEvents() {
  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch events
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "events"),
      (snapshot) => {
        const eventData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(eventData);
      }
    );

    return () => unsubscribe();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add event
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.description) {
      alert("Please fill in the required fields.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "events"), {
        title: formData.title.trim(),
        date: formData.date,
        time: formData.time.trim(),
        location: formData.location.trim(),
        description: formData.description.trim(),
        image: formData.image.trim(),
        createdAt: serverTimestamp(),
      });

      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        image: "",
      });

      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event.");
    } finally {
      setLoading(false);
    }
  };

  // Delete event
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "events", id));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-6 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-3">
            COSMOS • Admin
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Manage Events
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Create and manage COSMOS events.
          </p>
        </div>

        {/* Add Event Form */}
        <div className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-6 md:p-8 mb-12 transition-colors duration-300">

          <h2 className="text-2xl font-bold mb-6">
            Add New Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Event Title *
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. COSMOS Orientation 2026"
                className="w-full bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 rounded-lg px-4 py-3 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Date + Time */}
            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Date *
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 text-black dark:bg-black dark:border-zinc-700 dark:text-white rounded-lg px-4 py-3 outline-none focus:border-orange-500 transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Time
                </label>

                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="e.g. 4:00 PM"
                  className="w-full bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 rounded-lg px-4 py-3 outline-none focus:border-orange-500 transition"
                />
              </div>

            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. NSUT Main Auditorium"
                className="w-full bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 rounded-lg px-4 py-3 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the event..."
                rows="5"
                className="w-full bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 rounded-lg px-4 py-3 outline-none focus:border-orange-500 resize-none transition"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Paste image URL"
                className="w-full bg-white border border-gray-300 text-black placeholder-gray-400 dark:bg-black dark:border-zinc-700 dark:text-white dark:placeholder-gray-600 rounded-lg px-4 py-3 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-400 text-black font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Event"}
            </button>

          </form>
        </div>

        {/* Existing Events */}
        <div>

          <h2 className="text-2xl font-bold mb-6">
            Existing Events
          </h2>

          {events.length === 0 ? (
            <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 text-center text-gray-500">
              No events added yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">

              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-6 transition-colors duration-300"
                >

                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-xl mb-5"
                    />
                  )}

                  <h3 className="text-xl font-bold">
                    {event.title}
                  </h3>

                  <p className="text-orange-500 mt-2">
                    {event.date}
                  </p>

                  {event.time && (
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {event.time}
                    </p>
                  )}

                  {event.location && (
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      📍 {event.location}
                    </p>
                  )}

                  <p className="text-gray-600 dark:text-gray-400 mt-4">
                    {event.description}
                  </p>

                  <button
                    onClick={() => handleDelete(event.id)}
                    className="mt-5 px-4 py-2 rounded-lg border border-red-300 text-red-500 dark:border-red-900 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950 transition"
                  >
                    Delete Event
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminEvents;