import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const sections = [
  {
    id: "cold-therapy",
    title: "What is Cold Therapy?",
    content: `Cold Therapy, also known as Cryotherapy or Ice Bath Therapy, is a recovery technique that involves exposing the body to cold temperatures for a short duration. This method has been used for centuries by athletes, warriors, and healers to reduce pain, inflammation, and fatigue.

At Chill Thrive, cold therapy is carefully designed to be safe, controlled, and effective, helping the body activate its natural healing mechanisms.
Benefits of Cold Therapy:
• Reduces muscle soreness & inflammation
• Improves blood circulation
• Boosts mental resilience & focus
• Enhances recovery after workouts
• Supports stress reduction`,
  },
  {
    id: "science",
    title: "Science Behind Ice Baths",
    content: `When the body is exposed to cold water, blood vessels constrict (vasoconstriction), reducing inflammation and swelling. After exiting the ice bath, blood vessels dilate (vasodilation), increasing blood flow and delivering oxygen and nutrients to muscles.

Scientific studies show that ice baths can reduce delayed onset muscle soreness (DOMS), increase dopamine levels, regulate the nervous system, and improve sleep quality.
When you immerse your body in cold water:

• Blood vessels constrict (vasoconstriction)
• Inflammation reduces
• Nervous system activates survival response

Once you exit the ice bath:

• Blood vessels dilate (vasodilation)
• Oxygen-rich blood rushes back to muscles
• Healing and nutrient delivery increase

Scientifically proven effects:

• Reduced DOMS (Delayed Onset Muscle Soreness)
• Improved parasympathetic nervous system activity
• Increased dopamine & norepinephrine (feel-good hormones)
• Better sleep quality & mood balance`,
  },
  {
    id: "heat-vs-cold",
    title: "Heat Therapy vs Cold Therapy",
    type: "table",
    content: `Cold Therapy is ideal for reducing inflammation, swelling, and muscle soreness, especially after intense workouts. Heat Therapy, such as steam baths and jacuzzis, helps relax muscles, improve flexibility, and relieve stiffness.

For best results, Chill Thrive recommends combination therapy using both cold and heat for full-body recovery.`,
    table: [
      {
        aspect: "Best For",
        cold: "Inflammation, swelling, soreness",
        heat: "Muscle stiffness, relaxation",
      },
      {
        aspect: "Blood Flow",
        cold: "Reduces initially, increases post-session",
        heat: "Increases immediately",
      },
      {
        aspect: "Recovery Timing",
        cold: "Post-workout recovery",
        heat: "Pre-workout or relaxation",
      },
      {
        aspect: "Mental Impact",
        cold: "Builds mental resilience",
        heat: "Calms nervous system",
      },
      {
        aspect: "Used at Chill Thrive",
        cold: "Yes",
        heat: "Steam & Jacuzzi",
      },
    ],
  },
  {
    id: "disclaimer",
    title: "Who Should Avoid Ice Baths",
    content: `Ice baths may not be suitable for everyone. Individuals with heart conditions, uncontrolled blood pressure, asthma, Raynaud's disease, pregnancy, or recent surgery should consult a healthcare professional before trying cold therapy.

Medical Disclaimer: Ice bath therapy is not a medical treatment and should be practiced responsibly under professional guidance.`,
  },
  {
    id: "myths",
    title: "Recovery Myths & Facts",
    content: `Myth: Ice baths are only for athletes.\nFact: Anyone seeking recovery, stress relief, or mental clarity can benefit.

Myth: Longer ice baths are better.\nFact: Short, controlled exposure (2–5 minutes) is most effective.

Myth: Ice baths are dangerous.\nFact: When supervised, ice baths are safe and highly beneficial.`,
  },
];

const AwarenessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e3a8a] text-white py-20 px-6">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Awareness & <span className="text-blue-400">Education</span>
        </h1>
        <p className="text-blue-200 text-lg leading-relaxed">
          Learn the science, benefits, and safety behind cold and heat therapy to make informed recovery choices.
        </p>
      </motion.div>

      {/* CONTENT SECTIONS */}
      <div className="max-w-6xl mx-auto space-y-16">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-blue-400/20 rounded-3xl p-10 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-blue-300">
              {section.title}
            </h2>
            {section.type === "table" ? (
              <>
                {/* Description text */}
                <p className="text-blue-100 leading-relaxed mb-8 whitespace-pre-line">
                  {section.content}
                </p>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border border-blue-400/30 rounded-2xl overflow-hidden">
                    <thead>
                      <tr className="bg-blue-900/60 text-white">
                        <th className="p-4 text-left">Aspect</th>
                        <th className="p-4 text-center">Cold Therapy ❄️</th>
                        <th className="p-4 text-center">Heat Therapy 🔥</th>
                      </tr>
                    </thead>

                    <tbody className="text-blue-100">
                      {section.table.map((row, i) => (
                        <tr
                          key={i}
                          className="border-t border-blue-400/20 even:bg-white/5">
                          <td className="p-4 font-semibold">{row.aspect}</td>
                          <td className="p-4 text-center">{row.cold}</td>
                          <td className="p-4 text-center">{row.heat}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="text-blue-100 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            )}

          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mt-24">
        <h3 className="text-3xl font-bold mb-4">Ready to Experience Recovery?</h3>
        <p className="text-blue-200 mb-8">
          Discover guided cold and heat therapy sessions at Chill Thrive.
        </p>
        <Link to="/services">
          <button className="px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-600 transition font-semibold shadow-lg">
            Book Your Session
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default AwarenessPage;

