// Sample data for the farm owner workspace. Replace with real data later.

export const farm = {
  name: 'Hiraya Family Farm',
  intro: 'Three generations growing calamansi, greens and herbs on a slope above Lipa.',
  city: 'Lipa, Batangas',
  owner: 'Maya Santos',
  status: 'Farm approved',
  experiences: [
    { id: 'orchard-walk', name: 'Orchard walk', price: 650, guests: 12, time: '9:00 AM' },
    { id: 'breakfast', name: 'Farm breakfast', price: 420, guests: 8, time: '7:30 AM' },
    { id: 'herb-workshop', name: 'Herb workshop', price: 800, guests: 10, time: '11:00 AM' },
  ],
};

export const bookings = [
  { ref: 'AGV-261121-092', name: 'Paolo Reyes', date: 'Sat, 21 Nov', time: '2:00 PM', guests: 5, experience: 'Orchard walk', total: 3250, status: 'pending' },
  { ref: 'AGV-261122-095', name: 'Lena Cruz', date: 'Sun, 22 Nov', time: '7:30 AM', guests: 2, experience: 'Farm breakfast', total: 840, status: 'pending' },
  { ref: 'AGV-261114-084', name: 'Andrea Mendoza', date: 'Sat, 14 Nov', time: '9:00 AM', guests: 3, experience: 'Orchard walk', total: 2050, status: 'confirmed' },
  { ref: 'AGV-261114-086', name: 'Jomar Dela Cruz', date: 'Sat, 14 Nov', time: '9:00 AM', guests: 4, experience: 'Orchard walk', total: 2700, status: 'confirmed' },
  { ref: 'AGV-261114-081', name: 'Rica Villanueva', date: 'Sat, 14 Nov', time: '11:00 AM', guests: 2, experience: 'Herb workshop', total: 1400, status: 'confirmed' },
  { ref: 'AGV-261024-055', name: 'Anna Lim', date: 'Sat, 24 Oct', time: '9:00 AM', guests: 2, experience: 'Orchard walk', total: 1400, status: 'completed' },
];

export const reviews = [
  { id: 1, name: 'Anna Lim', rating: 5, text: 'The calamansi picking was so fun. Kids loved it.', status: 'published' },
  { id: 2, name: 'Carlo B.', rating: 2, text: 'Parking was hard to find. Otherwise nice.', status: 'waiting' },
  { id: 3, name: 'Mia T.', rating: 5, text: 'Breakfast was fresh and warm. Will come back.', status: 'waiting' },
];

export const monthlyIncome = [
  { month: 'Jul', amount: 21000 },
  { month: 'Aug', amount: 26500 },
  { month: 'Sep', amount: 24800 },
  { month: 'Oct', amount: 34200 },
  { month: 'Nov', amount: 38400 },
];

export const peso = (n) => `\u20B1${n.toLocaleString('en-PH')}`;
