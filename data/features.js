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
      'Fire detection and firefighting apparatus',
      'Fire detection and firefighting apparatus',
      'Fire detection and firefighting apparatus',
      'Fire detection and firefighting apparatus',
    ],
  },
  {
    background: 'red',
    icon: <PowerIcon />,
    title: <>Power and ICT</>,
    text: 'Several bank branches, ATMs, plazas and filling/service stations guarantee the convenience experienced by our residents.',
    lists: [
      'Perimeter fence, electrically protected',
      'Automated gates',
      'Panic Alarm system',
      'Fire detection and firefighting apparatus',
    ],
  },
  {
    background: 'blue',
    icon: <AmbienceIcon />,
    title: <>Ambience and Lifestyle</>,
    text: 'Several bank branches, ATMs, plazas and filling/service stations guarantee the convenience experienced by our residents.',
    lists: ['Perimeter fence, electrically protected', 'Automated gates'],
  },
];
