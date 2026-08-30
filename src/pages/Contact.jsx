import React, { useState } from "react";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <section className="px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">

          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-4">
            Get In Touch
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Contact Us
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Have a question, collaboration idea or just want to say hello?
            We'd love to hear from you.
          </p>

        </div>
      </section>


      {/* Contact Content */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div>

            <h2 className="text-3xl font-bold mb-8">
              Let's talk.
            </h2>

            <div className="space-y-6">

              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                <p className="text-orange-500 text-sm uppercase tracking-widest mb-2">
                  Location
                </p>

                <p className="text-gray-300">
                  Netaji Subhas University of Technology
                </p>

                <p className="text-gray-500 mt-1">
                  New Delhi, India
                </p>
              </div>


              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                <p className="text-orange-500 text-sm uppercase tracking-widest mb-2">
                  Email
                </p>

                <p className="text-gray-300">
                  cosmos@nsut.ac.in
                </p>
              </div>


              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                <p className="text-orange-500 text-sm uppercase tracking-widest mb-2">
                  Follow Us
                </p>

                <div className="flex gap-4 mt-3">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition"
                  >
                    Instagram
                  </a>

                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition"
                  >
                    LinkedIn
                  </a>

                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition"
                  >
                    GitHub
                  </a>
                </div>
              </div>

            </div>
          </div>


          {/* Contact Form */}
          <div>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8"
              >

                <h2 className="text-2xl font-semibold mb-6">
                  Send us a message
                </h2>

                {/* Name */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2">
                    Name
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-700 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>


                {/* Email */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-700 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>


                {/* Subject */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-700 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>


                {/* Message */}
                <div className="mb-7">
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>

                  <textarea
                    required
                    rows="6"
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-700 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition resize-none"
                  />
                </div>


                <button
                  type="submit"
                  className="w-full px-8 py-4 rounded-xl bg-orange-500 text-black font-semibold hover:bg-orange-400 transition"
                >
                  Send Message
                </button>

              </form>
            ) : (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">

                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-black text-3xl">
                    ✓
                  </span>
                </div>

                <h2 className="text-3xl font-bold mb-4">
                  Message Sent
                </h2>

                <p className="text-gray-400">
                  Thanks for reaching out. We'll get back to you soon.
                </p>

              </div>
            )}

          </div>

        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-8 text-center text-gray-500">
        © {new Date().getFullYear()} COSMOS • NSUT
      </footer>

    </div>
  );
}

export default Contact;