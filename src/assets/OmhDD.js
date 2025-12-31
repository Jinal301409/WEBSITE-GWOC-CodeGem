import IceBath1 from './IceBath1.jpeg';
/*import IceBath2 from './IceBath2.png';
import IceBath3 from './IceBath3.png';
import IceBath4 from './IceBath4.png';
import IceBath5 from './IceBath5.png';

import Jacuzzi1 from './Jacuzzi1.png';
import Jacuzzi2 from './Jacuzzi2.png';
import Jacuzzi3 from './Jacuzzi3.png';
import Jacuzzi4 from './Jacuzzi4.png';
import Jacuzzi5 from './Jacuzzi5.png'; */

import Steam1 from './Steam1.jpeg';
import Steam2 from './Steam2.jpeg';
import Steam3 from './Steam3.jpeg';
import Steam4 from './Steam4.jpeg';
import Steam5 from './Steam5.jpeg';

import ColdHeat1 from './ColdHeat1.jpeg';
/*import ColdHeat2 from './ColdHeat2.png';
import ColdHeat3 from './ColdHeat3.png';
import ColdHeat4 from './ColdHeat4.png'; */
import ColdHeat5 from './ColdHeat5.png';

import Mental1 from './Mental1.jpeg';
/*import Mental2 from './Mental2.png';
import Mental3 from './Mental3.png';
import Mental4 from './Mental4.png';
import Mental5 from './Mental5.png';

import Premium1 from './Premium1.png';
import Premium2 from './Premium2.png';
import Premium3 from './Premium3.png';
import Premium4 from './Premium4.png';
import Premium5 from './Premium5.png'; */

