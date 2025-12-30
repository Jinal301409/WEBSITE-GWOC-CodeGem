import BannerImage from "./BannerImage.jpeg";
import Image1 from "./Image1.jpeg";
import Image2 from "./Image2.jpeg";
import Image3 from "./Image3.jpeg";
import Image4 from "./Image4.jpeg";
import Video from "./Video.mp4";
import IceBath from "./IceBath.jpeg";
import SteamBath from "./SteamBath.jpeg";
import Jacuzzi from "./Jacuzzi.jpeg";
import ContrastTherapy from "./ContrastTherapy.jpeg";
import RecoveryPack from "./RecoveryPack.jpeg";
import AthleteRecovery from "./AthleteRecovery.jpeg";
import FirstTimeOffer from "./FirstTimeOffer.jpeg";
import MindBodyReset from "./MindBodyReset.jpeg";
import { FaShippingFast, FaLeaf, FaHeart } from 'react-icons/fa';
import { FaBolt, FaRegClock, FaCalendarCheck, FaFire } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { FiUser, FiSmartphone, FiMail, FiHome } from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';
import { GiChefToque, GiFoodTruck } from 'react-icons/gi';

export const bannerAssets = {
  bannerImage: BannerImage,
  orbitImages: [Image1, Image2, Image3, Image4],
  video:Video,
};
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

// TODAY'S SPECIAL OFFERS – CHILL THRIVE
export const cardData = [
  {id: 1, title: 'Ice Bath Recovery', rating: 4.9, hearts: 320, description: 'Cold immersion therapy to reduce inflammation and boost recovery', image: IceBath, popular: true, price: 499},
  {id: 2, title: 'Steam Detox Session', rating: 4.8, hearts: 280, description: 'Deep heat therapy for detoxification, relaxation, and circulation', image: SteamBath, bestseller: true, price: 399},
  {id: 3, title: 'Jacuzzi Relaxation', rating: 4.7, hearts: 245, description: 'Hydrotherapy session for muscle relaxation and stress relief', image: Jacuzzi, price: 599},
  {id: 4, title: 'Cold + Heat Therapy Combo', rating: 5.0, hearts: 410, description: 'Contrast therapy combining ice bath and steam for maximum recovery', image: ContrastTherapy, special: true, price: 799}
];
export const additionalData = [
  { id: 5, title: 'Full Recovery Pack', rating: 5.0, hearts: 520, description: 'Ice bath, steam, and jacuzzi therapy in one complete recovery session', image: RecoveryPack, popular: true, price: 999},
  {id: 6, title: 'Athlete Performance Session', rating: 4.9, hearts: 360, description: 'High-performance recovery designed for athletes and fitness enthusiasts', image: AthleteRecovery, price: 1199},
  {id: 7, title: 'First-Time Chill Offer', rating: 4.6, hearts: 290, description: 'Exclusive discounted recovery session for first-time visitors', image: FirstTimeOffer, price: 349},
  {id: 8, title: 'Mind & Body Reset', rating: 4.8, hearts: 405, description: 'A calming blend of steam and jacuzzi therapy for mental relaxation', image: MindBodyReset, special: true, price: 699}
];

// LOGIN 
export const inputBase = "w-full rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm focus:shadow-md hover:border-blue-400 transition-all";
export const iconClass = "absolute top-1/2 transform -translate-y-1/2 left-3 text-blue-500 hover:border-blue-400 transition-all shadow-sm focus:shadow-md";
