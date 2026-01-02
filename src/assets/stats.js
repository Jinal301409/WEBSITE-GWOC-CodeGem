import { FaSnowflake, FaHeart, FaUsers, FaStar } from "react-icons/fa";
import { GiChefToque, GiFoodTruck } from 'react-icons/gi';
import { FaShippingFast, FaLeaf, FaHeart } from 'react-icons/fa';
import { FaBolt, FaRegClock, FaCalendarCheck, FaFire } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { FiUser, FiSmartphone, FiMail, FiHome } from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';
// ABOUT PAGE
export const features = [
    {
        id: 1,
        title: "Instant Delivery",
        text: "30-minute delivery guarantee in metro areas",
        icon: FaShippingFast, // store the component reference
        img: IA1,
    },
    {
        id: 2,
        title: "Master Chefs",
        text: "Michelin-star trained culinary experts",
        icon: GiChefToque,
        img: IA2,
    },
    {
        id: 3,
        title: "Premium Quality",
        text: "Locally sourced organic ingredients",
        icon: FaLeaf,
        img: IA3,
    },
];

const stats = [
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
export const teamMembers = [
    {
        name: "Marco Yansen",
        role: "Executive Chef",
        img: IA4,
        bio: "3 Michelin stars | Italian cuisine specialist",
        delay: 0.1,
        social: {
            twitter: "https://x.com/?lang=en",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
        },
    },
    {
        name: "Amit Singh",
        role: "Pastry Chef",
        img: IA5,
        bio: "World Baking Champion | French desserts expert",
        delay: 0.3,
        social: {
            twitter: "https://x.com/?lang=en",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
        },
    },
    {
        name: "Akash Trivedi",
        role: "Sushi Chef",
        img: IA6,
        bio: "5th generation sushi chef | Traditional techniques",
        delay: 0.5,
        social: {
            twitter: "https://x.com/?lang=en",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
        },
    },
];
export default stats;
