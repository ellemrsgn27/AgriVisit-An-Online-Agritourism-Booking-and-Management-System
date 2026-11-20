export const metrics = [
  { label: 'Registered farms', value: '68', note: '12 awaiting approval', icon: 'tractor' },
  { label: 'Active accounts', value: '2,900', note: '214 new this month', icon: 'users' },
  { label: 'Bookings this month', value: '1,842', note: '96% completed', icon: 'calendar' },
  { label: 'Booking value', value: 'PHP 1.24M', note: 'Excludes cancellations', icon: 'chart' },
];

export const bookingBars = [
  { label: 'Jun', value: 62, amount: '0.9M' },
  { label: 'Jul', value: 71, amount: '1.0M' },
  { label: 'Aug', value: 78, amount: '1.1M' },
  { label: 'Sep', value: 86, amount: '1.2M' },
  { label: 'Oct', value: 92, amount: '1.2M' },
  { label: 'Nov', value: 100, amount: '1.3M' },
];

export const activity = [
  { time: '9:45 AM', title: 'System report generated', note: 'Monthly booking value and cancellations' },
  { time: '9:12 AM', title: 'Farm approval granted', note: 'Hiraya Family Farm by Jules Reyes' },
  { time: '8:40 AM', title: 'Review hidden', note: 'Promotional content by Nico Diaz' },
  { time: 'Yesterday', title: 'Category archived', note: 'Farm stay by Jules Reyes' },
];

export const approvals = [
  { farm: 'Rosario Rice Terraces', owner: 'Rosa Bautista', city: 'Nueva Ecija', status: 'Pending', statusTone: 'pending' },
  { farm: 'Tayabas Coconut Grove', owner: 'Marilou Santos', city: 'Quezon', status: 'Pending', statusTone: 'pending' },
  { farm: 'Silang Flower Garden', owner: 'Berto Lim', city: 'Cavite', status: 'Documents missing', statusTone: 'alert' },
  { farm: 'Liliw Coffee Slope', owner: 'Nena Rivera', city: 'Laguna', status: 'Visit due', statusTone: 'muted' },
];

export const applicant = {
  farm: 'Rosario Rice Terraces',
  owner: 'Rosa Bautista',
  city: 'Nueva Ecija',
  submitted: '10 Nov 2026',
  experiences: 'Rice planting, harvest walk and carabao ride',
  checks: [
    'Farm details complete',
    'Owner contact verified',
    'Farm address and map pin provided',
    'Business permit on file',
    'Owner identification on file',
  ],
};

export const users = [
  { name: 'Andrea Mendoza', role: 'Tourist', status: 'Active', tone: 'valid' },
  { name: 'Maya Santos', role: 'Farm owner', status: 'Active', tone: 'valid' },
  { name: 'Ella Reyes', role: 'Farm owner', status: 'Pending', tone: 'pending' },
  { name: 'Nico Diaz', role: 'Tourist', status: 'Active', tone: 'valid' },
  { name: 'Jules Reyes', role: 'Administrator', status: 'Active', tone: 'valid' },
  { name: 'Rosario Bautista', role: 'Farm owner', status: 'Suspended', tone: 'alert' },
];

export const categories = [
  { name: 'Farm tours', farms: 31, icon: 'locate' },
  { name: 'Fruit picking', farms: 18, icon: 'leaf-check' },
  { name: 'Workshops', farms: 22, icon: 'photo' },
  { name: 'Farm-to-table', farms: 14, icon: 'ticket' },
];

export const moderation = [
  {
    id: 'A-1034',
    guest: 'Nico Diaz',
    farm: 'Sinta Hills Farm',
    date: '11 Nov 2026',
    stars: 3,
    text: 'Overpriced. Visit my page for a better tour deal - message me for discounted trips.',
    flag: 'Promotional content',
    tone: 'alert',
  },
  {
    id: 'A-1031',
    guest: 'Lara Tan',
    farm: 'Hiraya Family Farm',
    date: '11 Nov 2026',
    stars: 5,
    text: 'Maya was an amazing guide. The orchard was beautiful and our harvest basket was a lovely bonus.',
    flag: 'Pending review',
    tone: 'pending',
  },
  {
    id: 'A-1028',
    guest: 'Tom Villanueva',
    farm: 'Luntian Grove',
    date: '10 Nov 2026',
    stars: 4,
    text: 'The food was lovely, but our lunch began 30 minutes late. I wish we had been informed earlier.',
    flag: 'Needs reply',
    tone: 'muted',
  },
];

export const reportBars = [
  { label: 'Jan', value: 58, amount: '0.7M' },
  { label: 'Mar', value: 66, amount: '0.9M' },
  { label: 'May', value: 74, amount: '1.0M' },
  { label: 'Jul', value: 81, amount: '1.1M' },
  { label: 'Sep', value: 88, amount: '1.2M' },
  { label: 'Nov', value: 100, amount: '1.34M' },
];

export const topFarms = [
  { farm: 'Hiraya Family Farm', bookings: 148, value: 'PHP 214,300' },
  { farm: 'Luntian Grove', bookings: 126, value: 'PHP 182,900' },
  { farm: 'Sinta Hills Farm', bookings: 97, value: 'PHP 141,600' },
  { farm: 'Silang Flower Garden', bookings: 72, value: 'PHP 98,400' },
];

export const cancellations = [
  { reason: 'Weather advisory', count: '14', share: '38%' },
  { reason: 'Guest schedule change', count: '11', share: '30%' },
  { reason: 'Farm unable to host', count: '7', share: '19%' },
  { reason: 'Payment not completed', count: '5', share: '13%' },
];
