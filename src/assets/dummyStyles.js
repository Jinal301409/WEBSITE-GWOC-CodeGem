import {
  FaCar,
  FaRoad,
  FaKey,
  FaMapMarkerAlt
} from "react-icons/fa";
// src/assets/dummyStyles.js
// ... existing styles ...

export const testimonialStyles = {
  container: "relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e40af] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden",
  innerContainer: "max-w-7xl mx-auto relative z-10",
  headerContainer: "text-center mb-16",
  badge: "inline-flex items-center px-5 py-2 rounded-full bg-blue-900/40 backdrop-blur-sm border border-blue-700 mb-5",
  badgeText: "text-sm font-medium text-cyan-400",
  title: "text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 font-[pacifico]",
  accentText: "text-cyan-400",
  dividerContainer: "flex justify-center items-center mb-5",
  dividerLine: "h-0.5 w-16 sm:w-20 bg-cyan-500 rounded-full",
  subtitle: "text-lg text-blue-100/70 max-w-3xl mx-auto",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  card: "relative rounded-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border-t-4 border-cyan-400",
  cardContent: "p-6 sm:p-8 relative z-10",
  quoteIcon: "text-cyan-400",
  ratingContainer: "flex",
  star: "mr-1",
  comment: "text-blue-100 italic text-lg mb-8",
  carInfo: "flex items-center mb-6 bg-blue-900/40 px-4 py-3 rounded-xl",
  carIcon: "text-cyan-400 mr-3",
  carText: "font-semibold text-cyan-400 text-base",
  authorContainer: "flex items-center",
  avatar: "bg-gradient-to-br from-cyan-500 to-blue-600 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl",
  authorInfo: "ml-4",
  authorName: "font-bold text-white text-lg",
  authorRole: "text-cyan-400 text-sm",
  decorativeCorner: "absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 transform translate-x-6 -translate-y-6 rotate-45 opacity-30",
  patternIcon: "absolute bottom-4 right-4 text-blue-800 opacity-10",
  statsContainer: "mt-20 bg-gradient-to-r from-blue-900 to-blue-950 rounded-2xl border border-blue-800 overflow-hidden relative",
  statsGrid: "grid grid-cols-2 md:grid-cols-4 gap-8 p-8",
  statItem: "text-center",
  statValue: (color) => `text-4xl sm:text-5xl font-bold ${color} mb-2`,
  statLabel: (color) => `text-sm ${color} font-medium`,
  ctaContainer: "mt-20 text-center",
  ctaTitle: "text-3xl font-bold text-white font-[pacifico] mb-4",
  ctaText: "text-blue-100/70 max-w-2xl mx-auto font-[pacifico] mb-8",
  ctaButton: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 font-[pacifico] px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20",
  bottomGradient: "absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-950 to-transparent z-0",
  cardShapes: [
    "clip-path: polygon(0% 10%, 10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%);",
    "clip-path: polygon(0% 0%, 90% 0%, 100% 10%, 100% 100%, 10% 100%, 0% 90%);",
    "clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%);"
  ],
  icons: [FaCar, FaRoad, FaKey, FaMapMarkerAlt],
  statColors: {
    value: ["text-cyan-400", "text-blue-400", "text-sky-400", "text-indigo-400"],
    label: ["text-cyan-200", "text-blue-200", "text-sky-200", "text-indigo-200"]
  }
};
// src/assets/dummyStyles.js
// ... existing styles ...

export const footerStyles = {
  container: "relative bg-gradient-to-b from-blue-950 to-black text-white pt-16 sm:pt-20 md:pt-24 overflow-hidden",
  topElements: "absolute top-0 left-0 w-full h-32 sm:h-40 md:h-48",

  circle1: "absolute top-0 left-1/4 w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full bg-blue-500/10 blur-3xl",
  circle2: "absolute top-0 right-1/3 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-cyan-400/10 blur-3xl",

  roadLine: "absolute top-12 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent",

  innerContainer: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12",

  brandSection: "space-y-4",
  logoContainer: "flex flex-col items-center text-xl md:text-2xl lg:text-2xl leading-none",
  logoText: "font-bold tracking-wider text-white",

  description: "text-blue-200/70 text-sm sm:text-base",

  socialIcons: "flex space-x-3 sm:space-x-4",
  socialIcon: "w-8 h-8 sm:w-10 sm:h-10 bg-blue-900 hover:bg-blue-500 transition-colors rounded-full flex items-center justify-center text-sm sm:text-base",

  sectionTitle: "text-lg font-[pacifico] sm:text-xl font-bold mb-4 relative pb-1",
  underline: "absolute left-0 bottom-0 block h-0.5 w-12 sm:w-16 bg-blue-400",

  linkList: "space-y-2 sm:space-y-3 text-blue-200/70 text-sm sm:text-base",
  linkItem: "flex items-center hover:text-blue-400 transition-colors",
  bullet: "w-2 h-2 bg-blue-400 rounded-full mr-2",

  contactList: "space-y-3 text-blue-200/70 text-sm sm:text-base",
  contactItem: "flex items-start",
  contactIcon: "text-blue-400 mt-1 mr-2",

  hoursContainer: "mt-4 sm:mt-6",
  hoursTitle: "font-medium text-sm sm:text-base mb-2 text-white",
  hoursText: "text-blue-200/70 text-xs sm:text-sm space-y-1",

  newsletterText: "text-blue-200/70 text-sm sm:text-base mb-3",

  input: "w-full bg-blue-900/60 border border-blue-700 rounded-lg py-2 px-3 sm:py-3 sm:px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white text-sm sm:text-base",

  subscribeButton: "w-full flex items-center justify-center py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-medium rounded-lg transition-transform duration-300 transform hover:-translate-y-1 text-sm sm:text-base",

  copyright: "border-t border-blue-900 mt-10 sm:mt-12 pb-4 flex flex-col md:flex-row justify-between items-center text-blue-300/60 text-sm sm:text-base",

  designerLink: "underline text-blue-300 hover:text-blue-500"
};
