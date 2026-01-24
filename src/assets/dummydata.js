import BannerImage from "./BannerImage.jpeg";
import Image1 from "./Image1.jpeg";
import Image2 from "./Image2.jpeg";
import Image3 from "./Image3.jpeg";
import Image4 from "./Image4.png";
import Video from "./Video.mp4";
import IA1 from './IA1.jpg';
import IA2 from './IA2.jpg';
import IA3 from './IA3.jpg';
import { FaServer, FaServicestack, FaSpa, FaUserCheck } from 'react-icons/fa';
import { GiChefToque, GiFoodTruck } from 'react-icons/gi';
import { FaSnowflake, FaHeart, FaUsers, FaStar } from "react-icons/fa";
import { FaBolt, FaRegClock, FaCalendarCheck, FaFire } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { FiUser, FiSmartphone, FiMail, FiHome } from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';
export const bannerAssets = {
  bannerImage: BannerImage,
  orbitImages: [Image1, Image2, Image3, Image4],
  video:Video,
};
// ABOUT PAGE
export const features = [
    {
        id: 1,
        title: "Contrast Therapy",
        text: "Powerful recovery through ice baths, steam, and heat contrast for faster muscle repair and resilience.",
        icon: FaSnowflake, // store the component reference
        img: IA1,
    },
    {
        id: 2,
        title: "Expert Guided Recovery",
        text: "Professionally guided sessions ensuring safety, optimal temperature control, and maximum benefits.",
        icon: FaUserCheck,
        img: IA2,
    },
    {
        id: 3,
        title: "Premium Wellness Standards",
        text: "Hygienic facilities, purified water, and carefully maintained recovery environments.",
        icon: FaSpa,
        img: IA3,
    },
];

export const stats = [
  {
    label: "Happy Clients",
    value: "5,000+",
    icon: FaUsers,
  },
  {
    label: "Ice Bath Sessions",
    value: "1,200+",
    icon: FaSnowflake,
  },
  {
    label: "Satisfaction",
    value: "98%",
    icon: FaHeart,
  },
  {
    label: "5-Star Reviews",
    value: "4.9/5",
    icon: FaStar,
  },
];
// ABOUT HOMEPAGE
export const aboutfeature = [
    { icon: FaBolt, title: "Instant Recovery", text: "Quick and effective cold & heat therapy sessions", color: "from-amber-400 to-orange-500" },
    { icon: FaRegClock, title: "Always Available", text: "24/7 premium service", color: "from-rose-400 to-pink-600" },
    { icon: FaCalendarCheck, title: "Exclusive Booking", text: "Easy and priority session reservations", color: "from-emerald-400 to-cyan-600" },
    { icon: FaFire, title: "Signature Therapies", text: "Expertly curated ice, steam, and jacuzzi experiences", color: "from-purple-400 to-indigo-600" }
];
// SPECIAL OFFER
export const commonTransition = "transition-all duration-300";
export const addButtonBase ="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2.5 rounded-xl font-bold border-2 border-blue-400/30";
export const addButtonHover ="hover:gap-3 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 relative overflow-hidden";
// CONTACT
export const contactFormFields = [
    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your full name', Icon: FiUser },
    { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 12345 67890', pattern: "[+]{0,1}[0-9]{10,13}", Icon: FiSmartphone },
    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your.email@example.com', Icon: FiMail },
    { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter your delivery address', Icon: FiHome },
    { label: 'Service Name', name: 'service', type: 'text', placeholder: 'Enter service name (e.g., Ice Bath)', Icon: FaServer },
];

// LOGIN 
export const inputBase = "w-full rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm focus:shadow-md hover:border-blue-400 transition-all";
export const iconClass = "absolute top-1/2 transform -translate-y-1/2 left-3 text-blue-500 hover:border-blue-400 transition-all shadow-sm focus:shadow-md";
export default stats;
