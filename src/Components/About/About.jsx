import React from 'react'
import { motion } from 'framer-motion'
import { features, stats, teamMembers } from '../../assets/dummydata'

const About = () => {

    const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e40af]
    py-10 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 mix-blend-soft-light" ></div>
        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0}}
        className=" py-16 px-4 text-center relative">
            <div className=" max-w-4xl mx-auto">
                <motion.h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 font-serif bg-clip-text text-transparent
                bg-gradient-to-r from-blue-400 to-blue-900">About Us</motion.h1>
                <motion.p initial={{ opacity: 0}} animate={{ opacity: 1}} >
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
                          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -100px 0px"}}
                          transition={{delay: i * 0.2 }} className=" relative group">
                            <div className=" absolute -inset-1 bg-gradient-to-br from-blue-500/30 to-blue-100/30 rounded-3xl
                            blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-full"/>
                            <div className=" relative bg-blue-100 backdrop-blur-lg rounded-3xl overflow-hidden
                            border border-blue-500/50 hover:border-blue-800 transition-all duration-300 h-full">
                               <div>
                                 <motion.img src={f.img} alt={f.img} className=" w-full h-full object-cover">
                                 initial={{ scale: 1 }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
                                 </motion.img>                               </div>
                            </div>
                          </motion.div>
                        
                    )
                })}
            </div>
        </section>
    </div>
  )
}

export default About
