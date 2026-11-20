const PATHS = {
  sprout: (
    <>
      <path d="M12 21.5V10.5" />
      <path d="M12 12C12 7.8 8.6 5 4.4 5c0 4.3 3.1 7 7.6 7Z" />
      <path d="M12.4 13.4c0-3.3 2.6-5.6 6.6-5.6 0 3.5-2.4 5.6-6.6 5.6Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
      <path d="M8 3.2v3.6M16 3.2v3.6M3.5 10.4h17" />
    </>
  ),
  users: (
    <>
      <circle cx="9.5" cy="8" r="3.2" />
      <path d="M3.6 20c0-3.3 2.7-5.6 5.9-5.6s5.9 2.3 5.9 5.6" />
      <path d="M16.2 5.5a3.2 3.2 0 0 1 0 6.3" />
      <path d="M17.6 14.6c2 .7 3.2 2.4 3.2 5" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.4" />
      <path d="m15.6 15.6 4.4 4.4" />
    </>
  ),
  star: <path d="m12 3.2 2.7 5.7 6.2.8-4.6 4.3 1.2 6.1L12 17.1 7.5 20l1.2-6.1-4.6-4.3 6.2-.8Z" fill="currentColor" />,
  arrow: <path d="M6.5 17.5 17.5 6.5M9 6.5h8.5V15" />,
  chevron: <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  sliders: (
    <>
      <path d="M4 7.5h6.5M15 7.5h5M4 16.5h5M13.5 16.5h6.5" />
      <circle cx="12.8" cy="7.5" r="2.2" />
      <circle cx="11.2" cy="16.5" r="2.2" />
    </>
  ),
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  minus: <path d="M5.5 12h13" />,
  locate: (
    <>
      <circle cx="12" cy="12" r="6.6" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
      <path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6" />
    </>
  ),
  rotate: (
    <>
      <path d="M20 12a8 8 0 1 1-2.8-6.1" />
      <path d="M20 3.6v4.8h-4.8" />
    </>
  ),
  check: <path d="m5 12.6 4.6 4.6L19 6.8" />,
  scan: (
    <>
      <path d="M3.6 8.4V6A2.4 2.4 0 0 1 6 3.6h2.4M15.6 3.6H18A2.4 2.4 0 0 1 20.4 6v2.4M20.4 15.6V18A2.4 2.4 0 0 1 18 20.4h-2.4M8.4 20.4H6A2.4 2.4 0 0 1 3.6 18v-2.4" />
      <path d="M3.6 12h16.8" />
    </>
  ),
  'leaf-check': (
    <>
      <path d="M4.6 19.4C3.4 12 8 5.6 19.4 4.6c1 11.4-5.4 16-12.8 14.8" />
      <path d="m8.6 15.4 3.2-3.2" />
    </>
  ),
  photo: (
    <>
      <rect x="3.6" y="4.6" width="16.8" height="14.8" rx="2.4" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4.4 17.4 5-4.6 3.6 3.2 2.6-2.4 4 3.8" />
    </>
  ),
  ticket: (
    <>
      <path d="M3.5 9.5a2.5 2.5 0 0 1 0 5V18h17v-3.5a2.5 2.5 0 0 1 0-5V6h-17Z" />
      <path d="M8.5 9v6M13 9v6" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3.6" y="3.6" width="7" height="7" rx="2" />
      <rect x="13.4" y="3.6" width="7" height="7" rx="2" />
      <rect x="3.6" y="13.4" width="7" height="7" rx="2" />
      <rect x="13.4" y="13.4" width="7" height="7" rx="2" />
    </>
  ),
  tractor: (
    <>
      <circle cx="7" cy="17" r="3.4" />
      <circle cx="18" cy="17.6" r="2.4" />
      <path d="M10.4 17V7.4h4.2l3.4 7.6" />
      <path d="M4 11.4h4.6" />
    </>
  ),
  tags: (
    <>
      <path d="M12.4 3.6H5.2a1.6 1.6 0 0 0-1.6 1.6v7.2" />
      <path d="m20.4 12.4-7.6 7.6a1.6 1.6 0 0 1-2.3 0L3.9 12.4" />
      <circle cx="8.2" cy="8.2" r="1.4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.4 4.8 6.2v5.2c0 4.5 3 7.5 7.2 9.2 4.2-1.7 7.2-4.7 7.2-9.2V6.2Z" />
      <path d="m8.8 12.2 2.4 2.4 4-4.6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="m7.5 15.5 3.5-4.5 3 2.5 4-6" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M4.6 9.4h2.2M17.2 9.4h2.2M4.6 14.6h2.2M17.2 14.6h2.2" />
      <path d="M9.4 4.6v2.2M14.6 17.2v2.2" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8.8a6 6 0 1 0-12 0c0 4-1.6 5.6-1.6 5.6h15.2S18 12.8 18 8.8Z" />
      <path d="M13.8 18a2 2 0 0 1-3.6 0" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 11v5.2M12 8.2v.2" />
    </>
  ),
  history: (
    <>
      <path d="M3.6 12a8.4 8.4 0 1 0 2.6-6.1" />
      <path d="M3.4 5v4.4h4.4" />
      <path d="M12 8v4.4l3 1.8" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v11M7.6 11.6l4.4 4.4 4.4-4.4M4.6 20h14.8" />
    </>
  ),
  'user-plus': (
    <>
      <circle cx="9.4" cy="8.4" r="3.2" />
      <path d="M3.4 19.6c0-3.2 2.7-5.4 6-5.4 1.3 0 2.5.3 3.4 1" />
      <path d="M17.6 13.6v6M14.6 16.6h6" />
    </>
  ),
  'chevron-down': <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />,
};

const FILLED = new Set(['star']);

export default function Icon({ name, className }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill={FILLED.has(name) ? 'currentColor' : 'none'}
      stroke={FILLED.has(name) ? 'none' : 'currentColor'}
      strokeWidth={FILLED.has(name) ? undefined : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}
