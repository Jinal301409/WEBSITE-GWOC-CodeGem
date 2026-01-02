import Icebath from './Icebath.jpg'
import IceJacuzzi from './IceJacuzzi.png'
import IceSteam from './IceSteam.png'
import fullrecovery from './fullrecovery.png'
import jacuzzi from './jacuzzi.png'
import Steam from './Steam.png'

export const dummyMenuData = {
  'Ice Bath Therapy': [
    {id: 'ice-bath',
    title: 'Ice Bath Therapy',
    image: Icebath,
    description: 'Cold immersion therapy designed to reduce inflammation, improve circulation, and enhance mental toughness.',
    price: '₹999',
    duration: '30 min/60 min',
    benefits: [
      'Muscle recovery',
      'Reduced soreness',
      'Improved focus',
      'Stress regulation'
    ],}
  ],
  'Jacuzzi Therapy': [
   {id: 'jacuzzi',
    title: 'Jacuzzi Therapy',
    image: jacuzzi,
    description:
      'Warm hydrotherapy for muscle relaxation and nervous system calm.',
    price: '₹1299',
    duration: '25 Minutes',
    benefits: [
    'Muscle relaxation',
    'Improved blood flow',
    'Stress relief'
    ],}
  ],
  'Steam Therapy': [
    {id: 'steam',
    title: 'Steam Therapy',
    image: Steam,
    price: '₹799',
    description:
      'Steam Therapy detoxifies the body, improves skin health, and helps with respiratory relaxation.',
    duration: '20 Minutes',
    benefits: [
     'Detox',
     'Skin rejuvenation',
     'Mental relaxation'
    ],}
  ],
  'Combo Packages': [
    {id: 'ice-jacuzzi',
    title: 'Combo: Ice Bath + Jacuzzi',
    image: IceJacuzzi,
    price: '₹1999',
    duration: '40 Minutes',
    description:
      'This contrast therapy combines cold and heat to maximize muscle recovery and circulation.',
    benefits: [
      'Faster recovery',
      'Improves circulation',
      'Reduces fatigue',
      'Boosts performance',
    ],},
  {
    id: 'ice-steam',
    title: 'Combo: Ice Bath + Steam',
    image: IceSteam,
    price: '₹1799',
    duration: '35 Minutes',
    description:
      'A powerful combination of cold exposure and steam detox for full-body rejuvenation.',
    benefits: [
      'Deep detox',
      'Boosts immunity',
      'Relieves muscle pain',
      'Improves mental clarity',
    ],
  },
  {
  id: 'full-recovery',
  title: 'Full Recovery Combo (Ice + Steam + Jacuzzi)',
  image: fullrecovery,
  price: '₹2499',
  duration: '60 Minutes',
  description:
    'The ultimate full-body recovery experience combining Ice Bath Therapy, Steam Therapy, and Jacuzzi Therapy. Designed for complete physical recovery, detoxification, and mental rejuvenation.',
  benefits: [
    'Complete muscle recovery',
    'Deep detox & improved circulation',
    'Stress relief & relaxation',
    'Boosts immunity & performance',
  ],
  }
]
};
