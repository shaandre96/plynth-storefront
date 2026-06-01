import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export const SearchIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const BagIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 8h12l-1.2 11a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const InstagramIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const TiktokIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14 3v9.2a3.2 3.2 0 1 1-3.2-3.2v2.5a.8.8 0 1 0 .8.8V3h2.4z" opacity="0.95" />
    <path d="M14 3c.6 2 2.2 3.4 4.2 3.6V9c-1.6-.1-3-.6-4.2-1.5V3z" />
  </svg>
);

export const ArrowIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const PlayIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const PauseIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 12l5 5 9-11" />
  </svg>
);
