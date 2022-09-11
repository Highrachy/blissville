import {
  Category,
  HeartAdd,
  House,
  Logout,
  MessageQuestion,
  StatusUp,
  Triangle,
  UserEdit,
} from 'iconsax-react';

const normalIconColor = '#3A4451';
const activeIconColor = '#446CB2';

export const adminMenu = {
  Dashboard: <Category size="24" color={activeIconColor} variant="Bulk" />,
  'My Properties': <House size="24" color={normalIconColor} variant="Bulk" />,
  'Customize Your Home': (
    <Triangle size="24" color={normalIconColor} variant="Bulk" />
  ),
  Transactions: <StatusUp size="24" color={normalIconColor} variant="Bulk" />,
  Referrals: <HeartAdd size="24" color={normalIconColor} variant="Bulk" />,
  Support: <MessageQuestion size="24" color={normalIconColor} variant="Bulk" />,
  'Edit Profile': <UserEdit size="24" color={normalIconColor} variant="Bulk" />,
  Logout: <Logout size="24" color={normalIconColor} variant="Bulk" />,
};
