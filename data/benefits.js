import {
  ComfortIcon,
  EnergyIcon,
  PaymentIcon,
  ReturnsIcon,
  StrategicIcon,
  TransferIcon,
} from '@/components/Icons/BenefitIcons';

export const benefits = [
  {
    background: 'red',
    icon: <ReturnsIcon />,
    title: (
      <>
        15% Immediate <br /> Returns
      </>
    ),
    text: 'You can enjoy up to 15% immediate returns on investment from our discounted package',
  },
  {
    background: 'blue2',
    icon: <EnergyIcon />,
    title: (
      <>
        Energy Efficient <br /> Houses
      </>
    ),
    text: 'Energy efficient houses that gives you up to 25% power cost savings.',
  },
  {
    background: 'green',
    icon: <PaymentIcon />,
    title: (
      <>
        Friendly <br /> Payment Plans
      </>
    ),
    text: 'Flexible and customized payment plans to complement your income streams.',
  },
  {
    background: 'purple',
    icon: <TransferIcon />,
    title: (
      <>
        Seamless Transfer <br /> of Ownership
      </>
    ),
    text: 'We strictly transact with proper titled lands for seamless transfer of ownership.',
  },
  {
    background: 'orange',
    icon: <StrategicIcon />,
    title: (
      <>
        Strategically <br /> Located
      </>
    ),
    text: 'Close proximity to healthcare facilities, grocery shopping centres, ATMs and filling stations for increased convenience',
  },
  {
    background: 'blue3',
    icon: <ComfortIcon />,
    title: (
      <>
        Homeliness and <br /> Comfort
      </>
    ),
    text: 'The use of Horticulture and other natural components increase homeliness of the estates.',
  },
];
