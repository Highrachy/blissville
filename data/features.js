import {
  AmbienceIcon,
  PowerIcon,
  SafetyIcon,
} from '@/components/Icons/FeatureIcons';

export const features = [
  {
    background: 'green',
    icon: <SafetyIcon />,
    title: <>Safety and Security</>,
    text: 'Several bank branches, ATMs, plazas and filling/service stations guarantee the convenience experienced by our residents.',
    lists: [
      'Perimeter fence, electrically protected',
      'Automated gates',
      'Panic Alarm system',
      'Fire detection and firefighting apparatus',
    ],
  },
  {
    background: 'red',
    icon: <PowerIcon />,
    title: <>Power and ICT</>,
    text: 'We have harnessed superior architectural designs with technological systems that enhance your living and saves you time and money; ',
    lists: [
      'Smart solar and inverter systems',
      'Efficient lighting systems',
      'Cable TV distribution network',
      'Core fiber internet connectivity',
      'Intercom and Gate Management systems',
    ],
  },
  {
    background: 'blue',
    icon: <AmbienceIcon />,
    title: <>Ambience and Lifestyle</>,
    text: 'We provide plush luxury and extensive recreational facilities at affordable rates to further enhance your lifestyle. Some of these include;',
    lists: [
      'Rooftop gym/ Dance room ',
      'Rooftop relaxation lounge with exciting views',
      'Dedicated parking for vehicles',
    ],
  },
];
