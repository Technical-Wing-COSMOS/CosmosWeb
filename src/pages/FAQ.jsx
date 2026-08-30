import React, { useState } from "react";

const faqs = [
  {
    question: "What is COSMOS?",
    answer:
      "COSMOS is a student-driven community at NSUT focused on technology, creativity, innovation and collaboration.",
  },
  {
    question: "Who can join COSMOS?",
    answer:
      "Students who are interested in learning, building, creating and contributing to the community can apply to join COSMOS.",
  },
  {
    question: "Do I need prior experience to join?",
    answer:
      "No. Curiosity and willingness to learn matter more than prior experience. You can contribute while developing your skills.",
  },
  {
    question: "What kind of projects does COSMOS work on?",
    answer:
      "Our projects can span technology, software, research, creative work and other areas where members want to experiment and build.",
  },
  {
    question: "Does COSMOS organize events?",
    answer:
      "Yes. COSMOS can organize workshops, orientations, activities and other events for students and the wider community.",
  },
  {
    question: "How can I become a member?",
    answer:
      "Visit the Join Us page and submit your application. Our team will get in touch with you regarding the next steps.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <section className="px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">

          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm mb-4">
            Questions
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            FAQ
          </h1>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Everything you need to know about COSMOS, our community
            and how you can get involved.
          </p>

        </div>
      </section>


      {/* FAQ List */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto space-y-4">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition"
              >

                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left"
                >
                  <span className="text-lg md:text-xl font-semibold pr-6">
                    {faq.question}
                  </span>

                  <span
                    className={`text-2xl text-orange-500 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}

              </div>
            );
          })}

        </div>
      </section>


      {/* CTA */}
      <section className="px-6 py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-orange-500 uppercase tracking-widest text-sm mb-4">
            Still Have Questions?
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Come talk to us.
          </h2>

          <p className="text-gray-400 text-lg mb-8">
            The best way to understand COSMOS is to be part of it.
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

export default FAQ;