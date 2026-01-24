import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaMapPin } from "react-icons/fa";
import {
  FiArrowRight,
  FiGlobe,
  FiMail,
  FiMessageSquare,
  FiPhone,
} from "react-icons/fi";
import { contactFormFields } from "../../assets/dummydata";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    query: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    toast.success("Your query has been submitted successfully!", {
      style: {
        border: "2px solid #3b82f6",
        padding: "16px",
        color: "#fff",
        background: "rgba(15,23,42,0.8)",
        backdropFilter: "blur(10px)",
      },
      iconTheme: {
        primary: "#3b82f6",
        secondary: "#fff",
      },
    });

    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      service: "",
      query: "",
    });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#1e40af]
      py-16 px-4 sm:px-6 lg:px-8 font-[Poppins] relative overflow-hidden">

      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 4000 }} />

      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-blue-500/20 rounded-full animate-float" />
      <div className="absolute bottom-40 right-20 w-16 h-16 bg-sky-500/20 rounded-full animate-float-delayed" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Connect With Us
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CONTACT INFO */}
          <div className="space-y-6">
            {/* OFFICE */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-500/30 rounded-xl">
                  <FaMapPin className="text-blue-400 text-2xl" />
                </div>
                <h3 className="ml-4 text-white text-xl font-semibold">
                  Our Office
                </h3>
              </div>
              <p className="pl-12 text-white text-lg">Surat, Gujarat</p>
            </div>

            {/* PHONE */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border-l-4 border-green-500">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-500/30 rounded-xl">
                  <FiPhone className="text-green-400 text-2xl" />
                </div>
                <h3 className="ml-4 text-white text-xl font-semibold">
                  Contact Number
                </h3>
              </div>
              <p className="pl-12 text-white flex items-center">
                <FiGlobe className="mr-2 text-green-400" />
                092270 25160
              </p>
            </div>

            {/* EMAIL */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border-l-4 border-orange-500">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-orange-500/30 rounded-xl">
                  <FiMail className="text-orange-400 text-2xl" />
                </div>
                <h3 className="ml-4 text-orange-100 text-xl font-semibold">
                  Email Address
                </h3>
              </div>
              <p className="pl-12 text-orange-100 text-lg">
                chillthriveokitr@gmail.com
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-blue-500/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              {contactFormFields.map(
                ({ label, name, type, placeholder, pattern, Icon }) => (
                  <div key={name}>
                    <label className="block text-blue-100 text-sm mb-2">
                      {label}
                    </label>
                    <div className="relative">
                      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        pattern={pattern}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-blue-500/30 rounded-xl
                          text-blue-50 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                )
              )}

              <div>
                <label className="block text-blue-100 text-sm mb-2">
                  Your Query
                </label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3 top-4 text-blue-500" />
                  <textarea
                    rows="4"
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-blue-500/30 rounded-xl
                      text-blue-50 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Type your message here..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2
                  bg-gradient-to-r from-blue-600 to-blue-700 text-white
                  font-semibold py-3 rounded-xl hover:scale-[1.02] transition"
              >
                <span>Submit Query</span>
                <FiArrowRight />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
