import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { features } from '../../assets/dummydata'
import chillThriveImg from '../../assets/ChillThrive.jpg';
import founderImg from '../../assets/founder.png'
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa'

const About = () => {

  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e40af]
    py-10 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 mix-blend-soft-light" ></div>
      <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
        className=" py-16 px-4 text-center relative">
        <div className=" max-w-4xl mx-auto">
          <motion.h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 font-serif bg-clip-text text-transparent
                bg-gradient-to-r from-blue-400 to-blue-900">About Us</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
            Information has to be written here on about chill thrive
          </motion.p>
        </div>
      </motion.section>

      <section className=" py-12 px-4 md:px-8 relative">
        <div className=" max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.id} initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ delay: i * 0.2 }} className=" relative group">
                <div className=" absolute -inset-1 bg-gradient-to-br from-blue-500/30 to-blue-100/30 rounded-3xl
                            blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-full"/>
                <div className=" relative bg-blue-300 backdrop-blur-lg rounded-3xl overflow-hidden
                            border border-blue-900/50 hover:border-blue-800 transition-all duration-300 h-full">
                  <div className="h-50 sm:h-60 md:h-68 overflow-hidden">
                    <motion.img
                      src={f.img}
                      alt={f.title}
                      className=" w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }} />
                  </div>
                  <div className="p-8 to-blue-600">
                    <motion.div
                      className="text-blue-900 mb-4 inline-block"
                      whileHover={{ rotate: 15 }}
                    >
                      <Icon className="w-12 h-12" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {f.title}
                    </h3>

                    <p className="text-blue-900/80">
                      {f.text}
                    </p>
                  </div>

                </div>
              </motion.div>

            )
          })}
        </div>
      </section>
      {/* ================= FOUNDER SECTION ================= */}
<section className="py-24 px-6 md:px-12 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]">
  <div className="max-w-6xl mx-auto text-center">

    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-bold text-white mb-14">
      Meet the <span className="text-blue-400">Founder</span>
    </motion.h2>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10">
      {/* IMAGE */}
      <img
        src={founderImg}
        alt="Founder"
        className="w-36 h-36 mx-auto rounded-full object-cover border-4 border-blue-500 mb-6"/>

      {/* NAME */}
      <h3 className="text-2xl font-bold text-white">
        Saurav Jhawar
      </h3>

      {/* ROLE */}
      <p className="text-blue-300 mt-1 mb-6">
        Founder & CEO – Chill Thrive
      </p>
      <p className="text-blue-500 mt-1 mb-6">
        The visionary behind Chill Thrive Wellness — a space designed to reset your mind, recharge your body, and elevate your well-being. From ice baths to steam therapy to jacuzzi recovery, this is where science meets serenity and wellness becomes a lifestyle.
      </p>
      <p className="text-white font-bold">
         ❄🔥💧 Let the transformation begin.
      </p>
      <br></br>
      {/* SOCIAL ICONS */}
      <div className="flex justify-center gap-6 text-2xl text-blue-400">
        <a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition">
          <FaTwitter />
        </a>

        <a
          href="https://www.instagram.com/saurav_jhawar?igsh=bm41dmtuMXM4bHc0"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition">
          <FaInstagram />
        </a>

        <a
          href="https://facebook.com/yourusername"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition">
          <FaFacebook />
        </a>

        <a
          href="https://www.linkedin.com/in/chill-thrive-8a911b320 "
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition">
          <FaLinkedin />
        </a>
      </div>
    </motion.div>
  </div>
