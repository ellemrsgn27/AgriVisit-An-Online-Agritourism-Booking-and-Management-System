export const farm = {
  name: 'Hiraya Family Farm',
  intro: 'Three generations growing calamansi, greens and herbs on a slope above Lipa.',
  city: 'Lipa, Batangas',
  pin: '13.9411\u00B0 N, 121.1639\u00B0 E',
  owner: 'Maya Santos',
  status: 'Farm approved',
  experiences: [
    { id: 'orchard-walk', name: 'Orchard walk & calamansi picking', category: 'Fruit picking', duration: '2 hours', price: 650, guests: 12, slotsLeft: 8, time: 'Sat 9:00 AM', status: 'published', image: '/images/story/farm-landscape.jpg' },
    { id: 'breakfast', name: 'Farm-to-table breakfast', category: 'Farm-to-table', duration: '90 minutes', price: 420, guests: 10, slotsLeft: 5, time: 'Sun 7:30 AM', status: 'published', image: '/images/story/farm-growers.jpg' },
    { id: 'herb-workshop', name: 'Seedling workshop for families', category: 'Workshops', duration: '2 hours', price: 450, guests: 12, slotsLeft: null, time: 'No schedule yet', status: 'draft', image: '/images/story/farm-landscape.jpg' },
  ],
};

export const bookings = [
  { ref: 'AGV-261121-092', name: 'Paolo Reyes', email: 'paolo.reyes@example.com', phone: '+63 917 555 0192', date: 'Sat, 21 Nov', time: '2:00 PM', guests: 5, experience: 'Orchard walk', total: 3250, status: 'pending', note: 'One guest has a citrus allergy. Please confirm the pickup point at the main gate.', hold: 'Held until host confirmation' },
  { ref: 'AGV-261122-095', name: 'Lena Cruz', email: 'lena.cruz@example.com', phone: '+63 917 555 0195', date: 'Sun, 22 Nov', time: '7:30 AM', guests: 2, experience: 'Farm breakfast', total: 840, status: 'pending', note: 'Vegetarian breakfast requested.', hold: 'Held until host confirmation' },
  { ref: 'AGV-261114-084', name: 'Andrea Mendoza', email: 'andrea.mendoza@example.com', phone: '+63 917 555 0184', date: 'Sat, 14 Nov', time: '9:00 AM', guests: 3, experience: 'Orchard walk', total: 2050, status: 'confirmed', note: 'Family group; arriving 15 minutes early.', hold: 'Confirmed · slots reserved' },
  { ref: 'AGV-261114-086', name: 'Jomar Dela Cruz', email: 'jomar.delacruz@example.com', phone: '+63 917 555 0186', date: 'Sat, 14 Nov', time: '9:00 AM', guests: 4, experience: 'Orchard walk', total: 2700, status: 'confirmed', note: 'No special requests.', hold: 'Confirmed · slots reserved' },
  { ref: 'AGV-261114-081', name: 'Rica Villanueva', email: 'rica.villanueva@example.com', phone: '+63 917 555 0181', date: 'Sat, 14 Nov', time: '11:00 AM', guests: 2, experience: 'Herb workshop', total: 1400, status: 'confirmed', note: 'Will meet the host at the entrance.', hold: 'Confirmed · slots reserved' },
  { ref: 'AGV-261024-055', name: 'Anna Lim', email: 'anna.lim@example.com', phone: '+63 917 555 0155', date: 'Sat, 24 Oct', time: '9:00 AM', guests: 2, experience: 'Orchard walk', total: 1400, status: 'completed', note: 'Visit completed.', hold: 'Released · visit completed' },
];

export const reviews = [
  { id: 1, name: 'Andrea Mendoza', initials: 'AM', rating: 5, experience: 'Orchard walk', date: '24 Oct 2026', status: 'published', text: 'Kuya Ramon let the kids pick as much as they wanted and taught them how to tell a ripe fruit. We left with two baskets and a new habit.' },
  { id: 2, name: 'Jomar Dela Cruz', initials: 'JD', rating: 4.8, experience: 'Orchard walk', date: '8 Oct 2026', status: 'waiting', text: 'Easy check-in with the QR at the gate. The orchard is steep in places, so wear proper shoes.' },
  { id: 3, name: 'Anna Lim', initials: 'AL', rating: 5, experience: 'Farm breakfast', date: '24 Oct 2026', status: 'published', text: 'Breakfast was fresh and warm. Will come back with my cousins.' },
];

export const openingDays = [
  { day: 'Saturday', hours: '8:00 AM \u2013 4:00 PM' },
  { day: 'Sunday', hours: '8:00 AM \u2013 4:00 PM' },
  { day: 'Monday to Friday', hours: 'Closed' },
];

export const monthlyIncome = [
  { month: 'Jul', amount: 21000 },
  { month: 'Aug', amount: 26500 },
  { month: 'Sep', amount: 24800 },
  { month: 'Oct', amount: 34200 },
  { month: 'Nov', amount: 38400 },
];

export const peso = (n) => `\u20B1${n.toLocaleString('en-PH')}`;
