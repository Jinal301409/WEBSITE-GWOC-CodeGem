import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaMapPin, FaPhone } from 'react-icons/fa';
import { FiArrowRight, FiGlobe, FiMail, FiMessageSquare, FiPhone } from 'react-icons/fi';
import { contactFormFields } from '../../assets/dummydata'
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', address: '', service: '', query: ''
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        toast.success('Your query has been submitted successfully!', {
            style: {
                border: '2px solid #3b82f6', padding: '16px', color: '#fff',
                background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)'
            },
            iconTheme: { primary: '#3b82f6', secondary: '#fff' },
        })
        setFormData({ name: '', phone: '', email: '', address: '', service: '', query: '' })
    }
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <div className=' min-h-screen bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#1e40af]
sm: py-16 md: py-20 px-4 sm: px-6 1g:px-8 font[Poppins] relative overflow-hidden'>
            <Toaster position='top-center' reverseOrder={false} toastOptions={{ duration: 4000 }} />
            {/* ADDITONAL DECORATIVE ELEMENT */}
            <div className=' absolute top-20 left-10 w-24 h-24 bg-blue-500/20 rounded-full animate-float' />
            <div className=' absolute bottom-40 right-20 w-16 h-16 bg-sky-500/20 rounded-full animate-float-delayed' />

            <div className=' max-w-7xl mx-auto relative z-10'>
                <h1 className=' text-4xl sm:text-5xl md: text-6xl font-bold text-center mb-8 animate-fade-in-down'>
                    <span className=' bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700' >
                        Connect With Us
                    </span>
                </h1>

                <div className=' grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {/* CONTACT INFO SECTION */}
                    <div className=' space-y-6'>
                        <div className=' relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl transform transition-all
duration-300 hover: scale-[1.02] animate-card-float border-l-4 border-blue-500 hover:border-blue-400 group'>
                            <div className=' absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0
group-hover: opacity-100 transition-opacity duration-300 rounded-2xl'/>

                            <div className=' flex items-center mb-4 relative z-10'>
                                <div className=' p-3 bg-gradient-to-br from-blue-500/30 to-blue-700/30 rounded-xl'>
                                    <FaMapPin className=' text-blue-400 text-2xl animate-pulse' />
                                </div>
                                <h3 className=' ml-4 text-white text-xl font-semibold'> Our Office </h3>
                            </div>
                            <div className=' pl-12 relative z-10'>
                                <p className=' text-white font-light text-lg'>
                                    Surat, Gujarat
                                </p>
                            </div>
                        </div>
                        <div className=' relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl transform transition-all
duration-300 hover: scale-[1.02] animate-card-float border-l-4 border-green-500 hover:border-green-400 group'>
                            <div className=' absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0
group-hover: opacity-100 transition-opacity duration-300 rounded-2xl'/>

                            <div className=' flex items-center mb-4 relative z-10'>
                                <div className=' p-3 bg-gradient-to-br from-green-500/30 to-green-700/30 rounded-xl'>
                                    <FiPhone className=' text-green-400 text-2xl animate-ping' />
                                </div>
                                <h3 className=' ml-4 text-white text-xl font-semibold'> Contact Number </h3>
                            </div>
                            <div className=' pl-12 relative space-y-2 z-10'>
                                <p className=' text-white font-light flex items-center'>
                                    <FiGlobe className=' text-green-400 text-xl mr-2' />
                                    092270 25160
                                </p>
                            </div>
                        </div>
                        <div className=' relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl transform transition-all
duration-300 hover: scale-[1.02] animate-card-float border-l-4 border-orange-500 hover:border-orange-400 group'>
                            <div className=' absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0
group-hover: opacity-100 transition-opacity duration-300 rounded-2xl'/>

                            <div className=' flex items-center mb-4 relative z-10'>
                                <div className=' p-3 bg-gradient-to-br from-orange-500/30 to-orange-700/30 rounded-xl'>
                                    <FiMail className=' text-orange-400 text-2xl animate-pulse' />
                                </div>
                                <h3 className=' ml-4 text-orange-100 text-xl font-semibold'> Email Address </h3>
                            </div>
                            <div className=' pl-12 relative z-10'>
                                <p className=' text-orange-100 font-light text-lg'>
                                    chillthriveokitr@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=' relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl animate-slide-in-right border-2
border-blue-500/30 hover:border-blue-500/50 transform-border duration-300'>
                        <div className=' absolute -top-4 -right-4 w-12 h-12 bg-blue-500/30 rounded-full
animate-ping-slow'/>
                        <form onSubmit={handleSubmit} className=' space-y-6 relative z-10'>
                            {contactFormFields.map(({ label, name, type, placeholder, pattern, Icon }) => (
                                <div key={name} >
                                    <label className=' block text-blue-100 text-sm font-medium mb-2'>
                                        {label}
                                    </label>
                                    <div className=' relative'>
                                        <div className=' absolute left-3 top-1/2 transform -translate-y-1/2 '>
                                            <Icon className=' text-blue-500 text-x1 animate-pulse' />
                                        </div>
                                        <input type={type} value={formData[name]} name={name} onChange={handleChange}
                                            className=' w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-blue-500/30 roun
text-blue-50 focus: ring-2 focus: ring-blue-500 focus: border-transparent
placeholder-blue-200/50'
                                            placeholder={placeholder} pattern={pattern} required />

                                    </div>
                                </div>
                            ))}
                            <div>
                                <label className=' block text-blue-100 text-sm font-medium mb-2'>
                                    Your Query
                                </label>
                                <div className=' relative'>
                                    <div className=' absolute left-3 top-4'>
                                        <FiMessageSquare className=' text-blue-500 text-xl animate-pulse' />
                                    </div>
                                    <textarea rows='4' name='query' value={formData.query} onChange={handleChange}
                                        className=' w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-blue-500/30 rounded-x1
text-blue-50 focus:ring-2 focus: ring-blue-500 focus: border-transparent
placeholder-blue-200/50'
                                        placeholder='Type your message here ... '
                                        required>
                                    </textarea>
                                </div>
                            </div>
                            <button type='submit' className=' w-full flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover: from-blue-600
hover: to-blue-700 text-white font-semibold py-3 ppx6
rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover: shadow-blue-900
justify-center space-x-2 group'>
                                <span>Submit Query</span>
                                <FiArrowRight className=' w-5 h-5 group-hover: translate-x-l transition-transform' />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default Contact;