</section>

      
      {/* ABOUT CHILL THRIVE – ANIMATED BACKGROUND */}
      <section className="relative py-24 px-6 md:px-12 overflow-hidden">

        {/* Animated Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${chillThriveImg})`,
          }}
          initial={{ scale: 1.1, x: 0 }}
          animate={{ scale: 1.15, x: -30 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}/>

        {/* Dark Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-900/40 to-blue-700/30" />




        {/* Content */}
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              DIVE INTO THE <span className="text-blue-400">CHILL THRIVE EXPERIENCE!</span>
            </h2>

            <p className="text-blue-200 text-lg leading-relaxed mb-4">
              Looking for the ultimate recovery, wellness, and mental boost? Our ice baths are designed to help you recharge,
              refresh, and revive! Whether you're an athlete, fitness enthusiast,
              or just looking for a new way to challenge yourself, we offer:
            </p>

            <p className="text-blue-200 text-lg leading-relaxed mb-4">
              🔥 More than just an ice bath!     <br />
              🎶 Good Vibes & Chill Community 🎵<br />
              🏋️‍♂️ Perfect for Athletes & Fitness Lovers 🏃‍♂️ <br />
              🧘‍♂️ Holistic Wellness & Mindfulness 🕉️

            </p>

            {/* 👇 YOUR CONTENT ADDED HERE */}
            <p className="text-blue-300 text-lg leading-relaxed">
              📍 Visit Us At: CHILLTHRIVE, AT  Samavesh Aqua Therapy Centre Plot no - 3 ,opp  live stream cafe , beside indianbank, SD jain school lane, vesu , Surat <br />
              📞 Call/WhatsApp: 9227025160 <br />
              📩 DM us to book your session! <br />
              🚚 Memberships & Packages Available <br />
              👥 TAG A FRIEND & CHALLENGE THEM TO JOIN YOU! <br />

              #Chillthrive #IceBathTherapy #ColdPlunge #Recovery #BoostYourEnergy ⚡ #MindOverMatter #WellnessJourney 🧘‍♂️ #ColdExposure 🧊 #WimHofMethod 🌬️ #MentalToughness 💪 #IceBathBenefits #SelfCare 💖 #AthleteRecovery 🏋️‍♂️ #StressRelief 😌 #BodyMindSoul ✨ #PeakPerformance 🎯 #Biohacking 🔬 #NaturalHealing 🌱 #StrongerEveryDay 💪🔥 #Surat #Pune #FitnessRecovery #HolisticHealing 🕉️ #WellnessWarrior 🏆 #ChillAndThrive ❄️ #ColdWaterChallenge
            </p>
          </motion.div>

          {/* RIGHT GLASS CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
            <ul className="space-y-6 text-cyan-300 max-w-xl mx-auto">
              <li className="flex items-start gap-3 group hover:bg-cyan-900/20 p-4 rounded-lg transition-all duration-300">
                <span className="text-2xl">💪🧊</span>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-white">
                    Faster Muscle Recovery
                  </h3>
                  <p className="text-cyan-200">
                    Reduce soreness & inflammation
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3 group hover:bg-cyan-900/20 p-4 rounded-lg transition-all duration-300">
                <span className="text-2xl">🦠🛡️</span>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-white">
                    Boosted Immunity
                  </h3>
                  <p className="text-cyan-200">
                    Strengthen your body's defense system
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3 group hover:bg-cyan-900/20 p-4 rounded-lg transition-all duration-300">
                <span className="text-2xl">🧠✨</span>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-white">
                    Enhanced Mental Clarity
                  </h3>
                  <p className="text-cyan-200">
                    Improve focus & resilience
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3 group hover:bg-cyan-900/20 p-4 rounded-lg transition-all duration-300">
                <span className="text-2xl">😌💆‍♂️</span>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-white">
                    Stress & Anxiety Relief
                  </h3>
                  <p className="text-cyan-200">
                    Feel calmer and more balanced
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3 group hover:bg-cyan-900/20 p-4 rounded-lg transition-all duration-300">
                <span className="text-2xl">😴⚡</span>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-white">
                    Better Sleep & Energy Levels
                  </h3>
                  <p className="text-cyan-200">
                    Wake up feeling refreshed
                  </p>
                </div>
              </li>
            </ul>

          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default About