export const dummyMenuData = {
  'Ice Bath Therapy': [
    { id: 'icebath-1', name: 'Guided Ice Bath', duration: '15 mins', price: '1500', rating: 4.8, image: IceBath1, description: 'Immersive cold therapy session to boost circulation and reduce inflammation.' },
   /* { id: 'icebath-2', name: 'Advanced Ice Immersion', duration: '20 mins', price: '2000', rating: 4.9, image: IceBath2, description: 'Extended ice bath session for deep recovery and performance optimization.' },
    { id: 'icebath-3', name: 'Cold Plunge Challenge', duration: '10 mins', price: '1200', rating: 4.7, image: IceBath3, description: 'Short intense cold exposure to improve mental toughness.' },
    { id: 'icebath-4', name: 'Recovery Ice Therapy', duration: '12 mins', price: '1300', rating: 4.8, image: IceBath4, description: 'Post-workout cold immersion to reduce muscle soreness.' },
    { id: 'icebath-5', name: 'Ice Bath Duo Session', duration: '18 mins', price: '2200', rating: 4.9, image: IceBath5, description: 'Partnered ice bath experience for enhanced motivation.' }, */
  ],
/*  'Jacuzzi Therapy': [
    { id: 'jacuzzi-1', name: 'Hydro Massage Jacuzzi', duration: '30 mins', price: '1500', rating: 4.7, image: Jacuzzi1, description: 'Relaxing warm water therapy to relieve tension and improve mobility.' },
    { id: 'jacuzzi-2', name: 'Aromatherapy Jacuzzi', duration: '25 mins', price: '1800', rating: 4.8, image: Jacuzzi2, description: 'Jacuzzi session enhanced with essential oils for ultimate relaxation.' },
    { id: 'jacuzzi-3', name: 'Jet Stream Therapy', duration: '20 mins', price: '1400', rating: 4.6, image: Jacuzzi3, description: 'Targeted water jets massage for sore muscles.' },
    { id: 'jacuzzi-4', name: 'Sunset Jacuzzi Experience', duration: '35 mins', price: '2000', rating: 4.9, image: Jacuzzi4, description: 'Warm water session with ambient lighting for full relaxation.' },
    { id: 'jacuzzi-5', name: 'Deep Tissue Jacuzzi', duration: '30 mins', price: '1900', rating: 4.8, image: Jacuzzi5, description: 'Hydrotherapy designed to release deep muscle tension.' },
  ], */
  'Steam Therapy': [
    { id: 'steam-1', name: 'Detox Steam Session', duration: '20 mins', price: '1200', rating: 4.6, image: Steam1, description: 'Sweat out toxins and improve skin health with a therapeutic steam bath.' },
    { id: 'steam-2', name: 'Revitalizing Steam Therapy', duration: '25 mins', price: '1500', rating: 4.7, image: Steam2, description: 'Steam session designed to boost energy and respiratory wellness.' },
    { id: 'steam-3', name: 'Aromatic Herbal Steam', duration: '20 mins', price: '1400', rating: 4.8, image: Steam3, description: 'Steam infused with herbs for relaxation and clarity.' },
    { id: 'steam-4', name: 'Deep Relax Steam', duration: '30 mins', price: '1600', rating: 4.9, image: Steam4, description: 'Extended steam bath to release tension and aid recovery.' },
    { id: 'steam-5', name: 'Detox & Recovery Steam', duration: '25 mins', price: '1550', rating: 4.8, image: Steam5, description: 'Combination steam session for detoxification and rejuvenation.' },
  ],
  'Cold & Heat Recovery': [
    { id: 'recovery-1', name: 'Contrast Therapy', duration: '30 mins', price: '2500', rating: 4.9, image: ColdHeat1, description: 'Alternating cold and warm therapies for accelerated recovery and circulation.' },
   /* { id: 'recovery-2', name: 'Cold & Heat Full Body', duration: '35 mins', price: '2800', rating: 4.8, image: ColdHeat2, description: 'Complete session alternating ice bath and jacuzzi therapy.' },
    { id: 'recovery-3', name: 'Post-Workout Recovery', duration: '25 mins', price: '2200', rating: 4.7, image: ColdHeat3, description: 'Cold and heat therapy to reduce soreness and fatigue.' },
    { id: 'recovery-4', name: 'Performance Boost Therapy', duration: '30 mins', price: '2600', rating: 4.9, image: ColdHeat4, description: 'Enhance circulation and recovery for high-performance living.' }, */
    { id: 'recovery-5', name: 'Rapid Recovery Session', duration: '20 mins', price: '2000', rating: 4.8, image: ColdHeat5, description: 'Quick cold & heat session for urgent recovery needs.' },
  ],
  'Mental Resilience': [
    { id: 'mental-1', name: 'Guided Cold Exposure', duration: '15 mins', price: '1200', rating: 4.8, image: Mental1, description: 'Train mental toughness and stress resilience with controlled cold sessions.' },
   /* { id: 'mental-2', name: 'Mindfulness & Cold', duration: '20 mins', price: '1500', rating: 4.9, image: Mental2, description: 'Cold therapy paired with mindfulness practices.' },
    { id: 'mental-3', name: 'Resilience Training', duration: '25 mins', price: '1600', rating: 4.8, image: Mental3, description: 'Structured mental resilience exercises during recovery sessions.' },
    { id: 'mental-4', name: 'Breathwork & Cold', duration: '15 mins', price: '1300', rating: 4.7, image: Mental4, description: 'Breathing exercises combined with cold exposure.' },
    { id: 'mental-5', name: 'Focus & Recovery', duration: '20 mins', price: '1400', rating: 4.8, image: Mental5, description: 'Enhance concentration and mental clarity through cold immersion.' }, */
  ],
/*  'Premium Wellness Experiences': [
    { id: 'premium-1', name: 'Full Wellness Package', duration: '90 mins', price: '5000', rating: 5.0, image: Premium1, description: 'Comprehensive recovery session combining ice bath, steam, and jacuzzi therapies.' },
    { id: 'premium-2', name: 'Luxury Recovery Experience', duration: '75 mins', price: '4500', rating: 4.9, image: Premium2, description: 'Top-tier recovery session with all amenities.' },
    { id: 'premium-3', name: 'Executive Wellness', duration: '60 mins', price: '4000', rating: 4.8, image: Premium3, description: 'Tailored premium session for executives and high performers.' },
    { id: 'premium-4', name: 'Elite Recovery', duration: '80 mins', price: '4800', rating: 5.0, image: Premium4, description: 'Elite session focusing on total mind & body rejuvenation.' },
    { id: 'premium-5', name: 'Ultimate Chill Experience', duration: '90 mins', price: '5200', rating: 5.0, image: Premium5, description: 'The ultimate combination of all therapies for peak wellness.' },
  ], */
};
