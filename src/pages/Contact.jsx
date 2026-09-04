import React from "react";

function Contact() {
  return (
    <div className="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white">

      {/* Header */}
      <section className="px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">

          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-4">
            Get In Touch
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Contact Us
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Have a question, collaboration idea or just want to say hello?
            We'd love to hear from you.
          </p>

        </div>
      </section>


      {/* Contact Information */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold mb-8">
            Let's talk.
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Location */}
            <div className="p-6 rounded-2xl bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 transition-colors duration-300">
              <p className="text-orange-500 text-sm uppercase tracking-widest mb-2">
                Location
              </p>

              <p className="text-gray-800 dark:text-gray-300">
                Netaji Subhas University of Technology
              </p>

              <p className="text-gray-500 mt-1">
                New Delhi, India
              </p>
            </div>


            {/* General Email */}
            <div className="p-6 rounded-2xl bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 transition-colors duration-300">
              <p className="text-orange-500 text-sm uppercase tracking-widest mb-2">
                General Enquiries
              </p>

              <a
                href="mailto:contact@cosmos-nsut.example"
                className="text-gray-800 dark:text-gray-300 hover:text-orange-500 transition"
              >
                contact@cosmos-nsut.example
              </a>
            </div>


            {/* PR */}
            <div className="p-6 rounded-2xl bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 transition-colors duration-300">
              <p className="text-orange-500 text-sm uppercase tracking-widest mb-2">
                PR & Public Relations
              </p>

              <p className="text-gray-500 mb-3">
                For media, collaborations, outreach and public relations.
              </p>

              <a
                href="mailto:pr@cosmos-nsut.example"
                className="text-gray-800 dark:text-gray-300 hover:text-orange-500 transition"
              >
                pr@cosmos-nsut.example
              </a>
            </div>


            {/* Sponsorships */}
            <div className="p-6 rounded-2xl bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 transition-colors duration-300">
              <p className="text-orange-500 text-sm uppercase tracking-widest mb-2">
                Sponsorships
              </p>

              <p className="text-gray-500 mb-3">
                For sponsorship opportunities, partnerships and collaborations.
              </p>

              <a
                href="mailto:sponsorships@cosmos-nsut.example"
                className="text-gray-800 dark:text-gray-300 hover:text-orange-500 transition"
              >
                sponsorships@cosmos-nsut.example
              </a>
            </div>


            {/* Follow Us */}
            <div className="p-6 rounded-2xl bg-gray-100 border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 md:col-span-2 transition-colors duration-300">
              <p className="text-orange-500 text-sm uppercase tracking-widest mb-2">
                Follow Us
              </p>

              <div className="flex flex-wrap gap-6 mt-3">

                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition"
                >
                  Instagram
                </a>

                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition"
                >
                  LinkedIn
                </a>

                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition"
                >
                  GitHub
                </a>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-zinc-800 px-6 py-8 text-center text-gray-500">
        © {new Date().getFullYear()} COSMOS • NSUT
      </footer>

    </div>
  );
}

export default Contact;