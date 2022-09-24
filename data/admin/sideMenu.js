import {
  Briefcase,
  Buildings,
  Category,
  HeartAdd,
  Logout,
  MessageQuestion,
  StatusUp,
  Triangle,
  UserAdd,
  UserEdit,
} from 'iconsax-react';

// const normalIconColor = '#3A4451';
// const activeIconColor = '#446CB2';

export const adminMenu = {
  Dashboard: <Category size="24" variant="Bulk" />,
  Projects: <Briefcase size="24" variant="Bulk" />,
  'My Properties': <Buildings size="24" variant="Bulk" />,
  'Customize Your Home': <Triangle size="24" variant="Bulk" />,
  Transactions: <StatusUp size="24" variant="Bulk" />,
  Referrals: <UserAdd size="24" variant="Bulk" />,
  Support: <MessageQuestion size="24" variant="Bulk" />,
  'Edit Profile': <UserEdit size="24" variant="Bulk" />,
  Logout: <Logout size="24" variant="Bulk" />,
};

export const userMenu = {
  Dashboard: <Category size="24" variant="Bulk" />,
  'My Properties': <Buildings size="24" variant="Bulk" />,
  'Customize Your Home': <Triangle size="24" variant="Bulk" />,
  Transactions: <StatusUp size="24" variant="Bulk" />,
  Referrals: <UserAdd size="24" variant="Bulk" />,
  Support: <MessageQuestion size="24" variant="Bulk" />,
  'Edit Profile': <UserEdit size="24" variant="Bulk" />,
  Logout: <Logout size="24" variant="Bulk" />,
};
